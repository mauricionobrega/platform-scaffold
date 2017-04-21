@ECHO OFF

IF NOT "%1"=="" (
    IF "%1"=="start" (
        CALL :start
    ) ELSE (
        IF "%1"=="stop" (
            CALL :stop
        ) ELSE (
            IF "%1"=="deploy" (
                CALL :deploy
            ) ELSE (
                IF "%1"=="help" (
                    CALL :help
                ) ELSE (
                    CALL :todo
                )
            )
        )
    )

) ELSE (
  CALL :help
)

:: force execution to quit at the end of the "main" logic
EXIT /B %ERRORLEVEL%

:start
ECHO                     `:-.
ECHO                    -yyyyys+:`
ECHO                   /yyyyyyyyy`  +o+/:-.
ECHO                 `oyyyyyyyyy-  :hhhhhhhs
ECHO                `syyyyyyyyy+   yhhhhhhhy
ECHO            `-/oyyyyyyyyyyo   :hhhhhhhhs
ECHO         -/oyyyyyyyyyyyyyo`   shhhhhhhhs
ECHO       +yyyyyyyyyyyyyyyy+    `hhhhhhhhho
ECHO       +yyyyyyyyyyyyyy+.     .hhhhhhhhho
ECHO       `yyyyyyyyys+/.         yhhhhhhhhhs`
ECHO        -yso+/-.`             .yhhhhhhhhhy.
ECHO                ```.....`      `shhhhhhhhhy.
ECHO          -://++++++++++++/-`    /yhhhhhhhhy.
ECHO          /++++++++++++++++++/.   `ohhhhhhy+`
ECHO          :++++++++++++++++++++/-`  -shhs:`
ECHO          `+++++++++++++++++++++++-`  -`
ECHO           `......-...-/+++++++++++/`
ECHO                        `-/+++++++:`
ECHO                           `.:/+:`
ECHO.
ECHO.
ECHO          Welcome to the Mobify platform!
ECHO.
ECHO.
docker pull mobify/platform-runner
docker run -p 8443:8443 -v %~dp0:/app mobify/platform-runner
EXIT /B 0

:stop 
ECHO Stopped.
EXIT /B 0

:deploy 
ECHO Preparing a bundle...
SLEEP 3
ECHO Bundle is ready, deploying...
SLEEP 5
ECHO Done!
EXIT /B 0

:help 
ECHO Usage: mobify.cmd [command...]
ECHO  Supported commands:
ECHO   start          Start the local Mobify development environment
ECHO   stop           Stop the local Mobify development environment
ECHO   deploy         Prepare a project bundle and deploy to the Mobify cloud
ECHO   push           Send a test Push Notification
ECHO   sdk            Run Mobify Progressive SDK commands
ECHO   test           Run all unit tests
ECHO   perf-test      Run all performance tests (Lighthouse, WPT)
ECHO   help           This page
EXIT /B 0

:todo 
ECHO Not yet implemented...
EXIT /B 0
