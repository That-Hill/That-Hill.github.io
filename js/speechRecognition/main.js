// if (!('webkitSpeechRecognition' in window)) {
//   alert('get yourself a proper browser');
// }

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.continuous = true;
recognition.interimResults = true;
const synth = window.speechSynthesis;


const icon = document.querySelector('i.fa.fa-microphone')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');
const sound = document.querySelector('.sound');
container.appendChild(paragraph);
let listening = false;
let question = false;

let pitch = document.querySelector('#pitch');
let pitchValue = document.querySelector('.pitch-value');
let rate = document.querySelector('#rate');
let rateValue = document.querySelector('.rate-value');

recognition.onstart = function() {
  listening = true;
  console.log('Speech recognition service has started');
};

recognition.onend = function() {
  listening = false;
  console.log('Speech recognition service disconnected');
};

const dictate = () => {
  console.log('dictating');
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    paragraph.textContent = speechToText;

    if (event.results[0].isFinal) {
      container.scrollTo(0, container.scrollHeight);
      paragraph = document.createElement('p');
      container.appendChild(paragraph);

      if (speechToText === 'commands') {
        speak(commands);
      }

      if (speechToText === 'command') {
        speak(commands);
      }

      if (speechToText === 'Rinoa') {
        speak(hello);
      }

      if (speechToText === 'hi') {
        speak(hello);
      }

      if (speechToText === 'hello') {
        speak(hello);
      }

      if (speechToText === 'what\'s up') {
        speak(hello);
      }

      if (speechToText.includes('what is the time')) {
        speak(getTime);
      }

      if (speechToText.includes('what\'s the time')) {
        speak(getTime);
      }

      if (speechToText.includes('what time is it')) {
        speak(getTime);
      }

      if (speechToText.includes('what is today\'s date')) {
        speak(getDate);
      }

      if (speechToText.includes('what is the date')) {
        speak(getDate);
      }

      if (speechToText.includes('what is the day')) {
        speak(getDate);
      }

      if (speechToText.includes('what is today')) {
        speak(getDate);
      }

      if (speechToText.includes('today\'s date')) {
        speak(getDate);
      }

      if (speechToText === 'weather') {
        speak(getTheWeatherQuestion);
      }

      if (speechToText === 'what is the weather') {
        speak(getTheWeatherQuestion0);
      }

      if (speechToText.startsWith('weather in')) {
        getTheWeather(speechToText);
      }

      if (speechToText.includes('what is the weather in')) {
        getTheWeather0(speechToText);
      }

      if (speechToText.includes('what\'s the weather in')) {
        getTheWeather1(speechToText);
      }

      if (speechToText.includes('what is your name')) {
        speak(getMyName);
      }

      if (speechToText.includes('what\'s your name')) {
        speak(getMyName);
      }

      if (speechToText.includes('what are you called')) {
        speak(getMyName);
      }

      if (speechToText.includes('who are you')) {
        speak(getMyName0);
      }

      if (speechToText.includes('what are you')) {
        speak(getMyName0);
      }

      if (speechToText.includes('open a website')) {
        utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        setVoice(utterThis);
        synth.speak(utterThis);
        recognition.abort();
        recognition.stop();
        question = true;
        return;
      };

      if (speechToText.includes('open the website')) {
        utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        setVoice(utterThis);
        synth.speak(utterThis);
        recognition.abort();
        recognition.stop();
        question = true;
        return;
      };

      if (speechToText.includes('open a webpage')) {
        utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        setVoice(utterThis);
        synth.speak(utterThis);
        recognition.abort();
        recognition.stop();
        question = true;
        return;
      };

      if (speechToText.includes('open the webpage')) {
        utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        setVoice(utterThis);
        synth.speak(utterThis);
        recognition.abort();
        recognition.stop();
        question = true;
        return;
      };

      if (speechToText.includes('open') && question) {
        // openUrl(speechToText.split(' ')[1]);

        var speechToText0 = speechToText.split('').slice(5);
        var speechToText1 = speechToText0.join('');
        var speechToText2 = speechToText1.split(' ');
        var speechToText3 = speechToText2.join('');
        console.log(speechToText3);
        openUrl(speechToText3);

        question = false;
      };
    }
  };

  // recognition.onend = recognition.start
  // recognition.start();
};

const hello = () => {
  return `Hi. How can I help you? For a list of commands say, commands.`
}

const commands = () => {
  return `I can tell you the weather, the time, today's date, or even open a website for you.`
  // return `I can tell you the weather, the time, or even open a website for you. To exit, say, exit live connect.`
}

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getMyName0 = () => {
  return `I am a speech recognition algorithm, and my name is Rinoa. I was created by Data, for his Hola Code thesis project.`;
}

