# File: run-vagrant-tests-no-internet.ps1

$ErrorActionPreference = 'Stop'

try {
    Write-Host "Blocking internet..."
    vagrant powershell -c "New-NetFirewallRule -DisplayName 'Block Internet' -Direction Outbound -Action Block -Profile Any"
    if ($LASTEXITCODE -ne 0) { throw "Failed to create firewall rule." }

    Write-Host "Running tests..."
    vagrant powershell -c "powershell -Command "Set-Location 'C:\Users\vagrant\ElectronApp'; npm run test""
    if ($LASTEXITCODE -ne 0) { throw "Tests failed." }

} catch {
    Write-Error "An error occurred: $_"
    exit 1
} finally {
    Write-Host "Re-enabling internet..."
    try {
        vagrant powershell -c "Remove-NetFirewallRule -DisplayName 'Block Internet'"
        if ($LASTEXITCODE -ne 0) { Write-Warning "Failed to remove firewall rule. You may need to remove it manually." }
    } catch {
        Write-Warning "Exception when removing firewall rule: $_"
    }
}
