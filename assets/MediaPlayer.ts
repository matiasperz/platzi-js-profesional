class MediaPlayer {
    media: HTMLMediaElement;
    plugins: Array<any>;
    container: HTMLElement;

    constructor(config) {
        this.media = config.el;
        this.plugins = config.plugins || [];
        this.initPlayer();
        this.initPlugins();
    }
    
    private initPlayer(){
        this.container = document.createElement('div');
        this.container.style.position = 'relative';

        this.media.parentNode.insertBefore(this.container, this.media);
        this.container.appendChild(this.media);
    }

    private initPlugins() {
        const player = this;
        this.plugins.forEach(plugin => {
            plugin.run(player);
        });
    }
    
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    togglePlay() {
        this.media.paused ? this.play() : this.pause();
    }
    mute() {
        this.media.muted = true;
    }
    unmute() {
        this.media.muted = false;
    }
    toggleMute() {
        this.media.muted ? this.unmute() : this.mute();
    }
}

export default MediaPlayer;