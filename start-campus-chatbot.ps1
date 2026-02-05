# URCET Campus ChatBot PowerShell Launcher
Write-Host "Starting URCET Campus ChatBot Server..." -ForegroundColor Green

# Set working directory
Set-Location "c:\Users\admin\Desktop\YSM\Campus-ChatBot"

# Check if build exists
if (!(Test-Path "dist")) {
    Write-Host "ERROR: dist folder not found. Please run 'npm run build' first." -ForegroundColor Red
    exit 1
}

# Display startup info
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "URCET Campus ChatBot Server" -ForegroundColor Yellow
Write-Host "Port: 3500" -ForegroundColor White
Write-Host "Directory: $(Get-Location)" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan

# Start the server
node production-server.js
