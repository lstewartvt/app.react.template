#copy base project files to new project folder
$BaseFolder = "D:\Web Apps\Development\Basic.React"
$BaseFolderContents = "D:\Web Apps\Development\Basic.React\*"
$ProjectName = Read-Host -Prompt "Enter project name"
$ProjectNameLower = $ProjectName.ToLower()

$DefaultValue = 'git'
$RepoType = Read-Host "Enter repo type [$($DefaultValue)]"
$RepoType = ($DefaultValue, $RepoType)[[bool]$RepoType]
$RepoUrl = Read-Host "Enter repo url"

$DevPort = Read-Host "Enter dev port"

$DevFolder = "D:\Web Apps\Development\"
$ProjectFolder = $DevFolder + $ProjectName
$path = $ProjectFolder + "\" + $ProjectName + ".*"
Get-ChildItem -Path $Path | Remove-Item -Force
$path = $ProjectFolder + "\src\App_Data\PublishProfiles\" + $ProjectName + "*"
Get-ChildItem -Path $Path | Remove-Item -Force
Robocopy $BaseFolder $ProjectFolder /e /XD 'node_modules' /XF 'start-project.ps1'

#remove obsolete files/folders
$item = $ProjectFolder + "\.git"
Remove-Item $item -Recurse -Force

#replace file text
$file = $ProjectFolder + "\gulpfile.js"D:\Web Apps\Development\Basic.React\server\index.js
(Get-Content $file).replace('site.react.k0nrt15.com:32287', 'localhost:' + $DevPort) | Set-Content $file

$file = $ProjectFolder + "\package.json"
(Get-Content $file).replace('App.React', $ProjectName) | Set-Content $file
(Get-Content $file).replace('App.React.Lower', $ProjectNameLower) | Set-Content $file
(Get-Content $file).replace('"type": "git"', '"type": "' + $RepoType + '"') | Set-Content $file
(Get-Content $file).replace('https://github.com/lstewartvt/app.react.template.git', $RepoUrl) | Set-Content $file

$file = $ProjectFolder + "\README.md"
(Get-Content $file).replace('React Website template', $ProjectName + ' Website') | Set-Content $file
(Get-Content $file).replace('site.react.k0nrt15.com', $ProjectNameLower + '.com') | Set-Content $files

$file = $ProjectFolder + "\server\index.js"
(Get-Content $file).replace('32287', $DevPort) | Set-Content $file

$file = $ProjectFolder + "\src\index.jade"
(Get-Content $file).replace('[ApplicationName]', $ProjectName) | Set-Content $file

$file = $ProjectFolder + "\src\js\app\configs\route.config.js"
(Get-Content $file).replace('[ApplicationName]', $ProjectName) | Set-Content $file

$file = $ProjectFolder + "\src\ng-views\base\_layout.jade"
(Get-Content $file).replace('[ApplicationName]', $ProjectName) | Set-Content $file
(Get-Content $file).replace('[ApplicationNameLower]', $ProjectNameLower) | Set-Content $file

$file = $ProjectFolder + "\src\components\layout\header\HeaderLogo.js"
(Get-Content $file).replace('Site.React.Template', $ProjectName) | Set-Content $file

#rename project files
$path = $ProjectFolder + "\basic.react.*"
Get-ChildItem -Path $path | Rename-Item -NewName {$_.name -replace "basic.react", $ProjectNameLower}