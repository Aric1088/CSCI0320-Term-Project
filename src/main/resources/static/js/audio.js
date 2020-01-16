// for debugging and testing:
const moonriseurlString = "https://cdn.glitch.com/62b455b4-3dc2-400f-a508-670755162e18%2Fmoonrisekingdom.mp3?1555777344905";
const lilpeep = "https://cdn.glitch.com/62b455b4-3dc2-400f-a508-670755162e18%2Flilkennedy.mp3?1555795358042";
const teenagedream = "https://cdn.glitch.com/62b455b4-3dc2-400f-a508-670755162e18%2Fteenage_dream.m4a?1555809010358";
const vienna = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fvienna.mp3?1556681480865";
const chill = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fchill.mp3?1556681777061";
const skrillex = "https://cdn.glitch.com/f3fd3c98-333c-4658-8ec6-8b77068f2a2b%2Fskrillex.mp3?1556681999751";
var playing = false;
var bufferLoader = null;

//setup audiocontext
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
analyser.fftSize = 32;
var bufferLength = analyser.frequencyBinCount;
let AFRAME = window.AFRAME;

//BUTTONS, TOGGLE SETTINGS
const playButton = document.getElementById('poster-button');
const sofa = document.getElementById('sofa');
const freqSettingsButton = document.getElementById('freq-settings');
var settingsVisible = false;


var shadows = false;
const shadowCircle = document.getElementById('circle-shadow');
const rValButton = document.getElementById('R-val');
const gValButton = document.getElementById('G-val');
const bValButton = document.getElementById('B-val');
const transparencyValButton = document.getElementById('transparency-val');
var rCurr = 0;
var gCurr = 1;
var bCurr = 2;
var transparencyBool = true;
const rgbOptions = ['#low-freq', '#med-freq', '#high-freq'];
const buttons = [rValButton, gValButton, bValButton, transparencyValButton, document.getElementById('R'), document.getElementById('G'), document.getElementById('B')];

let ballCloudOn = true;
let ballCloudSmall = true;
let roomColorOn = false;
var count = 0;

var hitCount = 1;
var timeChangeCount = 1;

const painting = document.getElementById('painting');
var paintingNormal = true;
//const paintingNormal = document.getElementById('painting-img');
//const painting-abnormal = document.getElementById('painting-img-inv');

painting.addEventListener('click', function(){
    paintingNormal = !paintingNormal;
    togglePainting();
});

freqSettingsButton.addEventListener('click', function () {
    if (settingsVisible) {
        settingsVisible = false;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("visible", false);
        }
    } else {
        settingsVisible = true;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("visible", true);
        }
    }
});


rValButton.addEventListener('click', function () {
    if (settingsVisible) {
        if (rCurr === 2) {
            rCurr = 0;
        } else {
            rCurr += 1;
        }
        rValButton.setAttribute("src", rgbOptions[rCurr]);
    }
});

gValButton.addEventListener('click', function () {
    if (settingsVisible) {
        if (gCurr === 2) {
            gCurr = 0;
        } else {
            gCurr += 1;
        }
        gValButton.setAttribute("src", rgbOptions[gCurr]);
    }
});

bValButton.addEventListener('click', function () {
    if (settingsVisible) {
        if (bCurr === 2) {
            bCurr = 0;
        } else {
            bCurr += 1;
        }
        bValButton.setAttribute("src", rgbOptions[bCurr]);
    }
});

transparencyValButton.addEventListener('click', function () {
    if (settingsVisible) {
        if (transparencyBool) {
            transparencyBool = false;
            transparencyValButton.setAttribute("src", '#transparency-off');
        } else {
            transparencyBool = true;
            transparencyValButton.setAttribute("src", '#transparency-on');
        }
    }
});

var cat = document.getElementById('cat');
var animationCount = 0;
var animationArray = ["property: position; to: -2 0 -4; dur: 5000; easing: linear; autoplay: true",
    "property: rotation; to: 90 270 0; loop: false; dur: 500; easing: linear; autoplay: true",
    "property: position; to: 2 0 -4; dur: 5000; easing: linear; autoplay: true",
    "property: rotation; to: 90 90 0; loop: false; dur: 500; easing: linear; autoplay: true"];

