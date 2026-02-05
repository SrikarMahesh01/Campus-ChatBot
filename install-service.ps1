# NSSM Service Installation Script for Campus ChatBot
# Run this script as Administrator

param(
    [string]$ServiceName = "Campus-ChatBot",
    [string]$ProjectPath = "c:\Users\admin\Desktop\YSM\Campus-ChatBot",
    [int]$Port = 3500
)

Write-Host "Installing Campus ChatBot as Windows Service..." -ForegroundColor Green

# Check if NSSM is available
if (!(Get-Command "nssm" -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: NSSM is not found in PATH. Please install NSSM first." -ForegroundColor Red
    Write-Host "Download from: https://nssm.cc/download" -ForegroundColor Yellow
    exit 1
}

# Check if service already exists
$existingService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
if ($existingService) {
    Write-Host "Service '$ServiceName' already exists. Removing it first..." -ForegroundColor Yellow
    nssm stop $ServiceName
    nssm remove $ServiceName confirm
    Start-Sleep -Seconds 2
}

# Install the service
Write-Host "Installing service '$ServiceName'..." -ForegroundColor Cyan
nssm install $ServiceName "npm" "run" "serve"
nssm set $ServiceName AppDirectory $ProjectPath

# Configure service settings
Write-Host "Configuring service settings..." -ForegroundColor Cyan
nssm set $ServiceName Description "URCET Campus ChatBot Assistant"
nssm set $ServiceName Start SERVICE_AUTO_START
nssm set $ServiceName AppExit Default Restart
nssm set $ServiceName AppRestartDelay 30000

# Create logs directory
$logsPath = Join-Path $ProjectPath "logs"
if (!(Test-Path $logsPath)) {
    New-Item -ItemType Directory -Force -Path $logsPath
    Write-Host "Created logs directory: $logsPath" -ForegroundColor Green
}

# Configure logging
nssm set $ServiceName AppStdout "$logsPath\stdout.log"
nssm set $ServiceName AppStderr "$logsPath\stderr.log"
nssm set $ServiceName AppStdoutCreationDisposition 4
nssm set $ServiceName AppStderrCreationDisposition 4

# Configure firewall
Write-Host "Configuring Windows Firewall for port $Port..." -ForegroundColor Cyan
$firewallRule = Get-NetFirewallRule -DisplayName "Campus ChatBot" -ErrorAction SilentlyContinue
if (!$firewallRule) {
    New-NetFirewallRule -DisplayName "Campus ChatBot" -Direction Inbound -Protocol TCP -LocalPort $Port -Action Allow
    Write-Host "Firewall rule created for port $Port" -ForegroundColor Green
} else {
    Write-Host "Firewall rule already exists" -ForegroundColor Yellow
}

# Start the service
Write-Host "Starting service..." -ForegroundColor Cyan
nssm start $ServiceName

# Wait a moment and check status
Start-Sleep -Seconds 5
$status = nssm status $ServiceName
Write-Host "Service Status: $status" -ForegroundColor Green

if ($status -eq "SERVICE_RUNNING") {
    Write-Host "" -ForegroundColor Green
    Write-Host "✅ Campus ChatBot service installed and started successfully!" -ForegroundColor Green
    Write-Host "📱 Access your chatbot at: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host "🌐 Network access: http://[your-server-ip]:$Port" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Green
    Write-Host "Service Management Commands:" -ForegroundColor Yellow
    Write-Host "  Start:   nssm start $ServiceName" -ForegroundColor White
    Write-Host "  Stop:    nssm stop $ServiceName" -ForegroundColor White
    Write-Host "  Restart: nssm restart $ServiceName" -ForegroundColor White
    Write-Host "  Status:  nssm status $ServiceName" -ForegroundColor White
    Write-Host "  Remove:  nssm remove $ServiceName confirm" -ForegroundColor White
} else {
    Write-Host "❌ Service installation completed but service is not running." -ForegroundColor Red
    Write-Host "Check logs at: $logsPath" -ForegroundColor Yellow
}
