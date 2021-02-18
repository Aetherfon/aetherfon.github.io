// States
let status = 'start';

let video;
let posenet;
let modelLoaded = false;
let poses;
let handPos = {
  R: {
    x : 0,
    y : 0
  },
  L: {
    x : 0,
    y : 0
  },
};
let pastHandPos = [];

// Logo, Menü, Text
let logo;
let logoWidth;
let logoHeight;
let logoBig;
let logoBigWidth;
let logoBigHeight;
let headlineTextSize = 77;
let buttonTextSize = 40;
let textTextSize = 32;
let fadeTransparency = 255;
// Intro-Video
let preloadIntroVideo;
let introVideo;
// Images
let imgMouse;
let imgParty;
let imgSpeaker;
let imgTheramin;
// Scrolling
let wheel = 0;
let startLine = 0;
let infoTextWords = [
  "Erzeuge ",  "unbekannte ",  "sphärische ",  "Klänge ",  "und ",  "tauche ",  "ein ",  "in ",  "eine ",
  "neue ",  "Form ",  "der ",  "experimentellen ",  "Musikerzeugung ",  "– ",  "alles ",
  "gesteuert ",  "durch ",  "die ", "bloße ", "Bewegung ", "deiner ", "Hände. ", 
  "Aetherfon ", "(abgeleitet ", "von ", "dem ", "elektronischen ", "Musikinstrument ", "Theremin) ", 
  "ist ", "ein ", "auf ", "künstlicher ", "Intelligenz ", "basierendes ", "Experiment, ", 
  "entstanden ", "im ", "Rahmen ", "des ", "multidisziplinären ", "Kurses ", "AIXDESIGN ", 
  "an ", "der ", "HAW Hamburg. ", "\n", "\n", 
  "Ziel ", "des ", "Experiments ", "ist ", "es ", "die ", "User:innen ", 
  "spielerisch ", "an ", "die ", "Themen ", "Musik ", "und ", "Technik ", "– ", "speziell ", 
  "künstliche ", "Intelligenz ", "– ", "zu ", "führen ", "und ", "Ihnen ", "Raum ", "zur ", 
  "künstlerischen ", "Entfaltung ", "in ", "Zeiten ", "von ", "Corona ", "zu ", "geben. ", 
  "Mit ", "Hilfe ", "von ", "PoseNet, ", "einem ", "Machine ", "Learning ", "Model, ", 
  "das ", "Schätzung ", "der ", "menschlichen ", "Körperhaltung ", "in ", "Echtzeit ", 
  "ermöglicht, ", "können ", "die ", "Handbewegungen ", "der ", "User:innen ", "über ", 
  "die ", "Webcam ", "verfolgt ", "werden. ", "\n", "\n", 
  "Durch ", "diese ", "Motion ", "Capture ", "sind ", "sie ", "in ", "der ", "Lage ", "die ", 
  "Geschwindigkeit, ", "Lautstärke, ", "Audioqualität ", "und ", "Frequenz ", "mehrerer ", 
  "Sounds, ", "durch ", "die ", "bloße ",   "Bewegung ", "ihrer ", "Hände ", "einzeln ", 
  "zu ", "verändern ", "und ", "so Musik ", "zu ", "erzeugen. ", "Zeitgleich ", "wird ", 
  "die ", "erschaffene ", "Musik ", "mittels ", "p5.js, ", "einer ", "JavaScript-", "Bibliothek, ", 
  "grafisch ", "visualisiert ", "und ", "animiert ", "und ", "gibt ", "den ", "User:innen ", 
  "zusätzlich ", "ein ", "visuelles ", "Feedback ", "zu ", "ihrem ", "musikalischen ", "Spiel. ", "\n", "\n", 
  "Das ", "Team ", "hinter ", "Aetherfon ", "besteht ", "aus ", "den ", "Studierenden ",  "\n", "\n",
  "Tobias Braun ", "(B.A. Media Systems), ", "\n",
  "Charleen König ", "(B.A. Kommunikationsdesign), ",  "\n",
  "Hannah Pohlmann ", "(M.A. Kommunikationsdesign) und ",  "\n",
  "Moniek Wiese ", "(M.A. Kommunikationsdesign)."
];
let lines = [[]];
let imprintTextWords = [
  "Impressum", "\n",
  "Informationspflicht ", "laut ", "§ 5 TMG.", "\n", "\n",
  "Tobias Braun ", "\n",
  "Charleen König ", "\n",
  "Hannah Pohlmann ", "\n",
  "Moniek Wiese ", "\n", "\n",
  "E-mail:",  "\n", 
  "aetherfon@gmail.com", "\n", "\n", 
  "Quelle: ", "Erstellt ", "mit ", "dem ", "Impressum ", "Generator ", "von ", "AdSimple ", "in ", "Kooperation ", "mit ", "123familie.de", "\n", "\n", 
  "Design ", "und ", "Umsetzung", "\n",
  "Tobias Braun", "\n", 
  "Charleen König", "\n", 
  "Hannah Pohlmann", "\n", 
  "Moniek Wiese", "\n", "\n",
  "Das ", "Projekt ", "Aetherfon ", "ist ", "im ", "Kurs ", "Aix.Design ", "entstanden, ", 
  "unter ", "der ", "Leitung ", "von ", "Prof. ", "Peter ", "Kabel ", 
  "Hochschule ", "für ", "Angewandte ", "Wissenschaften ", "Hamburg ", "(HAW)",
  "Finkenau ", "35", "\n",
  "22081 ", "Hamburg", "\n",
  "Deutschland", "\n", "\n",
"EU-Streitschlichtung", "\n",
"Gemäß ", "Verordnung ", "über ", "Online-Streitbeilegung ", "in ", "Verbraucherangelegenheiten ", "(ODR-Verordnung) ", "möchten ", "wir ", "Sie ", "über ", "die ", "Online-Streitbeilegungsplattform ", "(OS-Plattform) ", "informieren. ", "\n",
"Verbraucher ", "haben ", "die ", "Möglichkeit, ", "Beschwerden ", "an ", "die ", "Online ", "Streitbeilegungsplattform ", "der ", "Europäischen ", "Kommission ", "unter ", "http://ec.europa.eu/odr?tid=321260393 ", "zu ", "richten. ", "Die ", "dafür ", "notwendigen ", "Kontaktdaten ", "finden ", "Sie ", "oberhalb ", "in ", "unserem ", "Impressum. ", "\n",
"Wir ", "möchten ", "Sie ", "jedoch ", "darauf ", "hinweisen, ", "dass ", "wir ", "nicht ", "bereit ", "oder ", "verpflichtet ", "sind, ", "an ", "Streitbeilegungsverfahren ", "vor ", "einer ", "Verbraucherschlichtungsstelle ", "teilzunehmen. ", "\n",
"Haftung ", "für ", "Inhalte ", "dieser ", "Website ", "\n",
"Wir ", "entwickeln ", "die ", "Inhalte ", "dieser ", "Webseite ", "ständig ", "weiter ", "und ", "bemühen ", "uns ", "korrekte ", "und ", "aktuelle ", "Informationen ", "bereitzustellen. ", "Laut ", "Telemediengesetz ", "(TMG) ", "§7 ", "(1) ", "sind ", "wir ", "als ", "Diensteanbieter ", "für ", "eigene ", "Informationen, ", "die ", "wir ", "zur ", "Nutzung ", "bereitstellen, ", "nach ", "den ", "allgemeinen ", "Gesetzen ", "verantwortlich. ", "Leider ", "können ", "wir ", "keine ", "Haftung ", "für ", "die ", "Korrektheit ", "aller ", "Inhalte ", "auf ", "dieser ", "Webseite ", "übernehmen, ", "speziell ", "für ", "jene ", "die ", "seitens ", "Dritter ", "bereitgestellt ", "wurden. ", "Als ", "Diensteanbieter ", "im ", "Sinne ", "der ", "§§ ", "8 ", "bis ", "10 ", "sind ", "wir ", "nicht ", "verpflichtet, ", "die ", "von ", "ihnen ", "übermittelten ", "oder ", "gespeicherten ", "Informationen ", "zu ", "überwachen ", "oder ", "nach ", "Umständen ", "zu ", "forschen, ", "die ", "auf ", "eine ", "rechtswidrige ", "Tätigkeit ", "hinweisen. ", "\n",
"Unsere ", "Verpflichtungen ", "zur ", "Entfernung ", "von ", "Informationen ", "oder ", "zur ", "Sperrung ", "der ", "Nutzung ", "von ", "Informationen ", "nach ", "den ", "allgemeinen ", "Gesetzen ", "aufgrund ", "von ", "gerichtlichen ", "oder ", "behördlichen ", "Anordnungen ", "bleiben ", "auch ", "im ", "Falle ", "unserer ", "Nichtverantwortlichkeit ", "nach ", "den ", "§§ ", "8 ", "bis ", "10 ", "unberührt. ", "\n",
"Sollten ", "Ihnen ", "problematische ", "oder ", "rechtswidrige ", "Inhalte ", "auffallen, ", "bitte ", "wir ", "Sie ", "uns ", "umgehend ", "zu ", "kontaktieren, ", "damit ", "wir ", "die ", "rechtswidrigen ", "Inhalte ", "entfernen ", "können. ", "Sie ", "finden ", "die ", "Kontaktdaten ", "im ", "Impressum. ", "\n",
"Haftung ", "für ", "Links ", "auf ", "dieser ", "Website ", "\n",
"Unsere ", "Webseite ", "enthält ", "Links ", "zu ", "anderen ", "Webseiten ", "für ", "deren ", "Inhalt ", "wir ", "nicht ", "verantwortlich ", "sind. ", "Haftung ", "für ", "verlinkte ", "Websites ", "besteht ", "für ", "uns ", "nicht, ", "da ", "wir ", "keine ", "Kenntnis ", "rechtswidriger ", "Tätigkeiten ", "hatten ", "und ", "haben, ", "uns ", "solche ", "Rechtswidrigkeiten ", "auch ", "bisher ", "nicht ", "aufgefallen ", "sind ", "und ", "wir ", "Links ", "sofort ", "entfernen ", "würden, ", "wenn ", "uns ", "Rechtswidrigkeiten ", "bekannt ", "werden. ", "\n",
"Wenn ", "Ihnen ", "rechtswidrige ", "Links ", "auf ", "unserer ", "Website ", "auffallen, ", "bitte ", "wir ", "Sie ", "uns ", "zu ", "kontaktieren. ", "Sie ", "finden ", "die ", "Kontaktdaten ", "im ", "Impressum. ", "\n",
"Urheberrechtshinweis ", "\n",
"Alle ", "Inhalte ", "dieser ", "Webseite ", "(Bilder, ", "Fotos, ", "Texte, ", "Videos) ", "unterliegen ", "dem ", "Urheberrecht ", "der ", "Bundesrepublik ", "Deutschland. ", "Bitte ", "fragen ", "Sie ", "uns ", "bevor ", "Sie ", "die ", "Inhalte ", "dieser ", "Website ", "verbreiten, ", "vervielfältigen ", "oder ", "verwerten ", "wie ", "zum ", "Beispiel ", "auf ", "anderen ", "Websites ", "erneut ", "veröffentlichen. ", "Falls ", "notwendig, ", "werden ", "wir ", "die ", "unerlaubte ", "Nutzung ", "von ", "Teilen ", "der ", "Inhalte ", "unserer ", "Seite ", "rechtlich ", "verfolgen. ", "\n",
"Sollten ", "Sie ", "auf ", "dieser ", "Webseite ", "Inhalte ", "finden, ", "die ", "das ", "Urheberrecht ", "verletzen, ", "bitten ", "wir ", "Sie ", "uns ", "zu ", "kontaktieren. ", "\n",
"Bildernachweis ", "\n",
"Die ", "Bilder, ", "Fotos ", "und ", "Grafiken ", "auf ", "dieser ", "Webseite ", "sind ", "urheberrechtlich ", "geschützt. ", "\n",
"Die ", "Bilderrechte ", "liegen ", "bei ", "den ", "folgenden ", "Fotografen ", "und ", "Unternehmen: ", "\n",
"•"
];
let imprintLines = [[]];
let leftEdge;
let mouseClickable = false;