cat.addEventListener('animationcomplete', function () {
    if (animationCount === 3) {
        animationCount = 0;
    } else {
        animationCount += 1;
    }
    cat.setAttribute("animation", animationArray[animationCount]);
});

//AB/NORMAL SETTINGS HERE *********
var normalButton = document.getElementById("normalsettings");
var normal = true;
const rightwall = document.getElementById('rightwall');
var CANVAS_WIDTH = 3779;
var CANVAS_HEIGHT = 3779; 
normalButton.addEventListener('click', function () {
    console.log("normal clicked");
    if (normal) {
        normal = false;
        paintingNormal = false;
        ballCloudSmall = false;
        roomColorOn = true;
        cat.setAttribute("scale", "0.3 0.3 0.3");
        rightwall.setAttribute("material", "shader: html; target: #htmlElement; fps: 4");
        normalButton.setAttribute('material', 'src: #normal; opacity: 0.9');
//        CANVAS_WIDTH = 28346;
//        CANVAS_HEIGHT = 18897; 

        //ADD STUFF HERE
    } else {
        normal = true;
        paintingNormal = true;
        ballCloudSmall = true;
        roomColorOn = false;
        document.getElementById('ceilingLight').setAttribute('animation__color', '');
        document.getElementById('ceilingLight').setAttribute('light', 'color: #ffffff');
        cat.setAttribute("scale", "0.1 0.1 0.1");
        rightwall.setAttribute("material", "color: #d2ace2");
        normalButton.setAttribute('material', 'src: #abnormal; opacity: 0.9');
//        CANVAS_WIDTH = 3779;
//        CANVAS_HEIGHT = 3779; 

        //ADD STUFF HERE
    }
    togglePainting();

});

document.getElementById('cylinder').setAttribute('onclick', 'toggleBallCloudSize()');

//ON LOAD
//for debugging and testing only
$(window).on("load", function () {

//     playButton.addEventListener('click', function () {
//         if (playing) {
//             // source1.stop(audioContext.currentTime + 0.5);
//             playing = false;
//         } else {
//             play();
//             analyser = getAnalyser();
//             playing = true;
//             // source1.connect(analyser);
//             playButton.setAttribute("visible", "false");

//             dataOut();
//             hit();
//             timeChange();
//             //add more functions here;
//         }
//     });



    //for debugging and testing
//   bufferLoader = new BufferLoader(
//   audioContext,
//   [skrillex], //could add multiple audio sources in this array
//   finishedLoading
//   );
//
//   bufferLoader.load();  

});

//for debugging and testing only
var source1;
function finishedLoading(bufferList) {
    console.log("Ready to start playing music");
    source1 = audioContext.createBufferSource();
    source1.buffer = bufferList[0];
    source1.connect(audioContext.destination);
}

AFRAME.registerComponent('update-html', {
    init: function (){
      
        playButton.addEventListener('click', function () {
        if (playing) {
            source1.stop(audioContext.currentTime + 0.5);
            playing = false;
        } else {

         play();
          analyser = getAnalyser();

          playing = true;
          
          //for testing

//            source1.start(0);        
//            source1.connect(analyser);
            playButton.setAttribute("visible", "false");

            dataOut();  
            timeChange();
        }
    });     
    }
  });


var freqDataArray = new Uint8Array(bufferLength);

