const music = document.querySelector('audio');
const play = document.getElementById("play");
const img = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let current_time = document.getElementById('current_time');
let total_duration = document.getElementById('duration');
const progress_div = document.getElementById('progress_div');

const songs = [
    {
        name: "song1",
        title: "Piano music",
        artist: "greatLegend",
    },

    {
        name: "song2",
        title: "silent music",
        artist: "greatLegend",
    },
    {
        name: "song3",
        title: "forest music",
        artist: "The Legend",
    },
    {
        name: "song4",
        title: "Guitar music",
        artist: "great pro max",
    },
    {
        name: "song5",
        title: "Guitar pro",
        artist: "great max",
    },
]

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', "fa-pause");
    img.classList.add('anime');
};

// for pause functionality
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', "fa-play");
    img.classList.remove('anime');
};

play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})


// change songs 

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;
// loadSong(songs[0]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// duration progress work
music.addEventListener('timeupdate', (event) => {

    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;


    // MUSIC DURATION UPDATE

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}: ${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // CURRENT DURATION UPDATE
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }

    let curr_duration = `${min_currentTime}: ${sec_currentTime}`;
    current_time.textContent = `${curr_duration}`;


});

//progress on click functionality
progress_div.addEventListener('click', (event) => {
    const { duration } = music;

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    // console.log(move_progress);

    music.currentTime = move_progress;
})

// if song ends, play the next song
music.addEventListener('ended', nextSong);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);