# WPServices Database Setup (Windows PowerShell)
# Usage: .\setup-db.ps1 -Password "your_mysql_password"

param(
    [Parameter(Mandatory = $true)]
    [string]$Password
)

$envContent = @"
PORT=5002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$Password
DB_NAME=wpservices_agency
DB_PORT=3306
JWT_SECRET=change_this_to_a_long_random_string
ADMIN_EMAIL=admin@wpservices.com
ADMIN_PASSWORD=change_this_password
FRONTEND_URL=http://localhost:5173
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8 -Force
Write-Host "Created .env with your MySQL password." -ForegroundColor Green

Write-Host "Seeding database..." -ForegroundColor Yellow
npm run seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database ready! Run 'npm run dev' from the project root." -ForegroundColor Green
} else {
    Write-Host "Seed failed. Check MySQL is running and password is correct." -ForegroundColor Red
}
