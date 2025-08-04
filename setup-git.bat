@echo off
echo 🚀 Setting up Springi for GitHub...

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

REM Add all files
echo 📝 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Initial commit: Springi AI Chatbot Application - Spring Boot backend with Google Gemini AI integration - React frontend with ChatGPT-like interface - PostgreSQL database for chat history - Complete CRUD operations for chat sessions - Professional dark theme UI - Environment-based configuration for security - Comprehensive documentation and deployment guides"

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Adding GitHub remote...
    set /p repo_url="Repository URL: "
    git remote add origin %repo_url%
) else (
    echo 🔗 Remote origin already exists
    git remote -v
)

REM Push to GitHub
echo ⬆️  Pushing to GitHub...
git branch -M main
git push -u origin main

echo ✅ Successfully pushed to GitHub!
echo.
echo 🔒 Security Checklist:
echo ✅ Sensitive data removed from application.properties
echo ✅ Environment variables configured
echo ✅ .gitignore updated
echo ✅ Example configuration files created
echo.
echo 📚 Next Steps:
echo 1. Set up environment variables in your deployment platform
echo 2. Configure PostgreSQL database
echo 3. Get Google AI API key from https://makersuite.google.com/app/apikey
echo 4. Update README.md with your specific details
echo.
echo 🎉 Your Springi repository is ready!
pause
