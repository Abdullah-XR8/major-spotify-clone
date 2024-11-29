console.log("javascript");

const cards = document.querySelectorAll(".cards"); //! this is a card of songs
let currentSong = null; //! Keep track of the currently playing song all the songs are paused at starting
let currentPlayIcon = null; //! Keep track of the current play icon this is the play icon paused
let currentSongIndex = -1; // Track the index of the current song

//* ALL THE ITEMS ARE HERE

const volumeSlider = document.getElementById("volume-slider"); // Volume slider
const progressInput = document.getElementById("progress"); // Song progress slider
const prevButton = document.getElementById("prev"); // Previous button
const nextButton = document.getElementById("next"); // Next button
const audioElement = document.getElementById("myAudio"); // Use the correct ID
const volumeUpButton = document.getElementById("volume-up"); // incresing volume button
const volumeDownButton = document.getElementById("volume-down"); // decreasing volume button

//! code for all the cards for playing songs are this

cards.forEach((card) => {
  const playIcon = card.querySelector(".play i"); //?getting play icon
  const audioElement = card.querySelector("audio"); //? getting audio of song

  playIcon.addEventListener("click", (event) => {
    // Prevent the event from bubbling up to the card add event listner for stop
    event.stopPropagation();

    // Pause the currently playing song (if any)
    if (currentSong && currentSong !== audioElement) {
      currentSong.pause();
      if (currentPlayIcon) {
        currentPlayIcon.classList.remove("fa-pause");
        currentPlayIcon.classList.add("fa-play");
      }
    }

    // Play or pause the song
    if (audioElement.paused) {
      audioElement.play();
      currentSong = audioElement;
      currentPlayIcon = playIcon;
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    } else {
      audioElement.pause();
      currentSong = null;
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }
  });

  // at the end of song the settings were reset
  audioElement.addEventListener("ended", () => {
    // Reset icon when song ends
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    currentSong = null;
    currentPlayIcon = null;
  });

  function updatePlaybar() {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration; // Define duration here

    const progressPercentage = (currentTime / duration) * 100;
    progressInput.value = progressPercentage;
  }

  // Update progress bar when audio time changes
  audioElement.addEventListener("timeupdate", updatePlaybar);

  // Update audio playback position when progress bar changes
  progressInput.addEventListener("input", () => {
    const newTime = (progressInput.value / 100) * audioElement.duration; // Use audioElement.duration directly
    audioElement.currentTime = newTime;
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const volumeSlider = document.getElementById('volume-slider');
  const volumeDownButton = document.getElementById('volume-down');
  const volumeUpButton = document.getElementById('volume-up');

  // Check if there's a currently playing song
  function updateVolume() {
    if (currentSong) {
      currentSong.volume = volumeSlider.value;
    }
  }

  // Update audio volume when slider value changes
  volumeSlider.addEventListener('input', function () {
    updateVolume();  // Apply volume to the currently playing audio
  });

  // Decrease volume by 0.1
  volumeDownButton.addEventListener('click', function () {
    if (currentSong) {
      currentSong.volume = Math.max(0, currentSong.volume - 0.1);
      volumeSlider.value = currentSong.volume; // Update slider to reflect new volume
    }
  });

  // Increase volume by 0.1
  volumeUpButton.addEventListener('click', function () {
    if (currentSong) {
      currentSong.volume = Math.min(1, currentSong.volume + 0.1);
      volumeSlider.value = currentSong.volume; // Update slider to reflect new volume
    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector('.prev');
  const playPauseButton = document.querySelector('.songdButtons img:nth-child(2)');
  const nextButton = document.querySelector('.next');
  
  let songs = Array.from(cards).map(card => card.querySelector("audio"));  // Collect all audio elements
  let currentSongIndex = -1;  // Track the current song index

  // Play a song based on its index
  function playSong(index) {
    if (currentSong) {
      currentSong.pause(); // Pause the currently playing song
      currentPlayIcon.classList.remove("fa-pause");
      currentPlayIcon.classList.add("fa-play");
    }

    currentSongIndex = index;
    currentSong = songs[currentSongIndex];
    currentSong.play();
    
    // Change the play/pause button
    playPauseButton.src = "Code/images/play-circle-02-stroke-rounded.svg";
  }

  // Play the next song
  function playNextSong() {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }

  // Play the previous song
  function playPreviousSong() {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  }

  // Handle Play/Pause Button Click
  playPauseButton.addEventListener('click', function () {
    if (currentSong && !currentSong.paused) {
      currentSong.pause();
      playPauseButton.src = "Code/images/play-circle-02-stroke-rounded.svg"; // Change to play icon
    } else {
      if (currentSong) {
        currentSong.play();
      } else {
        playSong(0); // Start playing the first song if no song is selected
      }
      playPauseButton.src = "Code/images/circle-pause-regular.svg"; // Change to pause icon
    }
  });

  // Handle Next Button Click
  nextButton.addEventListener('click', playNextSong);

  // Handle Previous Button Click
  prevButton.addEventListener('click', playPreviousSong);

  // When the current song ends, automatically play the next song
  songs.forEach(song => {
    song.addEventListener('ended', playNextSong);
  });
});
