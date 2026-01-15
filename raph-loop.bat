@echo off
REM RAPH-LOOP Command Integration for MindMine Money
REM This script integrates the RAPH-LOOP autonomous iteration protocol

echo ========================================
echo RAPH-LOOP Autonomous Iteration Protocol
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ to use RAPH-LOOP
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "tools\raph-loop\package.json" (
    echo ERROR: RAPH-LOOP not found in tools\raph-loop directory
    echo Please ensure RAPH-LOOP is properly installed
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "tools\raph-loop\node_modules" (
    echo Installing RAPH-LOOP dependencies...
    cd tools\raph-loop
    npm install
    cd ..\..
)

REM Check if build exists
if not exist "tools\raph-loop\dist" (
    echo Building RAPH-LOOP...
    cd tools\raph-loop
    npm run build
    cd ..\..
)

REM Get command line arguments
set REQUEST=%1
set TRIGGER=%2
set CONTEXT=%3

if "%REQUEST%"=="" (
    echo Usage: raph-loop [request] [trigger] [context]
    echo.
    echo Examples:
    echo   raph-loop "Fix the failing tests" /raph ./src
    echo   raph-loop "Resolve build errors" /raph-loop .
    echo   raph-loop "Analyze and fix issues" /raph %CD%
    echo.
    pause
    exit /b 0
)

if "%TRIGGER%"=="" set TRIGGER=/raph
if "%CONTEXT%"=="" set CONTEXT=%CD%

echo Running RAPH-LOOP with:
echo   Request: %REQUEST%
echo   Trigger: %TRIGGER%
echo   Context: %CONTEXT%
echo.

REM Execute RAPH-LOOP
cd tools\raph-loop
node dist/index.js execute "%REQUEST%" "%TRIGGER%" "%CONTEXT%"
set RESULT=%errorlevel%
cd ..\..

echo.
if %RESULT% equ 0 (
    echo ✓ RAPH-LOOP completed successfully
) else (
    echo ✗ RAPH-LOOP failed with exit code %RESULT%
)

pause
exit /b %RESULT%