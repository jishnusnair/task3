#!/bin/bash

echo "🔍 CHECKING ALL TASKS COMMIT STATUS"
echo "===================================="

check_repo() {
    local repo_name=$1
    local repo_path=$2
    
    echo ""
    echo "📁 Checking: $repo_name"
    echo "📍 Path: $repo_path"
    
    if [ -d "$repo_path" ]; then
        cd "$repo_path"
        
        # Check git status
        echo "📊 Git Status:"
        git status --short
        
        # Check last commit
        echo "📝 Last Commit:"
        git log --oneline -1
        
        # Check remote
        echo "🌐 Remote:"
        git remote -v
        
        # Check if pushed
        echo "🚀 Push Status:"
        git log --oneline origin/main..HEAD 2>/dev/null || echo "No remote or not pushed"
        
    else
        echo "❌ Repository not found at: $repo_path"
    fi
    echo "------------------------------------"
}

# Check each repository
check_repo "Task 1" "/workspaces/task1"
check_repo "Task 2" "/workspaces/task2/task2-files" 
check_repo "Task 3" "/workspaces/task3"

echo ""
echo "✅ VERIFICATION COMPLETE"
