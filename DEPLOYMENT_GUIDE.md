# 🚀 Campus ChatBot NSSM Production Deployment Guide

## 📋 Quick Setup Summary

Your Campus ChatBot is now ready for production deployment on **port 3500** using NSSM (Non-Sucking Service Manager).

## ✅ Prerequisites Checklist

- [x] Node.js installed
- [x] Project built for production (`npm run build`)
- [ ] NSSM downloaded and installed
- [ ] Administrator privileges

## 🔧 NSSM Installation

### Download NSSM
1. Visit: https://nssm.cc/download
2. Download the appropriate version (32-bit or 64-bit)
3. Extract to `C:\nssm\` (or preferred location)
4. Add `C:\nssm\win64` (or `win32`) to your system PATH

### Verify NSSM Installation
```powershell
nssm --version
```

## 🚀 Automated Service Installation

**Option 1: Use the automated script (Recommended)**

Run PowerShell as Administrator:
```powershell
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install-service.ps1
```

**Option 2: Manual Installation**

Run these commands in PowerShell as Administrator:

```powershell
# Navigate to project directory
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"

# Install the service
nssm install "Campus-ChatBot" "npm" "run" "serve"
nssm set "Campus-ChatBot" AppDirectory "c:\Users\admin\Desktop\YSM\Campus-ChatBot"

# Configure service
nssm set "Campus-ChatBot" Description "URCET Campus ChatBot Assistant"
nssm set "Campus-ChatBot" Start SERVICE_AUTO_START
nssm set "Campus-ChatBot" AppExit Default Restart
nssm set "Campus-ChatBot" AppRestartDelay 30000

# Setup logging
New-Item -ItemType Directory -Force -Path "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs"
nssm set "Campus-ChatBot" AppStdout "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stdout.log"
nssm set "Campus-ChatBot" AppStderr "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stderr.log"
nssm set "Campus-ChatBot" AppStdoutCreationDisposition 4
nssm set "Campus-ChatBot" AppStderrCreationDisposition 4

# Configure firewall
New-NetFirewallRule -DisplayName "Campus ChatBot" -Direction Inbound -Protocol TCP -LocalPort 3500 -Action Allow

# Start the service
nssm start "Campus-ChatBot"
```

## 🌐 Access Your ChatBot

Once the service is running:

- **Local Access**: http://localhost:3500
- **Network Access**: http://[your-server-ip]:3500
- **Example**: http://192.168.1.100:3500

## 📊 Service Management

### Start Service
```powershell
nssm start "Campus-ChatBot"
# OR
net start "Campus-ChatBot"
```

### Stop Service
```powershell
nssm stop "Campus-ChatBot"
# OR
net stop "Campus-ChatBot"
```

### Restart Service
```powershell
nssm restart "Campus-ChatBot"
```

### Check Service Status
```powershell
nssm status "Campus-ChatBot"
# OR
Get-Service "Campus-ChatBot"
```

### Edit Service Configuration
```powershell
nssm edit "Campus-ChatBot"
```

### Remove Service
```powershell
nssm stop "Campus-ChatBot"
nssm remove "Campus-ChatBot" confirm
```

## 📝 Monitoring & Logs

### View Real-time Logs
```powershell
# View latest output
Get-Content "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stdout.log" -Tail 20 -Wait

# View errors
Get-Content "c:\Users\admin\Desktop\YSM\Campus-ChatBot\logs\stderr.log" -Tail 20 -Wait
```

### Check Service Status
```powershell
# Service status
nssm status "Campus-ChatBot"

# Process information
Get-Process | Where-Object {$_.ProcessName -eq "node"}

# Port usage
netstat -an | findstr :3500
```

## 🔧 Troubleshooting

### Common Issues

**1. Service won't start**
- Check Node.js is in system PATH
- Verify project is built: `npm run build`
- Check logs in `logs\stderr.log`

**2. Port 3500 in use**
- Check what's using the port: `netstat -an | findstr :3500`
- Kill processes: `taskkill /f /im node.exe`

**3. Access denied errors**
- Run PowerShell as Administrator
- Check Windows Firewall settings

**4. Service starts but website not accessible**
- Verify firewall rule is active
- Check server IP configuration
- Test local access first: http://localhost:3500

### Manual Testing (Before Service Installation)
```powershell
cd "c:\Users\admin\Desktop\YSM\Campus-ChatBot"
npm run serve
```

## 📁 Project Files Created

- `start-chatbot.bat` - Batch file to start the service
- `start-chatbot.ps1` - PowerShell script to start the service
- `install-service.ps1` - Automated NSSM installation script
- `logs/` - Directory for service logs
- `.env.production` - Production environment variables

## 🎯 Production Configuration

- **Port**: 3500
- **Host**: 0.0.0.0 (all interfaces)
- **Startup**: Automatic with Windows
- **Auto-restart**: On failure with 30-second delay
- **Logging**: Enabled with rotation

## 📞 Support

If you encounter issues:
1. Check the logs in `logs\stderr.log`
2. Verify Node.js installation
3. Ensure port 3500 is not blocked
4. Run manual test before service installation

---

**🎉 Your Campus ChatBot is now ready for production use on port 3500!**
