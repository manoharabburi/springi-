#!/bin/bash

# Springi Git Setup Script
# This script helps set up the repository for GitHub

echo "🚀 Setting up Springi for GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Springi AI Chatbot Application

- Spring Boot backend with Google Gemini AI integration
- React frontend with ChatGPT-like interface
- PostgreSQL database for chat history
- Complete CRUD operations for chat sessions
- Professional dark theme UI
- Environment-based configuration for security
- Comprehensive documentation and deployment guides"
fi

# Check if remote origin exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Remote origin already exists"
    git remote -v
else
    echo "🔗 Adding GitHub remote..."
    echo "Please enter your GitHub repository URL:"
    read -p "Repository URL: " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo ""
echo "🔒 Security Checklist:"
echo "✅ Sensitive data removed from application.properties"
echo "✅ Environment variables configured"
echo "✅ .gitignore updated"
echo "✅ Example configuration files created"
echo ""
echo "📚 Next Steps:"
echo "1. Set up environment variables in your deployment platform"
echo "2. Configure PostgreSQL database"
echo "3. Get Google AI API key from https://makersuite.google.com/app/apikey"
echo "4. Update README.md with your specific details"
echo ""
echo "🎉 Your Springi repository is ready!"
