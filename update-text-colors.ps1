# PowerShell script to add dark mode to remaining pages
$files = @(
    "src\app\returns\page.tsx",
    "src\app\refund-policy\page.tsx",
    "src\app\privacy-policy\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $original = $content
        
        # Replace text-gray-700 without dark mode
        $content = $content -replace 'text-gray-700"', 'text-gray-700 dark:text-gray-300"'
        $content = $content -replace 'text-gray-700 ', 'text-gray-700 dark:text-gray-300 '
        
        # Replace text-gray-900 without dark mode  
        $content = $content -replace '([^:])text-gray-900"', '$1text-gray-900 dark:text-white"'
        $content = $content -replace '([^:])text-gray-900 ', '$1text-gray-900 dark:text-white '
        
        # Replace text-gray-800
        $content = $content -replace 'text-gray-800"', 'text-gray-800 dark:text-gray-300"'
        $content = $content -replace 'text-gray-800 ', 'text-gray-800 dark:text-gray-300 '
        
        if ($content -ne $original) {
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "✅ Updated: $file" -ForegroundColor Green
        } else {
            Write-Host "⏭️  Already updated: $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Text color dark mode update complete!" -ForegroundColor Cyan
