$path = ".\.env"

foreach($set in Get-Content $path) {
    $variable = $set.Split("=")[0]
    Write-Host ($variable + ": " + [Environment]::GetEnvironmentVariable($variable))
}