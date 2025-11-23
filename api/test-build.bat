@echo off
echo Step 1: Creating directory structure...
mkdir node_modules\@pulsegrid 2>nul

echo Step 2: Copying shared types...
xcopy ..\shared\types node_modules\@pulsegrid\types\ /E /I /Y

echo Step 3: Copying shared utils...
xcopy ..\shared\utils node_modules\@pulsegrid\utils\ /E /I /Y

echo Step 4: Installing dependencies...
npm install

echo Step 5: Building...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed!
)