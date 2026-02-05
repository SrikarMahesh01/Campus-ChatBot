# NSSM Service Setup Guide for Campus ChatBot

## Prerequisites

1. **Node.js**: Ensure Node.js is installed on your server
2. **NSSM**: Download NSSM from https://nssm.cc/download
3. **Built Application**: Make sure the project is built for production

## Setup Steps

### 1. Build the Application
```powershell
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"
npm install
npm run build
```

### 2. Download and Install NSSM
- Download NSSM from https://nssm.cc/download
- Extract to a folder (e.g., `C:\nssm\`)
- Add the NSSM folder to your system PATH

### 3. Install the Service (Option 1: Using Vite Preview)
Open PowerShell as Administrator and run:

```powershell
# Navigate to your project directory
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"

# Install the service using npm directly
nssm install "Campus-ChatBot" "npm" "run" "serve"
nssm set "Campus-ChatBot" AppDirectory "c:\Users\admin\Desktop\YSM\Campus-ChatBot"
```

### 3. Install the Service (Option 2: Using Batch File)
```powershell
# Install the service using the batch file
nssm install "Campus-ChatBot" "c:\Users\admin\Desktop\YSM\Campus-ChatBot\start-chatbot.bat"
```

### 4. Configure Service Settings
```powershell
# Set service description
nssm set "Campus-ChatBot" Description "URCET Campus ChatBot Assistant"

# Set startup type to automatic
nssm set "Campus-ChatBot" Start SERVICE_AUTO_START

# Set service to restart on failure
nssm set "Campus-ChatBot" AppExit Default Restart
nssm set "Campus-ChatBot" AppRestartDelay 30000

# Configure logging (optional)
nssm set "Campus-ChatBot" AppStdout "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stdout.log"
nssm set "Campus-ChatBot" AppStderr "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stderr.log"

# Set log rotation
nssm set "Campus-ChatBot" AppStdoutCreationDisposition 4
nssm set "Campus-ChatBot" AppStderrCreationDisposition 4
```

### 5. Create Logs Directory
```powershell
New-Item -ItemType Directory -Force -Path "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs"
```

### 6. Start the Service
```powershell
# Start the service
nssm start "Campus-ChatBot"

# Check service status
nssm status "Campus-ChatBot"
```

## Service Management Commands

### Start Service
```powershell
nssm start "Campus-ChatBot"
# or
net start "Campus-ChatBot"
```

### Stop Service
```powershell
nssm stop "Campus-ChatBot"
# or
net stop "Campus-ChatBot"
```

### Restart Service
```powershell
nssm restart "Campus-ChatBot"
```

### Remove Service
```powershell
nssm stop "Campus-ChatBot"
nssm remove "Campus-ChatBot" confirm
```

### View Service Status
```powershell
nssm status "Campus-ChatBot"
```

### Edit Service Configuration
```powershell
nssm edit "Campus-ChatBot"
```

## Accessing the ChatBot

Once the service is running, you can access the Campus ChatBot at:
- **Local**: http://localhost:3500
- **Network**: http://[server-ip]:3500

## Firewall Configuration

Make sure port 3500 is open in Windows Firewall:

```powershell
# Open port 3500 for inbound connections
New-NetFirewallRule -DisplayName "Campus ChatBot" -Direction Inbound -Protocol TCP -LocalPort 3500 -Action Allow
```

## Troubleshooting

### Check Service Logs
```powershell
# View stdout log
Get-Content "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stdout.log" -Tail 50

# View stderr log
Get-Content "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stderr.log" -Tail 50
```

### Common Issues

1. **Service won't start**: Check that Node.js is in the system PATH
2. **Port conflicts**: Ensure port 3500 is not used by another service
3. **Permission issues**: Run NSSM commands as Administrator
4. **Build issues**: Make sure `npm run build` completes successfully

### Manual Testing
Before installing as a service, test manually:
```powershell
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"
npm run serve
```

## Service Configuration Summary

- **Service Name**: Campus-ChatBot
- **Port**: 3500
- **Startup Type**: Automatic
- **Working Directory**: c:\Users\admin\Desktop\YSM\Campus-ChatBot
- **Executable**: start-chatbot.bat
- **Logs**: c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\

## Notes

- The service will automatically start when the server boots
- Logs are rotated to prevent disk space issues
- The service will automatically restart if it crashes
- Access the chatbot via web browser at http://server-ip:3500
