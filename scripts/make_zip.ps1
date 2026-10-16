$zipName = "WisnuWidyaPradana_411231088_TugasPertemuan3.zip"
if (Test-Path $zipName) {
    Remove-Item $zipName -Force
}

$exclude = @("node_modules", "dist", ".expo", ".git", $zipName)
$items = Get-ChildItem -Path . | Where-Object { $exclude -notcontains $_.Name }

Compress-Archive -Path $items.FullName -DestinationPath $zipName -Force
Get-Item $zipName | Select-Object Name, Length, LastWriteTime

