//JAVASCRIPT FOR VIDEO PLAYER
var video = document.querySelector('.video');
var progress_bar = document.querySelector('.progress_bar');
var control_btn = document.getElementById('play_pause');

function togglePlayPause() {
    if(video.paused){
        btn.className = 'pause';
        video.Play() ;
    }
    else {
        btn.className = 'play';
        video.Pause();
    }
}

btn.onclick = function() {
    togglePlayPause();
};

video.addEventListener('timeupdate', function() {
    let bar_position = video.currentTime/video.duration;
    progress_bar.style.width = bar_position*100+'%';
});