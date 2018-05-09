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

function askPermission(){
  Notification.requestPermission(function(result){
    if(result !== 'granted'){
      console.log('No permission from user');
    } else {
      console.log('permission given');
    }
  })
}

if('Notification' in window){
  for(var i = 0; i < buttonsPermissionNotifications.length; i++){
    buttonsPermissionNotifications[i].style.display = 'inline-block';
    buttonsPermissionNotifications[i].addEventListener('click', askPermission);
  }
}
