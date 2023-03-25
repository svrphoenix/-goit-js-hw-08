import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// функція для встановлення збереженого часу  плеєра та обробки помилок 
const setSavedCurrentTime = (savedCurrentTime, playerInstance) => {
  playerInstance.setCurrentTime(savedCurrentTime).then((seconds) => {
    console.log('Playing from saved time: ', seconds)
  }).catch((error) => {
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
//функція для збереження часу  плеєра
const onTimeUpdate = (currentTime) => localStorage.setItem(STORAGE_KEY, currentTime.seconds);

setSavedCurrentTime(localStorage.getItem(STORAGE_KEY), player);
player.on('timeupdate', throttle(onTimeUpdate, 1000));