const getMyName = () => {
  return `my name is Rinoa`;
}

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};

const getTheWeatherQuestion = () => {
  return `If you want the weather, please specify from what city`;
}

const getTheWeatherQuestion0 = () => {
  return `Please specify from what city`;
}

const getTheWeather = (speech) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[2]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
  .then(function(response){
    return response.json();
  }).then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[2]}`);
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      setVoice(utterThis);
      synth.speak(utterThis);
      return
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
    ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    setVoice(utterThis);
    synth.speak(utterThis);
  });
};

const getTheWeather0 = (speech) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
  .then(function(response){
    return response.json();
  }).then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      setVoice(utterThis);
      synth.speak(utterThis);
      return
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
    ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    setVoice(utterThis);
    synth.speak(utterThis);
  });
};

const getTheWeather1 = (speech) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[4]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
  .then(function(response){
    return response.json();
  }).then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[4]}`);
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      setVoice(utterThis);
      synth.speak(utterThis);
      return
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
    ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    setVoice(utterThis);
    synth.speak(utterThis);
  });
};

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  setVoice(utterThis);
  synth.speak(utterThis);
};

const openUrl = (url) => {
  window.open(`https://${url}`,'_newtab');
};

const stripUrl = (str) =>  {
	return str.match(/[a-z]+[:.].*?(?=\s)/);
}

icon.addEventListener('click', () => {
  if (listening) {
    recognition.stop();
    return;
  }
  sound.play();
  dictate();
});

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

const setVoice = (utterThis) => {
  const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
};


