# File: run-tests.ps1

try {
   Write-Host "Running tests..."
   vagrant powershell -c "powershell -Command "Set-Location 'C:\Users\vagrant\ElectronApp'; npm run test""
} catch {
    Write-Error "An error occurred: $_"
    exit 1
}