// Visualisierung
let history = 2;
let videoWidth = window.innerWidth;
let videoHeight = window.innerHeight;
let ranges = {};
// Bottom Speed-Slider
let sliderPosition = videoWidth / 2;
// Visualizations
let visualsPositions = [[], [], [], []];
let visualsRadius = 100;
// Hands
let imgR, imgL;
// FakeVisu
let startTimeJS2 = Date.now()
let startTimeJS = [Date.now(), Date.now(), Date.now()];
let fakeNoiseCounter = [0, 0, 0];
let fakeNoiseColor = [0, 2, 2];
let fakeNoisePos = [2250, 2250, 2250];
let fakeNoiseMovement = [1000, 1000, 1000];
let fakeNoiseColorchange = [0, 1, 1];

// Audio
let context;
let source;
let sphere;
let sphere1;
let sphere2;
let sphere3;
let sphereIsPlaying = false;
var sphereFilter;
let biquadFilters = [];
let audioBuffers = [];
let buffersLoaded = false;

// Time
let menuTimeIn = 0;
let menuTimeout = 0;
let deltaTimeJS = 0;
let lastTimeJS = 0;
let timeDelayJS = 0;
let pauseTime = -1;
let deltaTime = 0;
let timeDelay = 2;
let currentTime = 0;
let endTime = 5 // 50; // 120; // sec
let loopTimes = [0, 0, 0, 0]
let isPlaying = [false, false, false, false];
// Tempo
let tempo = 90; // BPM (beats per minutes)
let eightNoteTime = (60 / tempo) / 2;
let takt = 1;

function createAudioContext(theme) {

  context = new AudioContext();

  sphere = new Audio(theme + "/sphere.wav");
  // switch (theme) {
  //   case 'theme1':
  //     sphere = sphere1;
  //     break;
  //   case 'theme2':
  //     sphere = sphere2;
  //     break;
  //   case 'theme3':
  //     sphere = sphere3;
  //     break;
  // }
  sphere.loop = true;
  source = context.createMediaElementSource(sphere);
  sphereFilter = context.createBiquadFilter();

  source.connect(sphereFilter)
  sphereFilter.connect(context.destination);

  biquadFilters = [];
  audioBuffers = [];
  for (let i = 0; i < 3; i++) getAudioData(i, theme);

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, () => {
    modelLoaded = true;
  });
  posenet.on('pose', getPoses);
}
function defineSizes() {

  // Menü
  logoHeight = window.innerHeight / 32 < 20 ? 20 : window.innerHeight / 32;
  logoWidth = logoHeight / 33 * 219;

  logoBigWidth = window.innerWidth/4*3 -50 > 4117/2 ? 4117/2 : window.innerWidth/4*2 -50;
  logoBigHeight = window.innerWidth/4*3 > 4117/2 ? 622/2 : (window.innerWidth/4*2 -20 ) / 6.5;

  headlineTextSize = window.innerHeight / 14 < 40 ? 40 : window.innerHeight / 14;
  buttonTextSize = window.innerHeight / 27 < 20 ? 20 : window.innerHeight / 27;
  textTextSize = window.innerHeight / 33.75 < 15.5 ? 15.5 : window.innerHeight / 33.75;

  // Canvas
  videoWidth = window.innerWidth;
  videoHeight = window.innerHeight;;

  // Info-Text in Zeilen einteilen
  let textLines = [[]];
  let lineIndex = 0;

  textFont(fontHeader);
  textSize(buttonTextSize);
  leftEdge = videoWidth / 5 * 2 > 97 + textTextSize*2 + textWidth("UBERAETHERFON") + textTextSize/2*3 ? videoWidth / 5 * 3 : videoWidth - (97 + textTextSize*2 + textWidth("UBERAETHERFON") + textTextSize*2);
  let lineLen = leftEdge - window.innerWidth / 9;

  textFont('freight-neo-pro');
  textSize(textTextSize);
  for (let wordIndex in infoTextWords){

    if (textWidth(textLines[lineIndex]) < lineLen) {

      textLines[lineIndex].push(infoTextWords[wordIndex]);

      if (infoTextWords[wordIndex] == "\n") {
        textLines.push([""]);
        lineIndex++
      }

      if (textWidth(textLines[lineIndex]) > lineLen) {
                
        textLines[lineIndex].pop();
        textLines.push([infoTextWords[wordIndex]]);
        lineIndex++
      }
    }
  }
  lines = [[]];
  for (line in textLines) {
    let string = "";
    for (word in textLines[line]) {
      string += textLines[line][word]
    }
    lines[line] = string;
  }

  // Impressums-Text in Zeilen einteilen
  textLines = [[]];
  lineIndex = 0;
  for (let wordIndex in imprintTextWords){

    if (textWidth(textLines[lineIndex]) < lineLen) {

      textLines[lineIndex].push(imprintTextWords[wordIndex]);

      if (imprintTextWords[wordIndex] == "\n") {
        textLines.push([""]);
        lineIndex++
      }

      if (textWidth(textLines[lineIndex]) > lineLen) {
                
        textLines[lineIndex].pop();
        textLines.push([imprintTextWords[wordIndex]]);
        lineIndex++
      }
    }
  }
  imprintLines = [[]];
  for (line in textLines) {
    let string = "";
    for (word in textLines[line]) {
      string += textLines[line][word]
    }
    imprintLines[line] = string;
  }
}

