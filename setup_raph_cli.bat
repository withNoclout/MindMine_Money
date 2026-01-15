@echo off
echo ========================================
echo Setting up RAPH-LOOP CLI Integration
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

REM Check if tools directory exists
if not exist tools (
    echo Creating tools directory...
    mkdir tools
)

REM Check if raph-loop directory exists
if not exist tools\raph-loop (
    echo ERROR: RAPH-LOOP not found in tools\raph-loop
    echo Please ensure RAPH-LOOP is properly installed
    pause
    exit /b 1
)

cd tools\raph-loop

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Build the project
if not exist dist (
    echo Building RAPH-LOOP...
    npm run build
    if %errorlevel% neq 0 (
        echo ERROR: Failed to build RAPH-LOOP
        pause
        exit /b 1
    )
)

echo.
echo ✅ RAPH-LOOP setup completed successfully!
echo.
echo Usage Examples:
echo   raph-loop.bat "Fix the failing tests" /raph ./src
echo   raph-loop.ps1 "Resolve build errors" /raph-loop .
echo   raph-loop.bat "Analyze code issues" /raph %CD%
echo.
echo Trigger Commands:
echo   /raph        - Standard RAPH-LOOP execution
echo   /raph-loop   - Extended RAPH-LOOP execution
echo.
echo Configuration: tools\raph-loop\config\anti-gravity.json
echo.

cd ..\..
pause