// class App {
//   constructor () {
//     window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
//     this.recognition = new SpeechRecognition();
//     this.synth = window.speechSynthesis;
//     this.icon = document.querySelector('i.fa.fa-microphone');
//     this.paragraph = document.createElement('p');
//     this.container = document.querySelector('.text-box');
//     this.sound = document.querySelector('.sound');
//     this.listening = false;
//     this.question = false;
//     // this.close = false;
//     this.appendParagraph();
//     this.voices = [];
//     this.initializeVoicePopulation();
//     this.handleMicIconClick();
//     this.watchRecognition();
//     this.cachedWeather = false;
//
//     this.pitch = document.querySelector('#pitch');
//     this.pitchValue = document.querySelector('.pitch-value');
//     this.rate = document.querySelector('#rate');
//     this.rateValue = document.querySelector('.rate-value');
//   }
//
//   // this.pitch.onchange = function() {
//   //   this.pitchValue.textContent = this.pitch.value;
//   // }
//   //
//   // this.rate.onchange = function() {
//   //   this.rateValue.textContent = this.rate.value;
//   // }
//
//   appendParagraph() {
//     this.container.appendChild(this.paragraph);
//   }
//
//   populateVoiceList() {
//     if(typeof speechSynthesis === 'undefined') {
//       return;
//     }
//
//     this.voices = speechSynthesis.getVoices();
//     let i;
//
//     for(i = 0; i < this.voices.length ; i++) {
//       let option = document.createElement('option');
//       option.textContent = this.voices[i].name + ' (' + this.voices[i].lang + ')';
//
//       if(this.voices[i].default) {
//         option.textContent += ' -- DEFAULT';
//       }
//
//       option.setAttribute('data-lang', this.voices[i].lang);
//       option.setAttribute('data-name', this.voices[i].name);
//       document.getElementById("voiceSelect").appendChild(option);
//
//       // if(this.voices[i].name !== 'Google UK English Male') {
//       //   option.setAttribute('data-lang', this.voices[i].lang);
//       //   option.setAttribute('data-name', this.voices[i].name);
//       //   document.getElementById("voiceSelect").appendChild(option);
//       // }
//     }
//     // voiceSelect.selectedIndex = selectedIndex;
//   }
//
//   initializeVoicePopulation() {
//     this.populateVoiceList();
//     if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
//       speechSynthesis.onvoiceschanged = this.populateVoiceList;
//     }
//   }
//
//   handleMicIconClick() {
//     this.icon.addEventListener('click', () => {
//       if (this.listening) {
//         this.recognition.stop();
//         return;
//       }
//       this.sound.play();
//       this.dictate();
//     });
//   }
//
//   watchRecognition() {
//     this.recognition.onstart = function() {
//       this.listening = true;
//       console.log('Speech recognition service has started');
//     };
//
//     this.recognition.onend = function() {
//       console.log('Speech recognition service disconnected');
//     };
//   }
//
//   dictate() {
//     console.log('dictating...');
//     this.recognition.start();
//     this.recognition.onresult = (event) => {
//       const speechToText = Array.from(event.results)
//       .map(result => result[0])
//       .map(result => result.transcript)
//       .join('');
//
//       this.paragraph.textContent = speechToText;
//
//       if (event.results[0].isFinal) {
//         this.container.scrollTo(0, this.container.scrollHeight);
//         this.paragraph = document.createElement('p');
//         this.appendParagraph();
//
//         this.handleRequest(speechToText);
//       }
//     };
//     // this.recognition.onend = this.recognition.start
//   }
//
//   setVoice(utterThis) {
//     var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
//     for(var i = 0; i < this.voices.length ; i++) {
//       if(this.voices[i].name === selectedOption) {
//         utterThis.voice = this.voices[i];
//       }
//     }
//   }
//
//   speak(action) {
//     var utterThis = new SpeechSynthesisUtterance(action());
//     utterThis.pitch = this.pitch.value;
//     utterThis.rate = this.rate.value;
//     this.setVoice(utterThis);
//     this.synth.speak(utterThis);
//   }
//
//   handleRequest(speech) {
//     if (speech === 'commands') {
//       this.speak(this.commands);
//     }
//
//     if (speech === 'command') {
//       this.speak(this.commands);
//     }
//
//     if (speech === 'Rinoa') {
//       this.speak(this.hello);
//     }
//
//     if (speech === 'hi') {
//       this.speak(this.hello);
//     }
//
//     if (speech === 'hello') {
//       this.speak(this.hello);
//     }
//
//     if (speech === 'what\'s up') {
//       this.speak(this.hello);
//     }
//
//     if (speech.includes('what is the time')) {
//       this.speak(this.getTime);
//     }
//
//     if (speech.includes('what time is it')) {
//       this.speak(this.getTime);
//     }
//
//     if (speech.includes('what is today\'s date')) {
//       this.speak(this.getDate);
//     }
//
//     if (speech.includes('today\'s date')) {
//       this.speak(this.getDate);
//     }
//
//     if (speech === 'weather') {
//       this.speak(this.getWeatherQuestion);
//     }
//
//     if (speech === 'what is the weather') {
//       this.speak(this.getWeatherQuestion0);
//     }
//
//     if (speech.startsWith('weather in')) {
//       this.getWeather(speech);
//     }
//
//     if (speech.includes('what is the weather in')) {
//       this.getWeather0(speech);
//     }
//
//     if (speech.includes('what is your name')) {
//       this.speak(this.getMyName);
//     }
//
//     if (speech.includes('what are you called')) {
//       this.speak(this.getMyName);
//     }
//
//     if (speech.includes('who are you')) {
//       this.speak(this.getMyName0);
//     }
//
//     if (speech.includes('what are you')) {
//       this.speak(this.getMyName0);
//     }
//
//     // if (speech.includes('exit live connect')) {
//     //   this.speak(this.close0);
//     //   this.close = true;
//     //   return;
//     // }
//     //
//     // if (speech.includes('exit life connect')) {
//     //   this.speak(this.close0);
//     //   this.close = true;
//     //   return;
//     // }
//
//     if (speech.includes('open a website')) {
//       const utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
//       this.setVoice(utterThis);
//       this.synth.speak(utterThis);
//       this.recognition.abort();
//       this.recognition.stop();
//       this.question = true;
//       return;
//     }
//
//     if (speech.includes('open the website')) {
//       const utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
//       this.setVoice(utterThis);
//       this.synth.speak(utterThis);
//       this.recognition.abort();
//       this.recognition.stop();
//       this.question = true;
//       return;
//     }
//
//      // || 'open the website'|| 'open their website' || 'open my website'
//
//     if (speech.includes('open a webpage')) {
//       const utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
//       this.setVoice(utterThis);
//       this.synth.speak(utterThis);
//       this.recognition.abort();
//       this.recognition.stop();
//       this.question = true;
//       return;
//     }
//
//     if (speech.includes('open the webpage')) {
//       const utterThis = new SpeechSynthesisUtterance('what URL do you want to open?');
//       this.setVoice(utterThis);
//       this.synth.speak(utterThis);
//       this.recognition.abort();
//       this.recognition.stop();
//       this.question = true;
//       return;
//     }
//
//      // || 'open the webpage'|| 'open their webpage' || 'open my webpage'
//
//     if (speech.includes('open') && this.question) {
//       // this.openUrl(speech.split(' ')[1]);
//
//       // var speech0 = speech.split(' ');
//       // var speech1 = speech0.slice(1);
//       // var speech2 = speech1.split('');
//       // console.log(speech2);
//
//       var speech0 = speech.split('').slice(5);
//       var speech1 = speech0.join('');
//       var speech2 = speech1.split(' ');
//       var speech3 = speech2.join('');
//       console.log(speech3);
//       this.openUrl(speech3);
//
//       // var speechReduce = function (speech0) {
//       //   var speech1 = '';
//       //   var speech2 = '';
//       //   for (var char in speech0) {
//       //     speech2.concat(char);
//       //   }
//       //   console.log(speech2);
//       //   this.openUrl(speech2);
//       // }
//
//       // this.openUrl(speech2);
//
//       this.question = false;
//     // } else {
//     //   this.speak(this.hello);
//     };
//
//     // if (speech.includes('yes') && this.close) {
//     //   window.close();
//     //   alert('hello');
//     // };
//   }
//
//   // close0() {
//   //   return `Are you sure?`;
//   // }
//
//   hello() {
//     return `Hi. How can I help you? For a list of commands say, commands.`
//   }
//
//   commands() {
//     return `I can tell you the weather, the time, or even open a website for you. To exit, say, exit live connect.`
//     // return `I can tell you the weather, the time, or even open a website for you. To exit, say, exit live connect.`
//   }
//
//   getTime() {
//     const time = new Date(Date.now());
//     return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
//   }
//
//   getMyName0() {
//     return `I am a speech recognition algorithm, and my name is Rinoa`;
//   }
//
//   getMyName() {
//     return `my name is Rinoa`;
//   }
//
//   getDate() {
//     const time = new Date(Date.now())
//     return `today is ${time.toLocaleDateString()}`;
//   }
//
//   getWeatherQuestion() {
//     return `If you want the weather, please specify from what city`;
//   }
//
//   getWeatherQuestion0() {
//     return `Please specify from what city`;
//   }
//
//   getWeather(speech) {
//     self = this;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[2]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`
//     if ('caches' in window) {
//       /*
//        * Check if the service worker has already cached this city's weather
//        * data. If the service worker has the data, then display the cached
//        * data while the app fetches the latest data.
//        */
//       caches.match(url).then(function(response) {
//         if (response) {
//           self.cachedWeather = true;
//           response.json().then(function updateFromCache(json) {
//             if (json.cod === '404') {
//               const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[2]}`);
//               self.setVoice(utterThis);
//               self.synth.speak(utterThis);
//               return;
//             }
//             const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${json.name} is mostly full of
//             ${json.weather[0].description} at a temperature of ${json.main.temp} degrees Celcius`);
//             self.setVoice(utterThis);
//             self.synth.speak(utterThis);
//           });
//         }
//       });
//     }
//     fetch(url)
//     .then(function(response){
//       return response.json();
//     }).then(function(weather){
//       if (self.cachedWeather) {
//         return;
//       }
//       if (weather.cod === '404') {
//         const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[2]}`);
//         self.setVoice(utterThis);
//         self.synth.speak(utterThis);
//         return;
//       }
//       const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
//       ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
//       self.setVoice(utterThis);
//       self.synth.speak(utterThis);
//     });
//   }
//
//   getWeather0(speech) {
//     self = this;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`
//     if ('caches' in window) {
//       /*
//        * Check if the service worker has already cached this city's weather
//        * data. If the service worker has the data, then display the cached
//        * data while the app fetches the latest data.
//        */
//       caches.match(url).then(function(response) {
//         if (response) {
//           self.cachedWeather = true;
//           response.json().then(function updateFromCache(json) {
//             if (json.cod === '404') {
//               const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
//               self.setVoice(utterThis);
//               self.synth.speak(utterThis);
//               return;
//             }
//             const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${json.name} is mostly full of
//             ${json.weather[0].description} at a temperature of ${json.main.temp} degrees Celcius`);
//             self.setVoice(utterThis);
//             self.synth.speak(utterThis);
//           });
//         }
//       });
//     }
//     fetch(url)
//     .then(function(response){
//       return response.json();
//     }).then(function(weather){
//       if (self.cachedWeather) {
//         return;
//       }
//       if (weather.cod === '404') {
//         const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
//         self.setVoice(utterThis);
//         self.synth.speak(utterThis);
//         return;
//       }
//       const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
//       ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
//       self.setVoice(utterThis);
//       self.synth.speak(utterThis);
//     });
//   }
//
//   openUrl(url) {
//     window.open(`http://${url}`,'_newtab');
//   }
// }
//
// const speechRec = new App();
//
// // add service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//            .register('./service-worker.js')
//            .then(function() { console.log('Service Worker Registered'); });
// }