function preload() {
  // Logo laden
  logo = loadImage('assets/logo/weiss_Aetherfon_Logo_RZ_klein.png');
  // logoBig = loadImage('assets/logo/weiss_Aetherfon_Logo_RZ.png');
  logoBig = logo;
  
  // Images laden
  imgMouse = loadImage('assets/images/mouse.jpg');
  imgParty = loadImage('assets/images/party.jpg');
  imgSpeaker = loadImage('assets/images/speaker.jpg');
  imgTheramin = loadImage('assets/images/theramin.jpg');

  // Font laden
  fontHeader = loadFont('assets/fonts/BHVSerif-Display.otf');
  
  // Handvisuals laden
  imgR = loadImage('assets/icons/R2.png');
  imgL = loadImage('assets/icons/L2.png');

  // Sphären laden
  sphere1 = new Audio("theme1/sphere.wav");
  sphere2 = new Audio("theme2/sphere.wav");
  sphere3 = new Audio("theme3/sphere.wav");

  // Video laden
  preloadIntroVideo = createVideo('assets/intro.mp4');
  preloadIntroVideo.hide();
}
function setup() {
  
  background(0);

  createCanvas(window.innerWidth, window.innerHeight);
  
  // Intro-Video laden
  introVideo = preloadIntroVideo;
  introVideo.hide()


  ranges = {
    x: {
      low: 0,
      high: videoWidth
    },
    y: {
      low: 0,
      high: videoHeight
    },
    x1: {
      low: 0,
      high: videoWidth / 4,
      width: videoWidth / 4
    },
    y1: {
      low: videoWidth / 8 * 1,
      high: videoHeight / 8 * 6,
      height: videoHeight / 8 * 5,
    },
    x2: {
      low: videoWidth / 4,
      high: videoWidth / 4 * 3,
      width: videoWidth / 2,
    },
    y2: {
      low: 0,
      high: videoWidth / 3,
      height: videoWidth / 3,
    },
    x3: {
      low: videoWidth / 4 * 3,
      high: videoWidth / 4 * 4,
      width: videoWidth / 4,
    },
    y3: {
      low: videoWidth / 8 * 1,
      high: videoHeight / 8 * 6,
      height: videoHeight / 8 * 5,
    }
  };

  defineSizes();
}
function draw() {

  if (videoWidth != window.innerWidth || videoHeight != window.innerHeight) defineSizes();
  resizeCanvas(videoWidth, videoHeight);

  translate(videoWidth, 0)
  background(0);

  // Delta-Time für Fade-In und -Out
  if (lastTimeJS != 0) deltaTimeJS = Date.now() - lastTimeJS;
  lastTimeJS = Date.now();
  
  // console.log(status);

  switch (status) {
    case 'start':
      startPage();
      break;
    case 'startOut':
      startOut();
      break;
    case 'intro':
      introPage();
      break;
    case 'themeSelection':
      themeSelectionPage();
      break;
    case 'themeSelectionOut':
      themeSelectionOut();
      break;
    case 'loading':
      loadingPage();
      break;
    case 'loadingOut':
      loadingOut();
      break;
    case 'game':
      gamePage();
      break;
    case 'gameEnded':
      gameEndedPage();
      break;
    case 'menu':
      menu();
      break;
    case 'menuOut':
      menuOut();
      break;
    case 'menuToThemeSel':
      menuToThemeSel();
      break;
    case 'infoPage':
      infoPage();
      break;
    case 'infoToGame':
      infoToGame();
      break;
    case 'infoToThemeSel':
      infoToThemeSel();
      break;
    case 'imprint':
      imprint();
      break;
  }

  // wenn das Menu eingeblendet ist, Menu nach einer Weile ausblenden
  if (status == 'menu') {
    menuTimeout += deltaTimeJS;
    if (menuTimeout > 1500) {
      noCursor();
      status = 'menuOut';
    }
  }

  if (mouseClickable) {
    noCursor();
    tint(255);
    image(imgR, mouseX-videoWidth-10, mouseY-10, 36, 50);
  } //else cursor();
}

