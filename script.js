console.log("Welcome to Spotify");
//Initialize the variable
let songIndex=0;
let audioElement=new Audio('song1.mp3');
let masterPlay=document.getElementById('masterplay');
let MyprogressBar=document.getElementById('MyprogressBar');
let GIF=document.getElementById('GIF');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Tere Naina",filePath:"music/1.mp3", coverPath:"cover/1.png"},
    {songName:"Chini Chameli",filePath:"music/2.mp3", coverPath:"cover/2.png"},
    {songName:"Dariya",filePath:"music/3.mp3", coverPath:"cover/3.png"},
    {songName:"Gallan Gudiya",filePath:"music/4.mp3", coverPath:"cover/4.png"},
    {songName:"Tera Ban Jauga",filePath:"music/5.mp3", coverPath:"cover/5.png"},
    {songName:"Tere Sath hai to",filePath:"music/6.mp3", coverPath:"cover/6.png"},
    {songName:"Ishq di Bajiyan",filePath:"music/7.mp3", coverPath:"cover/7.png"},
    {songName:"Tere Naina",filePath:"music/1.mp3", coverPath:"cover/1.png"}
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})

// audioElement.play();
//Handle play/pause click
masterplay.addEventListener('click',() =>{
    if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    GIF.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        GIF.style.opacity=0;
    }

})


//Listen to event
audioElement.addEventListener('timeupdate',() =>{
    console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    MyprogressBar.value=progress;
    
})
MyprogressBar.addEventListener('change',()=>{
    audioElement.currentTime=MyprogressBar.value*audioElement.duration/100;
})
const makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.addEventListener('click',(e)=>{
        makeAllplays();
        songIndex=parseInt(e.target.id);
        // console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src=`music/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`music/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`music/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})