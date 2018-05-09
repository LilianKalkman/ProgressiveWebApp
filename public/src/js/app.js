var buttonsPermissionNotifications = document.querySelectorAll('.enable-notifications');

var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

function displayConfirmNotification(){
  const options = {
    body: 'Let the stalking begin',
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/154626-200.png',
    image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/154626-200.png',
    vibrate: [100, 50, 200],
    badge: '/src/images/icons/app-icon-96x96.png',
    tag: 'confirm-notification',
    renotify: true,
    actions: [
      {action: 'confirm', title: 'Ok', icon: 'https://image.freepik.com/iconen-gratis/duim-omhoog-te-vinden-op-facebook_318-37196.jpg'},
      {action: 'cancel', title: 'Ok Doei', icon: 'https://image.freepik.com/iconen-gratis/duim-omhoog-te-vinden-op-facebook_318-37196.jpg'}
    ]
  };
  if('serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(function(sw){
      sw.showNotification('Confirmed Notifications, lekker bezig!', options);
    })
  } else {
    new Notification('Confirmed Notifications, lekker bezig!', options);
  }
}

// de tag option geeft een id/name/ref naar je notification, en je renotify optie bepaalt op je bij een zelfde notificatie
// (met zelfde naam/tag) je telefoon weer vibreert en notificatie laat zien of niet.

function askPermission(){
  Notification.requestPermission(function(result){
    if(result !== 'granted'){
      console.log('No permission for notifications from user');
    } else {
      console.log('permission given to send notifications');
      displayConfirmNotification();
      // set display buttons back to none
    }
  })
}

if('Notification' in window){
  for(var i = 0; i < buttonsPermissionNotifications.length; i++){
    buttonsPermissionNotifications[i].style.display = 'inline-block';
    buttonsPermissionNotifications[i].addEventListener('click', askPermission);
  }
}
