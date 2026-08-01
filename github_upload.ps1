# ====================================================================
# FURQAN SWEETS — GITHUB REPOSITORY & UPLOAD AUTOMATION SCRIPT
# ====================================================================
# This script initializes a Git repository for Furqan Sweets, commits all
# website & CRM files, and pushes the project to your GitHub repository.
# ====================================================================

param(
    [string]$RepoUrl = ""
)

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " 🍯 FURQAN SWEETS — GITHUB REPOSITORY UPLOAD SCRIPT" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan

# 1. Locate Git executable
$gitCmd = "git"
if (-not (Get-Command "git" -ErrorAction SilentlyContinue)) {
    $possiblePaths = @(
        "C:\Program Files\Git\cmd\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe",
        "$env:USERPROFILE\AppData\Local\Programs\Git\cmd\git.exe"
    )
    $found = $false
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $gitCmd = $path
            $found = $true
            break
        }
    }
    if (-not $found) {
        Write-Host "[!] Git is not installed in standard Windows paths." -ForegroundColor Red
        Write-Host "[!] Please install Git for Windows from: https://git-scm.com/download/win" -ForegroundColor Yellow
        Write-Host "    After installing Git, re-run this script: .\github_upload.ps1" -ForegroundColor Gray
        exit 1
    }
}

Write-Host "[OK] Found Git command: $gitCmd" -ForegroundColor Green

# 2. Check or set Git user identity
$name = & $gitCmd config --get user.name
if (-not $name) {
    & $gitCmd config --global user.name "Furqan Sweets Owner"
    & $gitCmd config --global user.email "owner@furqansweets.co.uk"
    Write-Host "[OK] Configured default Git identity (owner@furqansweets.co.uk)" -ForegroundColor Green
}

# 3. Initialize repository if not already initialized
if (-not (Test-Path ".\.git")) {
    Write-Host "-> Initializing Git repository..." -ForegroundColor Cyan
    & $gitCmd init
} else {
    Write-Host "[OK] Git repository already initialized." -ForegroundColor Green
}

# 4. Stage all files (respecting .gitignore)
Write-Host "-> Staging website, CRM, Supabase schema, and assets..." -ForegroundColor Cyan
& $gitCmd add .

# 5. Create commit
Write-Host "-> Committing project files..." -ForegroundColor Cyan
& $gitCmd commit -m "Initial commit: Furqan Sweets E-Commerce Store & CRM with Supabase and Security Lockout"

# 6. Prompt for GitHub Repository URL if not provided via parameter
if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Yellow
    Write-Host "Next step: Upload to GitHub!" -ForegroundColor White
    Write-Host "1. Create an empty repository on https://github.com/new" -ForegroundColor Gray
    Write-Host "2. Paste your repository URL below (e.g. https://github.com/username/furqansweets.git):" -ForegroundColor Gray
    $RepoUrl = Read-Host "GitHub Repo URL"
}

if (-not [string]::IsNullOrWhiteSpace($RepoUrl)) {
    Write-Host "-> Configuring remote origin: $RepoUrl" -ForegroundColor Cyan
    & $gitCmd branch -M main
    & $gitCmd remote remove origin 2>$null
    & $gitCmd remote add origin $RepoUrl
    
    Write-Host "-> Pushing to GitHub repository..." -ForegroundColor Yellow
    & $gitCmd push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "================================================================" -ForegroundColor Green
        Write-Host " 🚀 SUCCESS! Your Furqan Sweets project is live on GitHub!" -ForegroundColor Green
        Write-Host "================================================================" -ForegroundColor Green
    } else {
        Write-Host "[!] Push failed. Please check your GitHub permissions or authentication token." -ForegroundColor Red
    }
} else {
    Write-Host "[!] No GitHub URL provided. Repository is committed locally and ready when you are." -ForegroundColor Yellow
}
