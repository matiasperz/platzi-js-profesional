import Ads, { Ad } from './Ads';
import MediaPlayer from '../../MediaPlayer';

class AdsPlugin{
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement;
    private currentAd: Ad;
    private adsContainer: HTMLElement;

    constructor(){
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement('div');
    }

    run(player: MediaPlayer){
        this.player = player;
        this.player.container.appendChild(this.adsContainer);
        this.media = this.player.media;
        this.media.addEventListener('timeupdate', this._handleTimeUpdate);
    }

    private _handleTimeUpdate = () => {
        const currentTime = Math.floor(this.media.currentTime);
        if(currentTime % 30 === 0){
            this._renderAd();
        }
    }

    private _renderAd(){
        if(this.currentAd){
            return;
        }

        const ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
            <div class="ads">
                <a class="ads__link" href="${this.currentAd.url}" target="_blank">
                <img class="ads__img" src="${this.currentAd.imageUrl}" />
                <div class="ads__info">
                    <h5 class="ads__title">${this.currentAd.title}</h5>
                    <p class="ads__body">${this.currentAd.body}</p>
                </div>
                </a>
            </div>
        `;

        setTimeout(() => {
            this.currentAd = null;
            this.adsContainer.innerHTML = ""
        }, 15000);
    }
}

export default AdsPlugin;