#!/bin/bash

echo "🌐 CHECKING GITHUB REPOSITORIES ONLINE"
echo "======================================"

check_github() {
    local repo_url=$1
    echo -n "Checking $repo_url ... "
    
    if curl -s --head "$repo_url" | grep "200 OK" > /dev/null; then
        echo "✅ LIVE"
    else
        echo "� OFFLINE or NOT FOUND"
    fi
}

check_github "https://github.com/jishnusnair/task1"
check_github "https://github.com/jishnusnair/task2"
check_github "https://github.com/jishnusnair/task3"

echo ""
echo "📋 EXPECTED REPOSITORIES:"
echo "1. https://github.com/jishnusnair/task1 - Java REST API"
echo "2. https://github.com/jishnusnair/task2 - Kubernetes Deployment" 
echo "3. https://github.com/jishnusnair/task3 - React Web UI"
