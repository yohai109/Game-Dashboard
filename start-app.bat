@echo off
:: Check for admin rights
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with admin privileges
) else (
    echo Requesting admin privileges...
    powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c cd /d "%CD%" && start "" /b cmd /c "%~f0"'"
    exit /b
)

echo Starting Watch App in the system tray...
cd /d %~dp0
start "" /b cmd /c "npx electron . 1>nul 2>&1"
