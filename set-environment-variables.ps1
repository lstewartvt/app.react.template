$path = ".\.environment.config"

foreach($set in Get-Content $path) {
    $variable = $set.Split("=")[0]
    $value = $set.Split("=")[1]
    [Environment]::SetEnvironmentVariable($variable, $value)
    Write-Host ($variable + ": " + [Environment]::GetEnvironmentVariable($variable))
}