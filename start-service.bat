@echo off
:: =============================================================================
:: URCET Campus ChatBot - NSSM Service Startup Script
:: =============================================================================
:: This script is designed to be run by NSSM (Non-Sucking Service Manager)
:: It starts the Express server to serve the built application
:: =============================================================================

:: Set working directory to application root
cd /d "%~dp0"

:: Start the Node.js server
node production-server.js
