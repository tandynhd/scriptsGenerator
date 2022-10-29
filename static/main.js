//Init SpeachSynth API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
const body2 = document.querySelector(".row");
const btn = document.getElementById("btn");
// const body3 = document.querySelector(".body3");

btn.addEventListener("click", function handleClick() {
  const initialText = "Speak";

  if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    btn.textContent = "Stop";
  } else {
    btn.textContent = initialText;
  }
});

body.style.background = "#003049 url(../../static/sound-waves.gif)";
body.style.backgroundRepeat = "repeat-x";
body.style.backgroundSize = "100% 100%";
body2.style.background = "url(../../static/audio.gif)";
body2.style.backgroundRepeat = "repeat-x";
body2.style.backgroundSize = "100% 100%";

//Init Voices Array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  //loop through the voices and create an option for each one
  voices.forEach((voice) => {
    //Create Option Elements
    const option = document.createElement("option");
    //Fill Options with the Voice and Language
    option.textContent = voice.name + "(" + voice.lang + ")";
    //Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
  //Check if speaking
  if (synth.speaking) {
    console.error("Already Speaking");
    synth.cancel();
    return;
  }
  if (textInput.value !== "") {
    //Add Background Animation
    body.style.background = "#003049 url(../../static/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    body2.style.background = "url(../../static/speaking.gif)";
    body2.style.backgroundSize = "10% 10%";

    //Get Speak Text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak End
    speakText.onend = (e) => {
      console.log("Done Speaking");
      body.style.background = "#003049 url(../../static/sound-waves.gif)";
      body.style.backgroundRepeat = "repeat-x";
      body.style.backgroundSize = "100% 100%";
      body2.style.background = "url(../../static/audio.gif)";
      body2.style.backgroundRepeat = "repeat-x";
      body2.style.backgroundSize = "100% 100%";
      btn.textContent = "Speak";
    };

    //Speak Error
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    //Selected Voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    //Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //Set Pitch and Rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

//Event Listeners
//Text form submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//Rate and Pitch Value Change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

//Voice Select Change
// voiceSelect.addEventListener("change", (e) => speak());
