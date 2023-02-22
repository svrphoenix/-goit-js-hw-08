import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const setSavedCurrentTime = function(savedCurrentTime, playerInstance) {
  playerInstance.setCurrentTime(savedCurrentTime).then(function (seconds) {
  console.log('Playing from saved time: ', seconds)
  }).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('Range Error');
        break;
      default:
        console.log('Error: ', error.name);
        break;
    }
  })
}

const onTimeUpdate = function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime.seconds);
}

setSavedCurrentTime(localStorage.getItem('videoplayer-current-time'), player);
player.on('timeupdate', throttle(onTimeUpdate, 1000));