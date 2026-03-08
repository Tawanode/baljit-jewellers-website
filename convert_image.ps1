$base64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("d:\baljit-jew\WhatsApp Image 2026-03-07 at 3.35.02 PM (1).jpeg"))
$base64 | Out-File -FilePath "d:\baljit-jew\image_base64.txt" -Encoding UTF8
Write-Host "Done"
