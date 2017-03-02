$path = ".\.environment.config"

foreach($set in Get-Content $path) {
    $variable = $set.Split("=")[0]
    $value = $set.Split("=")[1]
    heroku config:set $variable=$value
}