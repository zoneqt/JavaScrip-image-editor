const fileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#canvas");
const canvasCtx = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightness");
const saturateInput = document.querySelector("#saturate");
const blurInput = document.querySelector("#blur");
const invertInput = document.querySelector("#invert");
const sepiaInput = document.querySelector("#sepia");
const grayscaleInput = document.querySelector("#grayscale");
const hueInput = document.querySelector("#hue");
const opacityInput = document.querySelector("#opacity");

const downloadButton = document.querySelector("#download");
const canvasContainer = document.querySelector(".canvas-container");
const closeImage = document.querySelector('.close-image');

const settings = {};
let image = null;


function resetSettings() {
    //default settings
    settings.brightness = 100;
    settings.saturate = 100;
    settings.blur = 0;
    settings.invert = 0;
    settings.sepia = 0;
    settings.grayscale = 0;
    settings.hue = 0;
    settings.opacity = 100;
    
    
    //on reset setting set default values to inputs
    brightnessInput.value = settings.brightness;
    saturateInput.value = settings.saturate;
    blurInput.value = settings.blur;
    invertInput.value = settings.invert;
    sepiaInput.value = settings.sepia;
    grayscaleInput.value = settings.grayscale;
    hueInput.value = settings.hue;
    opacityInput.value = settings.opacity;

    if(!isCanvasEmpty(canvas)) 
        renderImage();
  }

  function updateSettings(key, value) {
    if(!image) return; //if there is no image prevent update

        settings[key] = value;
        renderImage();
  }

  function generateFilter() {
    const { brightness, saturate, blur, invert, sepia, grayscale, hue, opacity } = settings;

    return `brightness(${brightness}%) saturate(${saturate}%) blur(${blur}px) invert(${invert}%) sepia(${sepia}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) opacity(${opacity}%)`;
  }


  function renderImage() {
    canvas.width = image.width;
    canvas.height = image.height;
    
    canvasCtx.filter = generateFilter();
    canvasCtx.drawImage(image, 0, 0);

    canvasContainer.style.display = 'flex';
  }

  function downloadImage() {
    const img = canvas.toDataURL();
    const createEl = document.createElement('a');
    const fileName = Date.now();
    createEl.href = img;

    // This is the name of our downloaded file
    createEl.download = `${fileName}`;

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
  }

  function clearCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 500;
    canvas.height = 500;

    canvasContainer.style.display = 'none';
    image = null;
    fileInput.value = null;
    resetSettings();
  }

  function isCanvasEmpty(cnv) {
    const blank = document.createElement('canvas');

    blank.width = cnv.width;
    blank.height = cnv.height;

    return cnv.toDataURL() === blank.toDataURL();
}


  //add events to inputs
  brightnessInput.addEventListener('change', () => updateSettings('brightness', brightnessInput.value));
  saturateInput.addEventListener('change', () => updateSettings('saturate', saturateInput.value));
  blurInput.addEventListener('change', () => updateSettings('blur', blurInput.value));
  invertInput.addEventListener('change', () => updateSettings('invert', invertInput.value));
  sepiaInput.addEventListener('change', () => updateSettings('sepia', sepiaInput.value));
  grayscaleInput.addEventListener('change', () => updateSettings('grayscale', grayscaleInput.value));
  hueInput.addEventListener('change', () => updateSettings('hue', hueInput.value));
  opacityInput.addEventListener('change', () => updateSettings('opacity', opacityInput.value));
  
  downloadButton.addEventListener('click', () => downloadImage());
  closeImage.addEventListener('click', () => clearCanvas());



  fileInput.addEventListener('change', () => {
    image = new Image();

    image.addEventListener('load', () => {
        resetSettings(); //reset settings to default on image upload

        renderImage();
    });

    image.src = URL.createObjectURL(fileInput.files[0]);

  });

  resetSettings();