//FREQUENCY 
function dataOut() {
    requestAnimationFrame(dataOut); //ensures running continuously  
    analyser.getByteFrequencyData(freqDataArray );


    //data in array is 0-255, 16-length array of frequency data
    //averaging freq data for low, med, high values
    let low_freq = Math.floor((freqDataArray[0] + freqDataArray[1] + freqDataArray[2] + freqDataArray[3]) / 4); //bass (first couple values)
    let med_freq = Math.floor((freqDataArray[4] + freqDataArray[5] + freqDataArray[6] + freqDataArray[7]) / 4);
    let high_freq = Math.floor((freqDataArray[8] + freqDataArray[9] + freqDataArray[10] + freqDataArray[11]) / 4); //high freq
    let freq_vals = [low_freq, med_freq, high_freq];

    var R = freq_vals[rCurr];
    var G = freq_vals[gCurr];
    var B = freq_vals[bCurr];
    var A = (Math.floor((255 - (freqDataArray[8] + freqDataArray[9] + freqDataArray[10] + freqDataArray[11]) / 4))) / 255;  //alpha value
    var sofacolor = rgb2hex(R, G, B);
    if (transparencyBool) {
        sofa.setAttribute('material', 'color: ' + sofacolor + '; opacity: ' + A + '; transparent: true');
    } else {
        sofa.setAttribute('material', 'color: ' + sofacolor + '; opacity: 1; transparent: false');
    }

    if (shadows) {
        let bassRadius = (low_freq / 255 * 1.5);
        shadowCircle.setAttribute('radius', bassRadius);
    }

    //ANIMATION
    var walkdur = 3000 ^ (A * 10);
    var turndur = A * 100;
    animationArray = ["property: position; to: -2 0 -4; dur:" + walkdur + "; easing: linear; autoplay: true",
        "property: rotation; to: 90 270 0; loop: false; dur: " + turndur + ";; easing: linear; autoplay: true",
        "property: position; to: 2 0 -4; dur: " + walkdur + "; easing: linear; autoplay: true",
        "property: rotation; to: 90 90 0; loop: false; dur: " + turndur + ";; easing: linear; autoplay: true"];
  

  //HIT FUNCTION
  hitCount--;
    var sum = 0;
    for (var i = 0; i < bufferLength; i++) {
        sum = sum + freqDataArray[i];
    }
    var avg = sum / bufferLength;
    var sum2 = 0;
    for (var i = 0; i < bufferLength / 2; i++) {
        sum2 = sum2 + freqDataArray[i];
    }
    var halfavg = sum2 / (bufferLength / 2);

    var range = Math.abs(freqDataArray[bufferLength - 1] - freqDataArray[0]);


    fireFlicker(freqDataArray);

    if (hitCount == 0) {

        hitCount = 50;
        changeSky(avg);
        if (roomColorOn) {
            changeRoomColor(avg);
        }
    }

  //emits balls    
   // if (avg > 150 && ballCloudOn) {
        ballCloud(avg);
  //  }
}

