CLS
@ECHO off
:init
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO 1  - Run Install
ECHO 2  - Run POGOserver
ECHO 3  - Run Web-API
ECHO 4  - Run POGOserver Update
ECHO Q  - EXIT
ECHO.
CHOICE /C:1234Q /M "Please select a control:"
IF ERRORLEVEL 5 GOTO exit
IF ERRORLEVEL 4 GOTO four
IF ERRORLEVEL 3 GOTO three
IF ERRORLEVEL 2 GOTO two
IF ERRORLEVEL 1 GOTO one
GOTO end

:one
ECHO POGOserver Install and build
SET LIBPROTOBUF=%CD%\protobuf
npm install node-protobuf && npm install
GOTO end

:two
ECHO Run POGOserver Localhost
npm run boot
GOTO end

:three
ECHO Start POGOserver web-api on port 9000
npm run api
GOTO end

:four
ECHO POGOserver updater
npm run update

:exit
CHOICE /M "Do yo really want to quit"
IF ERRORLEVEL 2 GOTO init

:end
ECHO.
ECHO.
PAUSE
ECHO.
