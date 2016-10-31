@ECHO off
:init
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO			1 - Run Build-Install
ECHO			2 - Run POGOserver
ECHO			3 - Run Web-API
ECHO			4 - Run POGOserver Update
ECHO			Q - Exit
ECHO.
REM To start the server automatically please remove "REM" in the following line and add "REM" in the current line "CHOICE".
REM This Will start the server in 10 seconds for a superior time change /T 10 by /T XX. 
REM Change /D 2 by default startup service.
ECHO.
REM CHOICE /C:1234Q /N /T 10 /D 2 /M "Please select a control?"
CHOICE /C:1234Q /M "Please select a control:" 
IF ERRORLEVEL 5 GOTO exit
IF ERRORLEVEL 4 GOTO four
IF ERRORLEVEL 3 GOTO three
IF ERRORLEVEL 2 GOTO two
IF ERRORLEVEL 1 GOTO one
GOTO end

:one
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO			POGOserver Build-Install
ECHO.
ECHO.
SET LIBPROTOBUF=%CD%\protobuf
npm install node-protobuf && npm install
GOTO end

:two
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO			Run POGOserver
ECHO.
ECHO.
npm run boot
GOTO end

:three
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO			Start POGOserver Web-API on port 9000
ECHO.
ECHO.
npm run api
GOTO end

:four
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
ECHO			POGOserver updater
ECHO.
ECHO.
npm run update

:exit
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
CHOICE /M "Do yo really want to quit"
IF ERRORLEVEL 2 GOTO init

:end
CLS
ECHO.
TYPE %CD%\.greet
ECHO.
ECHO.
PAUSE
ECHO.