// Pages
function startPage() {

  cursor();

  // Hintergrund-Animation
  fakeVisualsNoisy(fakeNoiseCounter, fakeNoiseColor, fakeNoisePos);
  fakeNoiseCounter[0] += Date.now() - startTimeJS[0]
  fakeNoiseCounter[1] += Date.now() - startTimeJS[1]
  fakeNoiseCounter[2] += Date.now() - startTimeJS[2]
  if (fakeNoiseCounter[0] > 20000) {
    fakeNoiseCounter[0] = 0;
    startTimeJS[0] = Date.now()
  // }
  // if (fakeNoiseCounter[1] > 20000) {
    fakeNoiseCounter[1] = 0;
    startTimeJS[1] = Date.now()
    
    fakeNoisePos[1] += fakeNoiseMovement[1];
    if (fakeNoisePos[1] > 5000) fakeNoiseMovement[1] *= -1;
    else if (fakeNoisePos[1] < 500) fakeNoiseMovement[1] *= -1;
    
    fakeNoiseColor[1] += fakeNoiseColorchange[1];
    if (fakeNoiseColor[1] > 10) fakeNoiseColorchange[1] *= -1;
    else if (fakeNoiseColor[1] < 1) fakeNoiseColorchange[1] *= -1;
  }
  if (fakeNoiseCounter[2] > 5000) {
    fakeNoiseCounter[2] = 0;
    startTimeJS[2] = Date.now()
    
    fakeNoisePos[2] += fakeNoiseMovement[2];
    if (fakeNoisePos[2] > 5000) fakeNoiseMovement[2] *= -1;
    else if (fakeNoisePos[2] < 500) fakeNoiseMovement[2] *= -1;
    
    fakeNoiseColor[2] += fakeNoiseColorchange[2];
    if (fakeNoiseColor[2] > 10) fakeNoiseColorchange[2] *= -1;
    else if (fakeNoiseColor[2] < 1) fakeNoiseColorchange[2] *= -1;
  }

  // Logo
  tint(255)
  image(logo, 
    -videoWidth/2 - logoBigWidth/2, 
    // videoHeight / 3 * 1 - logoBigHeight + headlineTextSize, 
    videoHeight / 2 - logoBigHeight / 4 * 3, 
    logoBigWidth, logoBigHeight);

  // Hinweis-Text
  let string = "ENTER";
  textFont('freight-neo-pro');
  textSize(buttonTextSize);
  textAlign(CENTER);
  fill(255);
  text(string, -videoWidth / 2, videoHeight / 3 * 2  - buttonTextSize);
}
function startOut() {

  cursor();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.5;

    // Logo
    tint(255, fadeTransparency)
    image(logo, 
      -videoWidth/2 - logoBigWidth/2, 
      // videoHeight / 3 * 1 - logoBigHeight + headlineTextSize, 
      videoHeight / 2 - logoBigHeight / 4 * 3, 
      logoBigWidth, logoBigHeight);

    // Hinweis-Text
    let string = "ENTER";
    textFont('freight-neo-pro');
    textSize(buttonTextSize);
    textAlign(CENTER);
    fill(255, fadeTransparency);
    text(string, -videoWidth / 2, videoHeight / 3 * 2  - buttonTextSize);
  }
  else {
    fadeTransparency = 0;
    status = 'intro';
  } 
}
function introPage() {
  
  cursor();

  // Fade In
  if (fadeTransparency < 255) fadeTransparency += deltaTimeJS * 0.5;
  else fadeTransparency = 255;

  // Intro-Video
  image(introVideo, -videoWidth, videoHeight/2 - videoWidth * 0.5625 / 2, videoWidth, videoWidth * 0.5625);

  // if (introVideo.time() < introVideo.duration()) {
  if (introVideo.time() < 2) {
    introVideo.play();
  } else {
    introVideo.pause();

    timeDelayJS += deltaTimeJS;
    if (timeDelayJS >= 1500) {
      status = 'themeSelection';
      fadeTransparency = 0;
      timeDelayJS = 0;
    }
  }

  // Logo
  tint(255, fadeTransparency)
  // image(logo, -videoWidth+79, 85, logoWidth, logoHeight);
}
function themeSelectionPage() {

  cursor();

  // Fade In
  if (fadeTransparency < 255) fadeTransparency += deltaTimeJS * 0.5;
  else fadeTransparency = 255;

  // Logo
  tint(255)
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);
    
  // Headline
  let string = "WÄHLE EINE SOUNDWELT";
  textFont(fontHeader);
  textSize(headlineTextSize);
  textAlign(CENTER);
  fill(255, fadeTransparency);
  text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);

  // Auswahl
  string = "SPHÄRISCH"
  textFont('freight-neo-pro');
  textSize(buttonTextSize);
  fill(255, fadeTransparency);
  text(string, - videoWidth / 2 - buttonTextSize*10, videoHeight / 3 * 2 - buttonTextSize);
  string = "EXPERIMENTELL"
  fill(255, map(fadeTransparency, 0, 255, 0, 115));
  text(string, - videoWidth / 2, videoHeight / 3 * 2 - buttonTextSize);
  string = "MEDITATIV"
  text(string, - videoWidth / 2 + buttonTextSize*10, videoHeight / 3 * 2 - buttonTextSize);
}
function themeSelectionOut() {

  noCursor();

  // Logo
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.5;

    // Headline
    let string = "WÄHLE EINE SOUNDWELT";
    textFont(fontHeader);
    textSize(headlineTextSize);
    textAlign(CENTER);
    fill(255, fadeTransparency);
    text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);

    // Auswahl
    string = "SPHÄRISCH"
    textFont('freight-neo-pro');
    textSize(buttonTextSize);
    fill(255, fadeTransparency);
    text(string, - videoWidth / 2 - buttonTextSize*10, videoHeight / 3 * 2 - buttonTextSize);
    string = "EXPERIMENTELL"
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    text(string, - videoWidth / 2, videoHeight / 3 * 2 - buttonTextSize);
    string = "MEDITATIV"
    text(string, - videoWidth / 2 + buttonTextSize*10, videoHeight / 3 * 2 - buttonTextSize);
    }
  else {
    fadeTransparency = 0;
    status = 'loading';
  }
}
function loadingPage() {

  noCursor();

  // Fade In
  if (fadeTransparency < 255) fadeTransparency += deltaTimeJS * 0.5;
  else if (modelLoaded && buffersLoaded) {
    fadeTransparency = 255;
    status = 'loadingOut';
  }
  else fadeTransparency = 255;

  // Logo
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Hinweis-Text
  let string = "POSENET WIRD GELADEN";
  textFont(fontHeader);
  textSize(headlineTextSize);
  textAlign(CENTER);
  fill(255, fadeTransparency);
  text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);
}
function loadingOut() {

  noCursor();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.5;

    // Logo
    tint(255, fadeTransparency)
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    // Hinweis-Text
    let string = "POSENET WIRD GELADEN";
    textFont(fontHeader);
    textSize(headlineTextSize);
    textAlign(CENTER);
    fill(255, fadeTransparency);
    text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);
  }
  else {
    fadeTransparency = 0;
    status = 'game';
  }
}
function gamePage() {  

  noCursor();
  scale(-1, 1)

  // Hand-Positionen erkennen
  // image(video, 0, 0, videoWidth, videoHeight);
  let currentHandRX = 0, currentHandRY = 0;
  let currentHandLX = 0, currentHandLY = 0;
  if (poses) {
    // Zur Rausch-Minimierung mit vergangenen Positionen verrechnen
    pastHandPos.forEach( function(element) {
      currentHandRX = (map(poses.rightWrist.x, 0, video.width, 0, innerWidth, true) + element.R.x) / 2;
      currentHandRY = (map(poses.rightWrist.y, 0, video.height, 0, innerHeight, true) + element.R.y) / 2
      currentHandLX = (map(poses.leftWrist.x, 0, video.width, 0, innerWidth, true) + element.L.x) / 2
      currentHandLY = (map(poses.leftWrist.y, 0, video.height, 0, innerHeight, true) + element.L.y) / 2
    });
  }
  // letzte Hand-Position hinzufügen / überflüssige Elemente löschen
  pastHandPos.push({
    R: {
      x : handPos.R.x,
      y : handPos.R.y
    },
    L: {
      x : handPos.L.x,
      y : handPos.L.y
    },
  });
  if (pastHandPos.length > 3) pastHandPos.shift();
  // neue Hand-Position setzen
  handPos = {
    R: {
      x : currentHandRX,
      y : currentHandRY
    },
    L: {
      x : currentHandLX,
      y : currentHandLY
    },
  }

  // Zeiten 
  deltaTime = context.currentTime - currentTime;
  currentTime = context.currentTime;
  
  // Spiel anzeigen bis Zeit vorbei ist
  if (currentTime < endTime) {

    // Top Area
    topArea();

    // Bottom Speed-Slider
    bottomSpeedSlider();

    // Play Beat
    loopTimes[0] += deltaTime;
    if (loopTimes[0] > (takt * 8 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
      loopTimes[0] = 0;
      playBeat(0, 2500, 0);
    }

    // Visualizations
    visualsNoisy(visualsPositions, tempo);
    visualizationBody();
  } 
  // Wenn Zeit vorbei ist Variablen zurücksetzen uns Status ändern
  else if (currentTime > endTime + timeDelay) {
    console.log(visualsPositions);
    visualsPositions = [[], [], [], []];
    loopTimes[0] = 0;
    currentTime = 0;
    sphereIsPlaying = false;
    sphere.pause()
    status = 'gameEnded';
  }
}
function gameEndedPage() {

  cursor();

  // Fade In
  if (fadeTransparency < 255) fadeTransparency += deltaTimeJS * 0.5;
  else fadeTransparency = 255;

  // Logo
  tint(255, fadeTransparency);
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Hintergrundbild
  tint(255, fadeTransparency);
  image(imgParty, -videoHeight * 0.577, 0, videoHeight * 0.66, videoHeight);
    
  // Headline
  let string = "GEIL GEMACHT!";
  textFont(fontHeader);
  textSize(headlineTextSize);
  textAlign(CENTER);
  fill(255, fadeTransparency);
  text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);

  // Text
  textFont('freight-neo-pro');
  textSize(textTextSize);
  string = "Wir hoffen, es hat Spaß gemacht! Zeig es gerne deinen Freunden!";
  text(string, - videoWidth / 2, videoHeight / 2);

  // Auswahl
  textSize(buttonTextSize);
  string = "NOCHMAL";
  text(string, - videoWidth / 2 - buttonTextSize*5.66, videoHeight / 3 * 2 - buttonTextSize);
  string = "ÜBER AETHERFON";
  text(string, - videoWidth / 2 + buttonTextSize*4.33, videoHeight / 3 * 2 - buttonTextSize);

  // Impressum & Datenschutz
  string = "Datenschutz - Impressum";
  textFont('freight-neo-pro');
  textAlign(LEFT);
  textSize(textTextSize / 2);
  text(string, -videoWidth + 79, videoHeight -75);
}
function gameEndedOut() {

  cursor();

  // Logo
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // FadeOut
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.5;

    // Hintergrundbild
    tint(255, fadeTransparency);
    image(imgParty, -videoHeight * 0.66, 0, videoHeight * 0.66, videoHeight);

    // Headline
    let string = "GEIL GEMACHT!";
    textFont(fontHeader);
    textSize(headlineTextSize);
    textAlign(CENTER);
    fill(255, fadeTransparency, 0, 255, 0, 51);
    text(string, -videoWidth / 2, videoHeight / 3 * 1 + headlineTextSize);

    // Text
    textFont('freight-neo-pro');
    textSize(textTextSize);
    string = "Wir hoffen, es hat Spaß gemacht! Zeig es gerne deinen Freunden!";
    text(string, - videoWidth / 2, videoHeight / 2);

    // Auswahl
    textSize(buttonTextSize);
    string = "NOCHMAL";
    text(string, - videoWidth / 2 - buttonTextSize*5.66, videoHeight / 3 * 2 - buttonTextSize);
    string = "ÜBER AETHERFON";
    text(string, - videoWidth / 2 + buttonTextSize*4.33, videoHeight / 3 * 2 - buttonTextSize);

    // Impressum & Datenschutz
    string = "Datenschutz - Impressum";
    textFont('freight-neo-pro');
    textSize(textTextSize / 2);
    text(string, -videoWidth + 79, videoHeight -75);
  }
  else fadeTransparency = 0;
}
function menu(){

  cursor();

  visualsPaused();

  // Fade In
  if (fadeTransparency < 255) fadeTransparency += deltaTimeJS * 0.5;
  else fadeTransparency = 255;

  // Logo
  tint(255, fadeTransparency);
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Buttons
  let string = "FORTSETZEN";
  textFont(fontHeader);
  textSize(buttonTextSize);
  textAlign(LEFT);
  fill(255, map(fadeTransparency, 0, 255, 0, 115));
  rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);
  
  string = "NEU STARTEN";
  rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);
  
  string = "ÜBER AETHERFON";
  rect(-videoWidth + 79, videoHeight / 7 * 5 - textTextSize/ 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);
  
  string = "Datenschutz - Impressum";
  textFont('freight-neo-pro');
  textSize(textTextSize/2);
  fill(255);
  text(string, -videoWidth + 79, videoHeight -75);
}
function menuOut(){

  noCursor();

  visualsPaused();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.25;

    // Logo
    tint(255, fadeTransparency);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    // Hinweis-Text
    let string = "FORTSETZEN";
    textFont(fontHeader);
    textSize(buttonTextSize);
    textAlign(LEFT);
    fill(255, fadeTransparency);
    rect(-videoWidth + 79 + textTextSize/2*3, videoHeight / 7 * 3 - textTextSize/5*6, 1, textTextSize/2*3);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);
    
    string = "NEU STARTEN";
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);
    
    string = "ÜBER AETHERFON";
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 5 - textTextSize/ 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);
    
    string = "Datenschutz - Impressum";
    textFont('freight-neo-pro');
    textSize(textTextSize/2);
    fill(255, fadeTransparency);
    text(string, -videoWidth + 79, videoHeight -75);
  }
  else {
    fadeTransparency = 0;
    status = 'game';
  }
}
function menuToThemeSel(){

  cursor();

  visualsPaused();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.25;

    // Logo
    tint(255);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    // Hinweis-Text
    let string = "FORTSETZEN";
    textFont(fontHeader);
    textSize(buttonTextSize);
    textAlign(LEFT);
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);
    
    string = "NEU STARTEN";
    fill(255, fadeTransparency);
    rect(-videoWidth + 79 + textTextSize/2*3, videoHeight / 7 * 4 - textTextSize/5*6, 1, textTextSize/2*3);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);
    
    string = "ÜBER AETHERFON";
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 5 - textTextSize/ 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);
    
    string = "Datenschutz - Impressum";
    textFont('freight-neo-pro');
    textSize(textTextSize/2);
    fill(255, fadeTransparency);
    text(string, -videoWidth + 79, videoHeight -75);
  }
  else {
    // Logo
    tint(255);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    fadeTransparency = 0;
    status = 'themeSelection';
  }
}
function infoPage(){

  cursor();

  // Logo
  tint(255);
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Hintergrundbild
  tint(255);
  image(imgTheramin, -videoHeight * 0.577, 0, videoHeight * 0.577, videoHeight);

  // Buttons
  let string = "FORTSETZEN";
  textFont(fontHeader);
  textSize(buttonTextSize);
  textAlign(LEFT);
  fill(255, 115);
  rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);

  string = "NEU STARTEN";
  fill(255, 115);
  rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);

  string = "ÜBER AETHERFON";
  fill(255);
  rect(-videoWidth + 79 + textTextSize/2*3, videoHeight / 7 * 5 - textTextSize/5*6, 1, textTextSize/2*3);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);

  string = "Datenschutz - Impressum";
  textFont('freight-neo-pro');
  textSize(textTextSize / 2);
  fill(255);
  text(string, -videoWidth + 79, videoHeight -75);

  // Info-Text
  textFont('freight-neo-pro');
  textSize(textTextSize);
  fill(255);
  startLine = wheel;  
  for (let x = 0; x < 15; x ++) {
    text(lines[x + startLine], -leftEdge, videoHeight*0.22+textTextSize  + textTextSize/3*4*x);
  }

  // Textlaufleiste
  noStroke();
  let textScrollY = ((videoHeight - (videoHeight * 0.68)) / (lines.length - 14)) * startLine;
  rect(-videoWidth / 9, videoHeight * 0.22 + textScrollY, 5, videoHeight * 0.3, 2.5);
}
function infoToGame(){

  noCursor();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.25;
  
    // Logo
    tint(255, fadeTransparency);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    // Hintergrundbild
    tint(255, fadeTransparency);
    image(imgTheramin, -videoHeight * 0.577, 0, videoHeight * 0.577, videoHeight);

    // Buttons
    let string = "FORTSETZEN";
    textFont(fontHeader);
    textSize(buttonTextSize);
    textAlign(LEFT);
    fill(255, fadeTransparency);
    rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);

    string = "NEU STARTEN";
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);

    string = "ÜBER AETHERFON";
    fill(map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79 + textTextSize/2*3, videoHeight / 7 * 5 - textTextSize/5*6, 1, textTextSize/2*3);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);

    string = "Datenschutz - Impressum";
    textFont('freight-neo-pro');
    textSize(textTextSize / 2);
    fill(255, fadeTransparency);
    text(string, -videoWidth + 79, videoHeight -75);

    // Info-Text  
    textFont('freight-neo-pro');
    textSize(textTextSize);
    fill(255, fadeTransparency);
    startLine = wheel;  
    for (let x = 0; x < 15; x ++) {
      text(lines[x + startLine], -videoWidth / 5 * 3, videoHeight*0.22+textTextSize  + textTextSize/3*4*x);
    }
    // Textlaufleiste
    noStroke();
    rect(-videoWidth / 9, videoHeight * 0.22 + startLine * textTextSize/5*3, 5, videoHeight * 0.3, 2.5);
  }
  else {
    fadeTransparency = 0;
    status = 'game';
  }
}
function infoToThemeSel(){

  cursor();

  // Fade Out
  if (fadeTransparency > 0) {
    fadeTransparency -= deltaTimeJS * 0.25;
  
    // Logo
    tint(255);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

    // Hintergrundbild
    tint(255, fadeTransparency);
    image(imgTheramin, -videoHeight * 0.577, 0, videoHeight * 0.577, videoHeight);

    // Buttons
    let string = "FORTSETZEN";
    textFont(fontHeader);
    textSize(buttonTextSize);
    textAlign(LEFT);
    fill(255, map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);
    
    string = "NEU STARTEN";
    fill(255, fadeTransparency);
    rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);

    string = "ÜBER AETHERFON";
    fill(map(fadeTransparency, 0, 255, 0, 115));
    rect(-videoWidth + 79 + textTextSize/2*3, videoHeight / 7 * 5 - textTextSize/5*6, 1, textTextSize/2*3);
    text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);

    string = "Datenschutz - Impressum";
    textFont('freight-neo-pro');
    textSize(textTextSize / 2);
    fill(255, fadeTransparency);
    text(string, -videoWidth + 79, videoHeight -75);

    // Info-Text  
    textFont('freight-neo-pro');
    textSize(textTextSize);
    fill(255, fadeTransparency);
    startLine = wheel;  
    for (let x = 0; x < 15; x ++) {
      text(lines[x + startLine], -videoWidth / 5 * 3, videoHeight*0.22+textTextSize  + textTextSize/3*4*x);
    }
    // Textlaufleiste
    noStroke();
    rect(-videoWidth / 9, videoHeight * 0.22 + startLine * textTextSize/5*3, 5, videoHeight * 0.3, 2.5);
  }
  else {
    // Logo
    tint(255);
    image(logo, -videoWidth+79, 85, logoWidth, logoHeight);
  
    fadeTransparency = 0;
    status = 'themeSelection';
  }
}
function imprint(){

  cursor();

  // Logo
  tint(255);
  image(logo, -videoWidth+79, 85, logoWidth, logoHeight);

  // Hintergrundbild
  tint(255, 51);
  image(imgTheramin, -videoHeight * 0.577, 0, videoHeight * 0.577, videoHeight);

  // Buttons
  let string = "FORTSETZEN";
  textFont(fontHeader);
  textSize(buttonTextSize);
  textAlign(LEFT);
  fill(255, 115);
  rect(-videoWidth + 79, videoHeight / 7 * 3 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 3);

  string = "NEU STARTEN";
  fill(255, 115);
  rect(-videoWidth + 79, videoHeight / 7 * 4 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 4);

  string = "ÜBER AETHERFON";
  fill(255, 115);
  rect(-videoWidth + 79, videoHeight / 7 * 5 - textTextSize / 2, textTextSize/2*3, 1);
  text(string, -videoWidth + 97 + textTextSize*2, videoHeight / 7 * 5);

  string = "Datenschutz - Impressum";
  textFont('freight-neo-pro');
  textSize(textTextSize / 2);
  fill(255);
  text(string, -videoWidth + 79, videoHeight -75);

  // Info-Text
  textFont('freight-neo-pro');
  textSize(textTextSize);
  fill(255);
  startLine = wheel;  
  for (let x = 0; x < 15; x ++) {
    text(imprintLines[x + startLine], -leftEdge, videoHeight*0.22+textTextSize  + textTextSize/3*4*x);
  }

  // Textlaufleiste
  noStroke();
  let textScrollY = ((videoHeight - (videoHeight * 0.68)) / (imprintLines.length - 14)) * startLine;
  rect(-videoWidth / 9, videoHeight * 0.22 + textScrollY, 5, videoHeight * 0.3, 2.5);
}

