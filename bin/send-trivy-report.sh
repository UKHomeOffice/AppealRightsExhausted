#!/bin/sh

set -e

echo "🔍 Installing dependencies..."
apk add --no-cache curl jq

echo "🔍 Checking Trivy report file..."
ls -l /drone/src/run
cat /drone/src/run/trivy-report.json || echo "❌ No vulnerabilities found or report is empty!"

TRIVY_REPORT="/drone/src/run/trivy-report.json"

if [ -s "$TRIVY_REPORT" ]; then
  VULNERABILITIES=$(jq '[.Results[] | select(.Vulnerabilities != null) | .Vulnerabilities | length] | add // 0' "$TRIVY_REPORT")
  echo "🔍 Found $VULNERABILITIES vulnerabilities using Aquasec trivy..."

  if [ "$VULNERABILITIES" -gt 0 ]; then
    PAYLOAD='{
      "text": "⚠️ *Trivy Scan Report* 🚨",
      "attachments": [
        {
          "color": "#ffcc00",
          "text": "🔍 *Image Scanned:* `node:20.17.0-alpine3.20@sha256:2cc3d19887bfea8bf52574716d5f16d4668e35158de866099711ddfb2b16b6e0` \\n📌 *Found '"$VULNERABILITIES"' vulnerabilities using Aquasec Trivy* \\n📌 *Build Link:* <'"$DRONE_BUILD_LINK"'|View Build>",
          "mrkdwn_in": ["text"]
        }
      ]
    }'

    while IFS= read -r LINE; do
      CVE=$(echo "$LINE" | awk -F'|' '{print $1}')
      SEVERITY=$(echo "$LINE" | awk -F'|' '{print $2}')
      PACKAGE=$(echo "$LINE" | awk -F'|' '{print $3}')
      CURRENT=$(echo "$LINE" | awk -F'|' '{print $4}')
      FIXED=$(echo "$LINE" | awk -F'|' '{print $5}')
      DEP_TREE=$(echo "$LINE" | awk -F'|' '{print $6}')

      case "$SEVERITY" in
        "CRITICAL") COLOR="#ff0000" ;;
        "HIGH") COLOR="#ff8c00" ;;
        "MEDIUM") COLOR="#ffd700" ;;
        "LOW") COLOR="#32cd32" ;;
        *) COLOR="#808080" ;;
      esac

      PAYLOAD=$(echo "$PAYLOAD" | jq --arg cve "$CVE" --arg sev "$SEVERITY" --arg pkg "$PACKAGE" --arg cur "$CURRENT" --arg fix "$FIXED" --arg dep "$DEP_TREE" --arg color "$COLOR" \
        '.attachments += [{
          "color": $color,
          "text": "*CVE:* `\($cve)`\n*Severity:* \($sev)\n*Package:* `\($pkg)`\n*Installed Version:* `\($cur)`\n*Fixed Version:* `\($fix)`\n*Dependency Path:* `\($dep)`",
          "mrkdwn_in": ["text"]
        }]')
    done < <(jq -r '.Results[] | select(.Vulnerabilities != null) | .Vulnerabilities[] |"\(.VulnerabilityID)|\(.Severity)|\(.PkgName)|\(.InstalledVersion)|\(.FixedVersion // "N/A")|\(.DependencyPath // ["N/A"] | join(" > "))"' "$TRIVY_REPORT")

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
