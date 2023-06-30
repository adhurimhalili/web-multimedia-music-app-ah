let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://theultimaterabbit.files.wordpress.com/2019/06/metallica-black-album-cover.jpg',
        name : 'Enter Sandman',
        artist : 'Metallica',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124433121136357487/Metallica_-_Enter_Sandman.mp3'
    },
    {
        img : 'https://theultimaterabbit.files.wordpress.com/2019/06/metallica-black-album-cover.jpg',
        name : 'Nothing Else Matters',
        artist : 'Metallica',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124433211112575006/Metallica_-_Nothing_Else_Matters.mp3'
    },

    {
        img : 'https://i.scdn.co/image/ab67616d0000b273f903e62767a0e22e33b7af83',
        name : 'Hold the Line',
        artist : 'Toto',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124433174097838190/Toto_-_Hold_the_Line.mp3'
    },

    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/3f606b39b6ef26c7dbcf69efaebc8f97/500x500-000000-80-0-0.jpg',
        name : 'The Trooper',
        artist : 'Iron Maiden',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124435072066531338/Iron_Maiden_-_The_Trooper.mp3'
    },







    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/50e0efb4b5a9c181bc02536fb034330a/500x500-000000-80-0-0.jpg',
        name : 'Dream On',
        artist : 'Aerosmith',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124435410676895907/Aerosmith_-_Dream_On.mp33'
    },
    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/4c9fd7e1257024bff5be2a795fc7e5ca/500x500-000000-80-0-0.jpg',
        name : 'Careless Whisper',
        artist : 'George Michael',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124435907601244240/George_Michael_-_Careless_Whisper.mp3'
    },

    


    
    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/370483b6b448fafeeff053a1556467da/500x500-000000-80-0-0.jpg',
        name : 'Seven Nation Army',
        artist : 'The White Stripers',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124436165995540550/The_White_Stripes_-_Seven_Nation_Army.mp3'
    },



    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/302f0325f79a75a76f778ee0a80dee48/500x500-000000-80-0-0.jpg',
        name : 'Paralyzer',
        artist : 'Finger Eleven',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124436503762849912/Finger_Eleven_-_Paralyzer.mp3'
    },

    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/8b8fc5d117f9357b79f0a0a410a170e8/500x500-000000-80-0-0.jpg',
        name : 'Bohemian Rhapsody',
        artist : 'Queen',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124437646366756934/Queen_-_Bohemian_Rhapsody.mp3'
    },
    {
        img : 'https://e-cdns-images.dzcdn.net/images/cover/70dfccede53de57d454c935a254b4d9b/500x500-000000-80-0-0.jpg',
        name : 'Sweet Victory',
        artist : 'David Glen Eisley',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124436836262084668/David_Glen_Eisley_-_Sweet_Victory.mp3'
    },    
    {
        img : 'https://images6.alphacoders.com/121/thumb-1920-1217120.png',
        name : 'Mos me Gjyko',
        artist : 'Sidrit Bejleri',
        music : 'https://cdn.discordapp.com/attachments/767474223136112671/1124438919447072888/Mos_me_gjyko_ske_te_drejte_sta_lejoj_-_Kali_i_eger_dubluar_ne_shqip-dVRt8aRhRJ0-192k-1688157488.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
