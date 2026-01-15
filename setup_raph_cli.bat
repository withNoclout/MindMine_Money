@echo off
echo Setting up RaphLoop CLI...
cd tools\raph-loop
if not exist .env copy .env.template .env
echo.
echo [IMPORTANT] Please edit tools\raph-loop\.env and add your OPENAI_API_KEY.
echo.
echo To run RaphLoop:
echo cd tools\raph-loop
echo npm start "your request here"
echo.
pause