// Page Interaction Mouse
function mousePressed() {  
  switch (status) {
    case 'start':
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize / 4 * 7 &&
        mouseY < videoHeight / 3 * 2 - buttonTextSize &&
        mouseX > videoWidth / 2 - textWidth("ENTER") / 2 && 
        mouseX < videoWidth / 2 + textWidth("ENTER") / 2
      ) {
        mouseClickable = false;
        visualsPositions = [[], [], [], []];
        status = 'startOut';
      }
      break;
    case 'themeSelection':
      visualsPositions = [[], [], [], []];  
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize * 2 && 
        mouseY < videoHeight / 3 * 2 - buttonTextSize
      ){
        if (mouseX > videoWidth / 2 - buttonTextSize*10 - buttonTextSize * 3 && 
          mouseX < videoWidth / 2 - buttonTextSize*10 + buttonTextSize * 3
        ){
          noCursor();
          mouseClickable = false;
          fadeTransparency = 255;
          status = 'themeSelectionOut';
          visualsPositions = [[], [], [], []];
          loopTimes = [0, 0, 0, 0];
          createAudioContext('theme1');
        } 
      }
      break;
    case 'gameEnded':
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize * 2 && 
        mouseY < videoHeight / 3 * 2 - buttonTextSize
      ) {
        textFont(fontHeader);
        textSize(buttonTextSize);
        if (mouseX > videoWidth / 2 - buttonTextSize*5.66 - textWidth("NOCHMAL") / 2 && 
          mouseX < videoWidth / 2 - buttonTextSize*5.66 + textWidth("NOCHMAL") / 2
        ){
          mouseClickable = false;
          visualsPositions = [[], [], [], []];
          status = 'themeSelection';
        } 
        else if (mouseX > videoWidth / 2 + buttonTextSize*4.33 - textWidth("UBER AETHERFON") / 2 && 
          mouseX < videoWidth / 2 + buttonTextSize*4.33 + textWidth("UBER AETHERFON") / 2
        ){
          mouseClickable = false;
          status = 'infoPage';
        }
      }
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = false;
        status = 'imprint';
      }
      break;
    case 'menu':
      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = false;
        noCursor();
        fadeTransparency = 255;
        status = 'menuOut';
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = false;
        fadeTransparency = 255;
        visualsPositions = [[], [], [], []];
        status = 'menuToThemeSel';
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("ÜBER AETHERFON") &&
        mouseY > videoHeight / 7 * 5 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 5
      ){
        mouseClickable = false;
        status = 'infoPage';
      }
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = false;
        status = 'imprint';
      }
      break;
    case 'infoPage':
      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = false;
        noCursor();
        status = 'infoToGame';
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = false;
        visualsPositions = [[], [], [], []];
        status = 'infoToThemeSel';
      }
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = false;
        status = 'imprint';
      }
      break;
    case 'imprint':
      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = false;
        noCursor();
        fadeTransparency = 255;
        status = 'menuOut';
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = false;
        fadeTransparency = 255;
        visualsPositions = [[], [], [], []];
        status = 'menuToThemeSel';
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("ÜBER AETHERFON") &&
        mouseY > videoHeight / 7 * 5 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 5
      ){
        mouseClickable = false;
        status = 'infoPage';
      }
      break;
  }
}
function mouseMoved() {
  switch (status) {
    case 'start':
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize / 4 * 7 &&
        mouseY < videoHeight / 3 * 2 - buttonTextSize &&
        mouseX > videoWidth / 2 - textWidth("ENTER") / 2 && 
        mouseX < videoWidth / 2 + textWidth("ENTER") / 2
      ){
        mouseClickable = true;
      } else mouseClickable = false;
      break;
    case 'themeSelection':
      visualsPositions = [[], [], [], []];  
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize * 2 && 
        mouseY < videoHeight / 3 * 2 - buttonTextSize
      ){
        if (mouseX > videoWidth / 2 - buttonTextSize*10 - buttonTextSize * 3 && 
          mouseX < videoWidth / 2 - buttonTextSize*10 + buttonTextSize * 3
        ){
          mouseClickable = true;
        } else mouseClickable = false;
      } else mouseClickable = false;
      break;
    case 'game':
      if (timeDelayJS < 500) {
        noCursor();
        timeDelayJS += deltaTimeJS;
      }
      else {
        timeDelayJS = 0;
        menuTimeout = 0;
        pauseTime = context.currentTime;
        sphereIsPlaying = false;
        sphere.pause()
        status = "menu";
      }
      break;
    case 'menu':
      cursor();
      menuTimeout = 0;

      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("ÜBER AETHERFON") &&
        mouseY > videoHeight / 7 * 5 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 5
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = true;
      } 
      else mouseClickable = false;
      break;
    case 'infoPage':
      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = true;
      } 
      else mouseClickable = false;
      break;
    case 'gameEnded':
      if (mouseY > videoHeight / 3 * 2 - buttonTextSize * 2 && 
        mouseY < videoHeight / 3 * 2 - buttonTextSize
      ) {
        textFont(fontHeader);
        textSize(buttonTextSize);
        if (mouseX > videoWidth / 2 - buttonTextSize*5.66 - textWidth("NOCHMAL") / 2 && 
          mouseX < videoWidth / 2 - buttonTextSize*5.66 + textWidth("NOCHMAL") / 2
        ){
          mouseClickable = true;
        } 
        else if (mouseX > videoWidth / 2 + buttonTextSize*4.33 - textWidth("UBER AETHERFON") / 2 && 
          mouseX < videoWidth / 2 + buttonTextSize*4.33 + textWidth("UBER AETHERFON") / 2
        ){
          mouseClickable = true;
        } else mouseClickable = false;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize/2 + textWidth("Placehol") &&
        mouseY > videoHeight -75 - textTextSize && 
        mouseY < videoHeight -75 + textTextSize / 2 
      ){
        mouseClickable = true;
      } 
      else mouseClickable = false;
      break;
    case 'imprint':
      textFont(fontHeader);
      textSize(buttonTextSize);
      if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("FORTSETZEN") &&
        mouseY > videoHeight / 7 * 3 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 3
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("NEU STARTEN") &&
        mouseY > videoHeight / 7 * 4 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 4
      ){
        mouseClickable = true;
      } 
      else if (mouseX > 79 && 
        mouseX < 99 + textTextSize*2 + textWidth("ÜBER AETHERFON") &&
        mouseY > videoHeight / 7 * 5 - buttonTextSize / 4 * 3 && 
        mouseY < videoHeight / 7 * 5
      ){
        mouseClickable = true;
      } 
      else mouseClickable = false;
      break;
  }
}
function mouseWheel(event) {
  let delta;
  switch (status) {
    case 'infoPage':
      delta = navigator.userAgent.indexOf("Chrome") < 0 ? event.delta/3 : event.delta/150;
      wheel = wheel + delta <= 0 ? 0 : wheel + delta > lines.length-14 ? lines.length-14 : wheel + delta;
      break;
    case 'imprint':
      delta = navigator.userAgent.indexOf("Chrome") < 0 ? event.delta/3 : event.delta/150;
      wheel = wheel + delta <= 0 ? 0 : wheel + delta > imprintLines.length-14 ? imprintLines.length-14 : wheel + delta;
      break;
  }
}
/*
*/

