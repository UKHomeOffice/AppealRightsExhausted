kubectl create secret generic redis --from-literal=session_secret=${SESSION_SECRET}
kubectl create secret generic notify-key --from-literal=notify-key=${NOTIFY_KEY}