function fireFlicker(dataArray) {
    var R = Math.floor((dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4);
    var A = (Math.floor((255 - (dataArray[8] + dataArray[9] + dataArray[10] + dataArray[11]) / 4))) / 255;
    var size = R / 300 * 2;
    //document.getElementById('fire').setAttribute('width', size);
    document.getElementById('fire').setAttribute('height', size);
    document.getElementById('fire').setAttribute('opacity', A);
}

//changes sky color based on avg frequency, moon sets, and casts longer shadows
function changeSky(avg) {
    var sky;
    var pos;
    var lightFrom;
    var lightTo;
    if (avg <= 70) {
        sky = '#eaf3ff';
        pos = '0 1.990 -5.1';
        lightFrom = '-2 4 -2';
        lightTo = '-1 3 -2';
    }
    if (70 < avg && avg <= 80) {
        sky = '#c6deff';
        pos = '0.414 1.742 -5.1';
        lightFrom = '-1 3 -2';
        lightTo = '-1.5 2.5 -2';
    }
    if (80 < avg && avg <= 90) {
        sky = '#89bbff';
        pos = '0.69 1.42 -5.1';
        lightFrom = '-1.5 2.5 -2';
        lightTo = '-1 2 -2';
    }
    if (90 < avg && avg <= 110) {
        sky = '#4493ff';
        pos = '0.92 1.1 -5.1';
        lightFrom = '-1 2 -2';
        lightTo = '-0.5 1.8 -2';
    }
    if (110 < avg && avg <= 130) {
        sky = '#0265ed';
        pos = '1.19 0.64 -5.1';
        lightFrom = '-0.5 1.8 -2';
        lightTo = '0 1.5 -2';
    }
    if (130 < avg && avg <= 150) {
        sky = '#003784';
        pos = '1.27 0.3 -5.1';
        lightFrom = '0 1.5 -2';
        lightTo = '0.5 1.3 -2';
    }
    if (150 < avg) {
        sky = '#000d21';
        pos = '1.34 0 -5.1';
        lightFrom = '0.5 1.3 -2';
        lightTo = '0.6 1.2 -2';
    }

    var skyString = 'property: color; to: ' + sky + '; dur: 500; easing: linear';
    var moonString = 'property: position; to: ' + pos + '; dur: 1000';
    var lightString = 'property: position; to: ' + lightTo + '; dur: 1000; easing: linear';

    document.getElementById('sky').setAttribute('animation', skyString);
    document.getElementById('moon').setAttribute('animation', moonString);
    document.getElementById('ceilingLight').setAttribute('animation', lightString);
}

//changes room color based on avg frequency
function changeRoomColor(avg) {
    console.log("in change room color");
    var color = '#ba75ff';
    if (avg <= 70) {
        color = '#edceff';
    }
    if (70 < avg && avg <= 80) {
        color = '#668cff';
    }
    if (80 < avg && avg <= 90) {
        color = '#66ffd8';
    }
    if (90 < avg && avg <= 110) {
        color = '#5dff51';
    }
    if (110 < avg && avg <= 130) {
        color = '#fff94f';
    }
    if (130 < avg && avg <= 150) {
        color = '#ff9442';
    }
    if (150 < avg) {
        color = '#ff0000';
    }

    //animate ceiling light colour to fade to new colour
    var colorString = 'property: light.color; to: ' + color + '; dur: 1000; easing: linear';
    document.getElementById('ceilingLight').setAttribute('animation__color', colorString);
    console.log(document.getElementById('ceilingLight').getAttribute('animation__color'));
}

//returns a random point within a sphere
function getSpherePoint() {
    var d, x, y, z;
    var a = 0;
    var b = 3;
    var c = -2;
    do {
        x = Math.random() * 2.0 - 1.0;
        y = Math.random() * 2.0 - 1.0;
        z = Math.random() * 2.0 - 1.0;
        //d = (x-a)*(x-a)+(y-b)*(y-b)+(z-c)*(z-c);
        d = x * x + y * y + z * z;
    } while (d > 0.01);
    //hacked to make it be where i want
    return {x: x - 4, y: y + 0.8, z: z - 3};
}

function ballCloud(avg) {
    if(avg>150){
    var b = new bobble(avg);
    }
//    if(avg< 150 && avg>75){
//        var v = Math.floor(Math.random() * 2);
//        if(v == 0){
//             var b = new bobble();
//        }else{
//            var b = new bubble();
//        }
//    }
//    else{
//        var v = Math.floor(Math.random() * 10);
//        if(v==0){
//            var b = new bubble();
//        }
//    
//    }
}

class bobble {
    constructor() {
        var sceneEl = document.querySelector('a-scene');
        var entityEl = document.createElement('a-entity');
// Do .setAttribute()`s to initialize the entity.
        sceneEl.appendChild(entityEl);
        entityEl.setAttribute('material', 'color: #ff32c1; opacity: 1');
        
        entityEl.setAttribute('shadow', 'cast: true; receive: true');

        entityEl.setAttribute('class', 'clickable');


        var index = Math.floor(Math.random() * 2);

        // If ballCloudSmall is on, bobbles are just generated in small clouds
        if (ballCloudSmall) {
            entityEl.setAttribute('geometry', {
                primitive: 'sphere',
                radius: 0.01
            });
            // Generate random coordinates for ball
            var X = Math.pow(-1, index) * Math.random() * 0.2;
            var Y = Math.random() * 0.2 + 0.5;
            var Z = -Math.random() * 1;
            var pos = getSpherePoint();
            entityEl.setAttribute('position', pos);
        }
        //else they are generated all over the room
        else {
            entityEl.setAttribute('geometry', {
                primitive: 'sphere',
                radius: 0.1
            });
            var X = Math.pow(-1, index) * Math.random() * 3;
            var Y = Math.random() * 3;
            var Z = -Math.random() * 2;
            entityEl.setAttribute('position', {x: X, y: Y, z: Z});
        }

        //Set ball to fade away
        entityEl.setAttribute('animation', 'property: material.opacity; from: 1; to: 0; dur: 500; easing: linear');
        //When ball has faded away, remove it from the scene
        entityEl.addEventListener('animationcomplete', function () {
            entityEl.parentNode.removeChild(entityEl);
        });
    }
}

class bubble {
    constructor() {
        var sceneEl = document.querySelector('a-scene');
        var entityEl = document.createElement('a-entity');
// Do .setAttribute()`s to initialize the entity.
        sceneEl.appendChild(entityEl);
        entityEl.setAttribute('material', 'color: #42f4ee; opacity: 0.8');
        
        entityEl.setAttribute('shadow', 'cast: true; receive: true');

        entityEl.setAttribute('class', 'clickable');


        var index = Math.floor((Math.random() * 2)+1);
        var index2 = Math.floor((Math.random() * 2)+1);

        // If ballCloudSmall is on, bobbles are just generated in small clouds
        if (ballCloudSmall) {
            entityEl.setAttribute('geometry', {
                primitive: 'box',
                width: 0.005,
                height: 0.02,
                depth: 0.005,
            });
            // Generate random coordinates for ball
            var X = (Math.pow(-1, index) * Math.random() * 0.1) - 4;
            var Y = 0.5;
            var Z = (Math.pow(-1, index2) * Math.random() * 0.1) - 3;
            var pos = {x:X, y: Y, z: Z};
           // var newPos = {x:X, y: Y + 1, z: Z};
            entityEl.setAttribute('position', pos);
            
           entityEl.setAttribute('animation', 'property: position; from: ' + X + ' ' + Y + ' ' + Z + '; to: ' + X + ' ' + 1 + ' ' + Z + '; dur: 5000; easing: linear');
        }
        //else they are generated all over the room
        else {
            entityEl.setAttribute('geometry', {
                primitive: 'box',
                width: 0.02,
                height: 0.2,
                depth: 0.02,
            });
            var X = Math.pow(-1, index) * Math.random() * 3;
            var Y = 0;
            var Z = (Math.pow(-1, index2) * Math.random() *3) - 1;
            var pos = {x:X, y: Y, z: Z};
            //var newPos = {x:X, y: Y + 3, z: Z};
            entityEl.setAttribute('position', {x: X, y: Y, z: Z});
            
           entityEl.setAttribute('animation', 'property: position; from: ' + X + ' ' + Y + ' ' + Z + '; to: ' + X + ' ' + 4 + ' ' + Z + '; dur: 8000; easing: linear');
        }

        
        //When ball has faded away, remove it from the scene
        entityEl.addEventListener('animationcomplete', function () {
            entityEl.parentNode.removeChild(entityEl);
        });
    }
}

function togglePainting(){
    if(paintingNormal){
        painting.setAttribute('material', 'src: #painting-img');
    }else{
         painting.setAttribute('material', 'src: #painting-img-inv');
    }
}

function toggleBallCloud() {
    ballCloudOn = !ballCloudOn;
}

function toggleBallCloudSize() {
    ballCloudSmall = !ballCloudSmall;
}

let canvas = $('#htmlElement')[0];
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let canvasCtx = canvas.getContext("2d");
var sliceWidth = CANVAS_WIDTH / bufferLength;

//TIME DOMAIN DATA
var dataArray = new Uint8Array(bufferLength);
function timeChange() {
    timeChangeCount--;
    requestAnimationFrame(timeChange); //ensures running continuously
    analyser.getByteTimeDomainData(dataArray);
    var sum = 0;
    for (var i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    var avg = sum / dataArray.length;
    var range = dataArray[dataArray.length - 1] - dataArray[0];
    
  
  //CANVAS OSCILLOSCOPE
  canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvasCtx.fillStyle = '#000000';
  canvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvasCtx.lineWidth = 40;
  canvasCtx.strokeStyle = "#fffcfc";
  canvasCtx.beginPath();
  var x = 0;
  for(var i = 0; i < bufferLength; i++) {
    
    var v = dataArray[i] / 128.0;
    var y = v * CANVAS_HEIGHT/2;
    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }
      x += sliceWidth;
     
  }
  canvasCtx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);
  canvasCtx.stroke();
}





//converts r g b to hex color values
function rgb2hex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    // let alphahex = transparencyMap.get(alpha);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}


function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}


//BUFFER LOADER DEFINED BELOW

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}