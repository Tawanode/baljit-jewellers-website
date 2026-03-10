$base64 = (Get-Content 'd:\baljit-jew\image_base64.txt' -Raw).Trim()
$imgTag = '<img src="data:image/jpeg;base64,' + $base64 + '" alt="Baljit Jewellers Logo" style="height:45px;width:auto;object-fit:contain;" />'
$content = [System.IO.File]::ReadAllText('d:\baljit-jew\index.html')
$oldSpan = '<span class="logo-icon"><i class="fas fa-gem"></i></span>'
$newContent = $content.Replace($oldSpan, $imgTag)
if ($content -ne $newContent) {
    [System.IO.File]::WriteAllText('d:\baljit-jew\index.html', $newContent)
    Write-Host 'SUCCESS: Gem icon replaced with base64 image.'
} else {
    Write-Host 'WARNING: Pattern not found - no replacement made.'
}
