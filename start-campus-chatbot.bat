@echo off
title URCET Campus ChatBot Server
echo Starting URCET Campus ChatBot on Port 3500...

REM Change to project directory
cd /d "c:\Users\admin\Desktop\YSM\Campus-ChatBot"

REM Check if dist folder exists
if not exist "dist" (
    echo ERROR: dist folder not found. Please run 'npm run build' first.
    pause
    exit /b 1
)

REM Start the secure server
echo ========================================
echo URCET Campus ChatBot Server Starting...
echo Port: 3500
echo Directory: %CD%
echo ========================================
node secure-server.js
