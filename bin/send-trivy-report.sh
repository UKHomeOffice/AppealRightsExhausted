#!/bin/sh

echo "🔍 Installing dependencies..."
apk add --no-cache curl jq

echo "🔍 Checking Trivy report file..."
ls -l /drone/src/run
cat /drone/src/run/trivy-report.json || echo "❌ No vulnerabilities found or report is empty!"

if [ -s /drone/src/run/trivy-report.json ]; then
  VULNERABILITIES=$(jq '[.Results[] | select(.Vulnerabilities != null) | .Vulnerabilities | length] | add // 0' /drone/src/run/trivy-report.json)
  echo "🔍 Found $VULNERABILITIES vulnerabilities using Aquasec trivy..."

  if [ "$VULNERABILITIES" -gt 0 ]; then
    PAYLOAD='{
      "text": "⚠️ *Trivy Scan Report* 🚨",
      "attachments": [
        {
          "color": "#36a64f",
          "text": "🔍 *Image Scanned:* `node:20.17.0-alpine3.20@sha256:...` \\n📌 *🔍 Found '"$VULNERABILITIES"' vulnerabilities using Aquasec trivy* \\n📌 *Build Link:* <'"$DRONE_BUILD_LINK"'|View Build>",
          "mrkdwn_in": ["text"]
        }
      ]
    }'

    while IFS= read -r LINE; do
      CVE=$(echo "$LINE" | awk -F'|' '{print $1}')
      SEVERITY=$(echo "$LINE" | awk -F'|' '{print $2}')
      PACKAGE=$(echo "$LINE" | awk -F'|' '{print $3}')
      FIXED=$(echo "$LINE" | awk -F'|' '{print $4}')

      case "$SEVERITY" in
        "CRITICAL") COLOR="#ff0000" ;;
        "HIGH") COLOR="#ff8c00" ;;
        "MEDIUM") COLOR="#ffd700" ;;
        "LOW") COLOR="#32cd32" ;;
        *) COLOR="#808080" ;;
      esac

      PAYLOAD=$(echo "$PAYLOAD" | jq --arg cve "$CVE" --arg sev "$SEVERITY" --arg pkg "$PACKAGE" --arg fix "$FIXED" --arg color "$COLOR" \
        '.attachments += [{
          "color": $color,
          "text": "*CVE:* `\($cve)`\n*Severity:* \($sev)\n*Package:* `\($pkg)`\n*Fixed Version:* `\($fix)`",
          "mrkdwn_in": ["text"]
        }]')
    done < <(jq -r '.Results[] | select(.Vulnerabilities != null) | .Vulnerabilities[] | "\(.VulnerabilityID)|\(.Severity)|\(.PkgName)|\(.FixedVersion // "N/A")"' /drone/src/run/trivy-report.json)

    curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$SLACK_WEBHOOK_URL" || echo "❌ Failed to send Slack notification!"
  else
    echo "✅ No vulnerabilities found!"
    curl -X POST -H 'Content-type: application/json' --data '{
      "text": "✅ No vulnerabilities found in the Trivy scan!",
      "attachments": [{
        "color": "#36a64f",
        "text": "📌 *Build Link:* <'"$DRONE_BUILD_LINK"'|View Build>",
        "mrkdwn_in": ["text"]
      }]
    }' "$SLACK_WEBHOOK_URL"
  fi
else
  echo "❌ Trivy report is missing or empty!"
fi
