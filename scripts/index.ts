// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397705
// Pour déboguer du code durant le chargement d'une page dans Ripple ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
module BlankCordovaApp1 {
    "use strict";

    export module Application {
        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady() {
            // Gérer les événements de suspension et de reprise Cordova
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
            var parentElement = document.getElementById('deviceready');
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }

        function onPause() {
            // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
        }

        function onResume() {
            // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
        }

    }

    window.onload = function () {
        Application.initialize();
    }
}
