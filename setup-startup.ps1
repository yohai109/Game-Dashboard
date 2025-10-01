# Create a WScript Shell object
$WshShell = New-Object -comObject WScript.Shell

# Path to the batch file
$BatchPath = "$PSScriptRoot\start-app.bat"

# Path to the Startup folder
$StartupFolder = [System.Environment]::GetFolderPath('Startup')

# Create a shortcut in the Startup folder
$Shortcut = $WshShell.CreateShortcut("$StartupFolder\WatchApp.lnk")
$Shortcut.TargetPath = $BatchPath
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.WindowStyle = 1  # Normal window
$Shortcut.Save()

Write-Host "Startup shortcut has been created in: $StartupFolder"
