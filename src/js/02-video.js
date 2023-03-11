import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const onPlay = function (e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
};
const onPlayThrottled = throttle(onPlay, 1000);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
player.on('timeupdate', onPlayThrottled);
