import MediaPlayer from './MediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';
import Ads from './plugins/Ads';

const video = document.querySelector('video');
const playButton: HTMLElement = document.querySelector('#play');
const muteButton: HTMLElement = document.querySelector('#mute')

const player = new MediaPlayer({ el: video, plugins: [
    new AutoPlay(),
    new AutoPause(),
    new Ads()
]});

playButton.onclick = () => { player.togglePlay() }
muteButton.onclick = () => { player.toggleMute() }

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .catch((err) => {
        console.log(err.message);
    });
}