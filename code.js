const cards = document.querySelectorAll(".cards"); // Select all song cards
let currentSong = null; // Track the currently playing song
let currentPlayIcon = null; // Track the current play icon
let currentSongIndex = -1; // Track the index of the current song

const volumeSlider = document.getElementById("volume"); // Volume slider
const songSlider = document.getElementById("songSlider"); // Song progress slider
const prevButton = document.getElementById("prev"); // Previous button
const nextButton = document.getElementById("next"); // Next button

cards.forEach((card, index) => {
  const playIcon = card.querySelector(".play i"); // Get play icon
  const audioElement = card.querySelector("audio"); // Get audio element

  playIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent bubbling

    if (currentSong && currentSong !== audioElement) {
      // Pause the currently playing song if it's different
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
      currentSongIndex = index; // Update the current song index
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
      updateSongSlider();
    } else {
      audioElement.pause();
      currentSong = null;
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }
  });

  audioElement.addEventListener("ended", () => {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    currentSong = null;
    currentPlayIcon = null;
    playNextSong();
  });


//   ITNA CODE LIKHA HAI ABHI 

  // Update the song slider as the song plays
  audioElement.addEventListener("timeupdate", updateSongSlider);
});




// Function to update the song progress slider
function updateSongSlider() {
  if (currentSong) {
    songSlider.max = currentSong.duration; // Set the max value to song duration
    songSlider.value = currentSong.currentTime; // Update the current time
  }
}

// Seek song functionality
songSlider.addEventListener("input", () => {
  if (currentSong) {
    currentSong.currentTime = songSlider.value; // Seek to the selected time
  }
});

// Function to play the next song
function playNextSong() {
  if (currentSongIndex < cards.length - 1) {
    currentSongIndex++;
    loadSong(currentSongIndex);
  }
}

// Function to play the previous song
function playPreviousSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    loadSong(currentSongIndex);
  }
}

// Load the selected song
function loadSong(index) {
  const card = cards[index];
  const audioElement = card.querySelector("audio");
  const playIcon = card.querySelector(".play i");

  // Pause current song if any
  if (currentSong) {
    currentSong.pause();
    if (currentPlayIcon) {
      currentPlayIcon.classList.remove("fa-pause");
      currentPlayIcon.classList.add("fa-play");
    }
  }

  // Play new song
  audioElement.play();
  currentSong = audioElement;
  currentPlayIcon = playIcon;
  currentSongIndex = index;
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  updateSongSlider();
}

// Event listeners for next and previous buttons
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPreviousSong);

// Volume control
volumeSlider.addEventListener("input", () => {
  if (currentSong) {
    currentSong.volume = volumeSlider.value; // Adjust the volume
  }
});
