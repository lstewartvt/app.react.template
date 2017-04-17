#copy base project files to new project folder
$BaseFolder = "D:\Web Apps\Development\React.App"
$BaseFolderContents = "D:\Web Apps\Development\React.App\*"
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
Get-ChildItem -Path $path | Remove-Item -Force
Robocopy $BaseFolder $ProjectFolder /e /XD '.git' 'dist' 'node_modules' 'dist' /XF '.nvmrc' 'start-project.ps1'

#remove obsolete files/folders
$item = $ProjectFolder + "\.git"
Remove-Item $item -Recurse -Force

#replace file text
$file = $ProjectFolder + "\package.json"
(Get-Content $file).replace('React.App', $ProjectName) | Set-Content $file
(Get-Content $file).replace('React.App.Lower', $ProjectNameLower) | Set-Content $file
(Get-Content $file).replace('"type": "git"', '"type": "' + $RepoType + '"') | Set-Content $file
(Get-Content $file).replace('https://github.com/lstewartvt/app.react.template.git', $RepoUrl) | Set-Content $file

$file = $ProjectFolder + "\README.md"
(Get-Content $file).replace('React Application Template', $ProjectName + ' Application') | Set-Content $file
(Get-Content $file).replace('react.app.k0nrt15.com', 'app.' + $ProjectNameLower + '.com') | Set-Content $files

$file = $ProjectFolder + "\server\index.js"
(Get-Content $file).replace('27773', $DevPort) | Set-Content $file

$file = $ProjectFolder + "\src\components\layout\header\HeaderLogo.jsx"
(Get-Content $file).replace('React.App', $ProjectName) | Set-Content $file

$file = $ProjectFolder + "\src\components\layout\header\tests\Header.test.js"
(Get-Content $file).replace('React.App', $ProjectName) | Set-Content $file

$file = $ProjectFolder + "\src\components\layout\header\tests\HeaderLogo.test.js"
(Get-Content $file).replace('React.App', $ProjectName) | Set-Content $file

$file = $ProjectFolder + "\src\components\layout\footer\Footer.jsx"
(Get-Content $file).replace('React.App', $ProjectName) | Set-Content $file

#rename project files
$path = $ProjectFolder + "\app.react.*"
Get-ChildItem -Path $path | Rename-Item -NewName {$_.name -replace "app.react", $ProjectNameLower}