// Game Interaction Hands
function topArea() {

  // Rechts
  if (handPos.R.y > ranges.y1.low && handPos.R.y < ranges.y1.high && handPos.R.x > ranges.x1.low && handPos.R.x < ranges.x1.high) {

    // biquadFilters[1].frequency.value = map (handRY, ranges.y.low, ranges.y.high, 5, 20000);
    // biquadFilters[1].detune.value = map (handRX, ranges.x1.low , ranges.x1.high, 0, 45); // Detune
    // biquadFilters[1].Q.value = map (handRX, ranges.x1.low , ranges.x1.high, 0, 50); // Q
    // biquadFilters[1].gain.value =  map (handRX, ranges.x1.low, ranges.x1.high, -100, 100); // Gain // hat keine Auswirkungen
    // gains[1].gain.value = map (handRY, ranges.y.low, ranges.y.high, -50, 0); // Volume

    var random = Math.random();
    var detune = 100;
    var frequency = map(handPos.R.y, ranges.y1.high, ranges.y1.low, 500, 5000);// + random *50 -25;
    var Q = map(handPos.R.x, ranges.x1.low, ranges.x1.high, -40, 40, true);// + random *10 -5;
    var gain = map(handPos.R.x, ranges.x1.low, ranges.x1.high, 1, 0, true);

    if (context.currentTime < endTime) {
      loopTimes[1] += deltaTime;
      if (loopTimes[1] > (takt * 8 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
        loopTimes[1] = 0;
        playSoundRight(detune, frequency, Q, gain);
      }
    }
  } else if (handPos.L.y > ranges.y1.low && handPos.L.y < ranges.y1.high && handPos.L.x > ranges.x1.low && handPos.L.x < ranges.x1.high) {

    // biquadFilters[1].frequency.value = map (handRY, ranges.y.low, ranges.y.high, 5, 20000);
    // biquadFilters[1].detune.value = map (handRX, ranges.x1.low , ranges.x1.high, 0, 45); // Detune
    // biquadFilters[1].Q.value = map (handRX, ranges.x1.low , ranges.x1.high, 0, 50); // Q
    // biquadFilters[1].gain.value =  map (handRX, ranges.x1.low, ranges.x1.high, -100, 100); // Gain // hat keine Auswirkungen
    // gains[1].gain.value = map (handRY, ranges.y.low, ranges.y.high, -50, 0); // Volume

    var random = Math.random();
    var detune = 100;
    var frequency = map(handPos.L.y, ranges.y1.high, ranges.y1.low, 500, 5000);// + random *50 -25;
    var Q = map(handPos.L.x, ranges.x1.low, ranges.x1.high, -40, 40, true);// + random *10 -5;
    var gain = map(handPos.L.x, ranges.x1.low, ranges.x1.high, 1, 0, true);

    if (context.currentTime < endTime) {
      loopTimes[1] += deltaTime;
      if (loopTimes[1] > (takt * 8 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
        loopTimes[1] = 0;
        playSoundRight(detune, frequency, Q, gain);
      }
    }
  }
  // Oben
  if (handPos.R.y > ranges.y2.low && handPos.R.y < ranges.y2.high && handPos.R.x > ranges.x2.low && handPos.R.x < ranges.x2.high) {

    // var random = Math.random();
    // var detune = 100;
    // var frequency = map (handRY, ranges.y2.high, ranges.y2.low, 500, 5000);// + random *50 -25;
    // var Q = map (handRX, ranges.x2.low , ranges.x2.high, 0, 50, true);// + random *10 -5;
    // var gain = map (handRY, ranges.y2.high, ranges.y2.low, 0, 0.5, true);

    // if (context.currentTime > beginTime && context.currentTime < endTime) {
    //   loopTimes[2] += deltaTime;
    //   if(loopTimes[2] > (takt * 1 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
    //     loopTimes[2] = 0;
    //     playSound2(detune, frequency, Q, gain);
    //   }
    // }

    sphereFilter.frequency.value = map(handPos.R.y, ranges.y2.high, ranges.y2.low, 500, 5000);
    sphereFilter.Q.value = map(handPos.R.x, ranges.x2.low, ranges.x2.high, 0, 50, true);
    sphereFilter.gain.value = map(handPos.R.y, ranges.y2.high, ranges.y2.low, 0, 0.5, true);
    // gainNode.gain.value = map (handRY, ranges.y2.high, ranges.y2.low, 0, 1, true);

    if (!sphereIsPlaying) sphere.play();
    sphereIsPlaying = true;

  } else if (handPos.L.y > ranges.y2.low && handPos.L.y < ranges.y2.high && handPos.L.x > ranges.x2.low && handPos.L.x < ranges.x2.high) {

    // var random = Math.random();
    // var detune = 100;
    // var frequency = map (handLY, ranges.y2.high, ranges.y2.low, 500, 5000);// + random *50 -25;
    // var Q = map (handLX, ranges.x2.low , ranges.x2.high, 0, 50, true);// + random *10 -5;
    // var gain = map (handLY, ranges.y2.high, ranges.y2.low, 0, 0.5, true);

    // if (context.currentTime > beginTime && context.currentTime < endTime) {
    //   loopTimes[2] += deltaTime;
    //   if(loopTimes[2] > (takt * 1 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
    //     loopTimes[2] = 0;
    //     playSound2(detune, frequency, Q, gain);
    //   }
    // }

    sphereFilter.frequency.value = map(handPos.L.x, ranges.x2.low, ranges.x2.high, 500, 5000);
    sphereFilter.Q.value = map(handPos.L.x, ranges.x2.low, ranges.x2.high, 0, 50, true);
    sphereFilter.gain.value = map(handPos.L.y, ranges.y2.high, ranges.y2.low, 0, 0.5, true);
    // gainNode.gain.value = map (handRY, ranges.y2.high, ranges.y2.low, 0, 1, true);

    if (!sphereIsPlaying) sphere.play();
    sphereIsPlaying = true;
  } else {
    sphereIsPlaying = false;
    sphere.pause()
  }
  // Links
  if (handPos.R.y > ranges.y3.low && handPos.R.y < ranges.y3.high && handPos.R.x > ranges.x3.low && handPos.R.x < ranges.x3.high) {

    var random = Math.random();
    var detune = 100;
    var frequency = map(handPos.R.y, ranges.y3.high, ranges.y3.low, 500, 5000);// + random *50 -25;
    var Q = map(handPos.R.x, ranges.x3.low, ranges.x3.high, -20, 20, true);// + random *10 -5;
    var gain = map(handPos.R.x, ranges.x3.low, ranges.x3.high, 0, 1, true);

    if (context.currentTime < endTime) {
      loopTimes[3] += deltaTime;
      if (loopTimes[3] > (takt * 2 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
        loopTimes[3] = 0;
        playSoundLeft(detune, frequency, Q, gain);
      }
    }
  } else if (handPos.L.y > ranges.y3.low && handPos.L.y < ranges.y3.high && handPos.L.x > ranges.x3.low && handPos.L.x < ranges.x3.high) {

    var random = Math.random();
    var detune = 100;
    var frequency = map(handPos.L.y, ranges.y3.high, ranges.y3.low, 500, 5000);// + random *50 -25;
    var Q = map(handPos.L.x, ranges.x3.low, ranges.x3.high, -20, 20, true);// + random *5 -2.5;
    var gain = map(handPos.L.x, ranges.x3.low, ranges.x3.high, 0, 1, true);

    if (context.currentTime < endTime) {
      loopTimes[3] += deltaTime;
      if (loopTimes[3] > (takt * 2 * eightNoteTime)) { // takt * 8 * eightNoteTime = 4.266
        loopTimes[3] = 0;
        playSoundLeft(detune, frequency, Q, gain);
      }
    }
  }

  // Visualization Areas
  //visualsAreas()
}
function bottomSpeedSlider() {
  if (handPos.L.y > videoHeight - 150) {
    sliderPosition = handPos.L.x;
    tempo = map(handPos.L.x, 0, videoWidth, 80, 400, true);
    eightNoteTime = (60 / tempo) / 2;
  }

  // Visualization
  noStroke();
  // fill(200, 200, 200);
  // rect(20, videoHeight - 40, videoWidth - 40, 15);
  fill(100);
  ellipse(sliderPosition, videoHeight - 32.5, 30);
}

// Game Visualizations
function chooseColor(color, value) { //value: Wert zw. 0 - 50
  // val = map (value, 0, 50 , 0, 127, false);
  val = value / 100;
  switch (color) {
    case '0':
      fill(255, 255, 255, 127);
      stroke(255, 255, 255);
      break;
    case '1':
      fill(127 + 127 * val * 2, 200 * val, 200 * val, 127);
      stroke(255, 0, 0);
      break;
    case '2':
      fill(200 * val, 127 + 127 * val * 2, 200 * val, 127);
      stroke(0, 255, 0);
      break;
    case '3':
      fill(200 * val, 200 * val, 127 + 127 * val * 2, 127);
      stroke(0, 0, 255);
      break;
  }
}
function visualsSoundsAtHandPos() {
  if (context.currentTime < endTime) var currentTime = context.currentTime;
  else var currentTime = endTime;
  // Beat
  var sound = 0;
  for (visual in visualsPositions[sound]) {
    if (currentTime >= visualsPositions[sound][visual][0]) {
      let alphaVal = map(currentTime - visualsPositions[sound][visual][0], 0, 0.85, 255, 0)
      fill(127, 127, 127, alphaVal);
      noStroke();
      ellipse(videoWidth / 2, videoHeight, visualsRadius * 4);
    }
  }
  // Rot
  sound = 1;
  for (visual in visualsPositions[sound]) {
    let gain = visualsPositions[sound][visual][3];
    var frequencyPos = map(visualsPositions[sound][visual][1], 500, 5000, ranges.y1.high, ranges.y1.low);
    var QPos = map(visualsPositions[sound][visual][2], 0, 50, ranges.x1.low, ranges.x1.high);
    let val = visualsPositions[sound][visual][2] / 100;

    if (currentTime >= visualsPositions[sound][visual][0]) {
      let alphaVal = map(currentTime - visualsPositions[sound][visual][0], 0, 10, 255, 0)
      fill(127 + 127 * val * 2, 200 * val, 200 * val, alphaVal);
      noStroke();
      ellipse(QPos, frequencyPos, visualsRadius * gain);
    }
  }
  // Grün
  sound = 2;
  for (visual in visualsPositions[sound]) {
    let gain = visualsPositions[sound][visual][3];
    var frequencyPos = map(visualsPositions[sound][visual][1], 500, 5000, ranges.y2.high, ranges.y2.low);
    var QPos = map(visualsPositions[sound][visual][2], 0, 50, ranges.x2.low, ranges.x2.high);
    let val = visualsPositions[sound][visual][2] / 100;

    if (currentTime >= visualsPositions[2][visual][0]) {
      let alphaVal = map(currentTime - visualsPositions[sound][visual][0], 0, 10, 255, 0)
      fill(200 * val, 127 + 127 * val * 2, 200 * val, alphaVal);
      noStroke();
      ellipse(QPos, frequencyPos, visualsRadius * gain * 2);
    }
  }
  // Blau
  sound = 3;
  for (visual in visualsPositions[sound]) {
    let gain = visualsPositions[sound][visual][3];
    var frequencyPos = map(visualsPositions[sound][visual][1], 500, 5000, ranges.y3.high, ranges.y3.low);
    var QPos = map(visualsPositions[sound][visual][2], 0, 50, ranges.x3.low, ranges.x3.high);
    let val = visualsPositions[sound][visual][2] / 100;

    if (currentTime >= visualsPositions[3][visual][0]) {
      let alphaVal = map(currentTime - visualsPositions[sound][visual][0], 0, 10, 255, 0)
      fill(200 * val, 200 * val, 127 + 127 * val * 2, alphaVal);
      noStroke();
      ellipse(QPos, frequencyPos, visualsRadius * gain / 3);
    }
  }
}
function visualsSoundsOnBottomLines() {
  if (context.currentTime < endTime) var currentTime = context.currentTime;
  else var currentTime = endTime;
  for (sound in visualsPositions) {
    for (visual in visualsPositions[sound]) {
      if (currentTime >= visualsPositions[sound][visual][0]) {
        chooseColor(sound, visualsPositions[sound][visual][2]);
        noStroke();
        ellipse(
          // Laufleiste
          // map(visualsPositions[sound][visual][0], beginTime, endTime, videoWidth, 0, false),

          // Zeitleiste
          map(visualsPositions[sound][visual][0] - currentTime, endTime, 0, 0, videoWidth * history, false) - videoWidth * 2,

          videoHeight - 100 * (int(sound) + 1) - map(visualsPositions[sound][visual][1], 500, 5000, -20, 20),
          visualsRadius
        );
      }
    }
    chooseColor(sound, 0);
    line(0, videoHeight - 100 * (int(sound) + 1), videoWidth, videoHeight - 100 * (int(sound) + 1));
  }
}
function visualizationBody() {
  tint(255);
  image(imgR, handPos.L.x-36, handPos.L.y-50, 72, 100);
  image(imgL, handPos.R.x-36, handPos.R.y-50, 72, 100);
}
function visualsAreas1() {
  strokeWeight(5);
  var margin = 10;
  for (var i = 1; i < 4; i++) {
    switch (i) {
      case 1:
        fill(255, 0, 0, 0);
        stroke(255, 0, 0, 100);
        rect(ranges.x1.low + margin, ranges.y1.low + margin, ranges.x1.width - margin * 2, ranges.y1.height - margin * 2);
        break;
      case 2:
        fill(0, 255, 0, 0);
        stroke(0, 255, 0, 100);
        rect(ranges.x2.low + margin, ranges.y2.low + margin, ranges.x2.width - margin * 2, ranges.y2.height - margin * 2);
        break;
      case 3:
        fill(0, 0, 255, 0);
        stroke(0, 0, 255, 100);
        rect(ranges.x3.low + margin, ranges.y3.low + margin, ranges.x3.width - margin * 2, ranges.y3.height - margin * 2);
        break;
    }
  }
}
function visualsAreas() {
  strokeWeight(2);
  let margin = 10;
  let cornersR = 20;
  noFill();
  stroke(255, 255, 255, 50);
  for (var i = 1; i < 4; i++) {
    switch (i) {
      case 1:
        rect(
          ranges.x1.low + margin, // X
          ranges.y1.low + margin, // Y
          ranges.x1.width - margin * 2, // w 
          ranges.y1.height - margin * 2, // h
          cornersR // 
        );
        break;
      case 2:
        rect(
          ranges.x2.low + margin, 
          ranges.y2.low + margin, 
          ranges.x2.width - margin * 2, 
          ranges.y2.height - margin * 2,
          cornersR
        );
        break;
      case 3:
        rect(
          ranges.x3.low + margin, 
          ranges.y3.low + margin, 
          ranges.x3.width - margin * 2, 
          ranges.y3.height - margin * 2,
          cornersR
        );
        break;
    }
  }
}
function visualsPaused() {
  scale(-1, 1);

  translate(videoWidth / 2, videoHeight / 2);

  let RESCALE = 2;
  let MAXTRANSPARENCY = 20;   // Maximale Transparenz eines Layers der Visualisierung
  let VISUSIZE = 100 * RESCALE;          // Größe der Visualisierung
  let MOVEAREA = 100 * RESCALE;          // Größe der Visualisierung
  let STEP = 3 * RESCALE;

  // Visuals
  if (visualsPositions[0].length) {
    let noiseMaxBeat = 0;
    let noiseHeightBeat = 0;
    let transparencyBeat = 0;
    let lastSound = visualsPositions[0][visualsPositions[0].length -1][0]; // Spielzeit vom letzten Sound
    let deltaSound = pauseTime - lastSound; // Zeit die seit dem letzten Sound vergangen ist
    if (deltaSound < 2) {
      //radiusBeat = map(deltaSound, 0, 2, 50, 0, true);
      noiseMaxBeat = map(deltaSound, 0, 4, 0.65, 0, true);
      noiseHeightBeat = map(deltaSound, 0, 4, 100, 0, true);
      transparencyBeat = map(deltaSound, 0, 2, MAXTRANSPARENCY, 0, true);
    }
    for (let i = VISUSIZE; i > 0; i -= STEP) {
        noStroke();
        fill(255, 255, 255, transparencyBeat );//- (i/2));
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.01) {
            let xoff = map(cos(a), -1, 1, 0, noiseMaxBeat, true);
            let yoff = map(sin(a), -1, 1, 0, noiseMaxBeat, true);
            let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeightBeat, true) - (i*4);
            let x = r > 0 ? r * cos(a) : 0;
            let y = r > 0 ? r * sin(a) : 0;
            vertex(x, y);
        }
        endShape(CLOSE);
    }
  }

  translate(-videoWidth / 2, -videoHeight / 2);

  scale(-1, 1);
}

// Audio
function getAudioData(i, theme) {

  var request = new XMLHttpRequest();
  request.open('GET', theme + "/sound" + (i + 1) + ".wav", true);
  request.responseType = 'arraybuffer';
  request.onload = function () {
    var undecodedAudio = request.response;

    context.decodeAudioData(undecodedAudio, function (buffer) {
      audioBuffers[i] = buffer;
    });

    buffersLoaded = true;
  };
  request.send();

  biquadFilters[i] = context.createBiquadFilter();
}
function playSounds(buffer, time, i, detune, frequency, Q, gain) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  // if (i != 0) {
  source.connect(biquadFilters[i]);
  biquadFilters[i].connect(context.destination);

  biquadFilters[i].detune.value = detune;
  biquadFilters[i].frequency.value = frequency;
  biquadFilters[i].Q.value = Q;

  // } else source.connect(context.destination);
  source.start(time);

  visualsPositions[i].push([
    time,
    frequency,
    Q,
    gain
  ]);
}
function playBeat(detune, frequency, Q) {
  var bassdrum = audioBuffers[0];
  var time = context.currentTime;
  playSounds(bassdrum, time + 0 * eightNoteTime, 0, detune, frequency, Q, 1);
  // playSounds(bassdrum, time + 2 * eightNoteTime, 0, detune, frequency, Q, 1);
  // playSounds(bassdrum, time + 4 * eightNoteTime, 0, detune, frequency, Q, 1);
}
function playSoundRight(detune, frequency, Q, gain) {
  var sound = audioBuffers[1];
  var time = context.currentTime;
  playSounds(sound, time + 0 * eightNoteTime, 1, detune, frequency, Q, gain);
}
function playSoundLeft(detune, frequency, Q, gain) {
  var sound = audioBuffers[2];
  var time = context.currentTime;
  playSounds(sound, time + 0 * eightNoteTime, 2, detune, frequency, Q, gain);
  // playSounds(sound, time + 2 * eightNoteTime, 2, detune, frequency, Q, gain);
  // playSounds(sound, time + 4 * eightNoteTime, 2, detune, frequency, Q, gain);
  // playSounds(sound, time + 6 * eightNoteTime, 2, detune, frequency, Q, gain);
}
/* function playSound(i) {
   var sound = audioBuffers[i];
   var time = context.currentTime;
   playSounds(sound, time + 0 * eightNoteTime, i);
 }*/

// Posemodel
function getPoses(results) {
  if (results.length > 0) {
    poses = results[0].pose;
  }
}