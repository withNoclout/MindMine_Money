#!/usr/bin/env pwsh

# RAPH-LOOP Command Integration for MindMine Money
# This script integrates the RAPH-LOOP autonomous iteration protocol

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RAPH-LOOP Autonomous Iteration Protocol" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>$null
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ to use RAPH-LOOP" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "tools\raph-loop\package.json")) {
    Write-Host "ERROR: RAPH-LOOP not found in tools\raph-loop directory" -ForegroundColor Red
    Write-Host "Please ensure RAPH-LOOP is properly installed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if dependencies are installed
if (-not (Test-Path "tools\raph-loop\node_modules")) {
    Write-Host "Installing RAPH-LOOP dependencies..." -ForegroundColor Yellow
    Set-Location tools\raph-loop
    npm install
    Set-Location ..\..
}

# Check if build exists
if (-not (Test-Path "tools\raph-loop\dist")) {
    Write-Host "Building RAPH-LOOP..." -ForegroundColor Yellow
    Set-Location tools\raph-loop
    npm run build
    Set-Location ..\..
}

# Get command line arguments
$Request = $args[0]
$Trigger = $args[1]
$Context = $args[2]

if (-not $Request) {
    Write-Host "Usage: raph-loop.ps1 [request] [trigger] [context]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor White
    Write-Host "  raph-loop.ps1 'Fix the failing tests' /raph ./src" -ForegroundColor Gray
    Write-Host "  raph-loop.ps1 'Resolve build errors' /raph-loop ." -ForegroundColor Gray
    Write-Host "  raph-loop.ps1 'Analyze and fix issues' /raph $PWD" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 0
}

if (-not $Trigger) { $Trigger = "/raph" }
if (-not $Context) { $Context = Get-Location }

Write-Host "Running RAPH-LOOP with:" -ForegroundColor Cyan
Write-Host "  Request: $Request" -ForegroundColor White
Write-Host "  Trigger: $Trigger" -ForegroundColor White
Write-Host "  Context: $Context" -ForegroundColor White
Write-Host ""

# Execute RAPH-LOOP
Set-Location tools\raph-loop
try {
    node dist/index.js execute $Request $Trigger $Context
    $Result = $LASTEXITCODE
} catch {
    Write-Host "Error executing RAPH-LOOP: $_" -ForegroundColor Red
    $Result = 1
}
Set-Location ..\..

Write-Host ""
if ($Result -eq 0) {
    Write-Host "✓ RAPH-LOOP completed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ RAPH-LOOP failed with exit code $Result" -ForegroundColor Red
}

Read-Host "Press Enter to exit"
exit $Result