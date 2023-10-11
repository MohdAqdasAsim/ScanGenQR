const form = document.querySelector(".scanner-form");
const imageInput = document.getElementById("image-input");
const imageDisplay = document.getElementById("image-display");
const textDisplay = document.querySelector(".textarea-field");
const content = document.getElementById("content");

const scanText = document.getElementById("textpara");

const copyBtn = document.getElementById("copy-btn");
const changeCameraBtn = document.getElementById("change-camera-btn");
const closeBtn = document.getElementById("close-btn");

const camera = document.getElementById("camera");
const stop = document.getElementById("stop");

const videoBox = document.querySelector("video");

form.addEventListener("click", (e) => {
  imageInput.click();
});

imageInput.addEventListener("change", event => {
  let file = event.target.files[0];
  if (!file) return;

  fetchRequest(file);
});

function fetchRequest(file) {
  let formData = new FormData();
  formData.append("file", file);

  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "GET", body: formData
  }).then(res => res.json()).then(result => {
    scanText.innerText = "Scanning QR Code...";

    let text = result[0].symbol[0].data;

    if (!text) {
      scanText.innerText = "Couldn't Scan QR Code";
      setTimeout(() => {
        scanText.innerText = "Upload QR Code to Scan";
      }, 3000)
      return;
    }

    imageDisplay.src = URL.createObjectURL(file);
    imageDisplay.style.display = "block";
    content.style.display = "none";

    textDisplay.classList.add("active");
    textDisplay.textContent = text;
    closeBtn.style.display = "block";
    copyBtn.style.display = "block";
    changeCameraBtn.style.display = "block";
    form.style = "pointer-events: none";
    scanText.textContent = "Upload QR Code to Scan";
  })
}

let scanner;

camera.addEventListener("click", () => {
  camera.style.display = "none";
  stop.style.display = "inline-block";
  scanText.textContent = "Scanning QR Code...";
  let text = "";
  textDisplay.classList.add("active");
  textDisplay.textContent = text;
  closeBtn.style.display = "block";
  copyBtn.style.display = "block";
  changeCameraBtn.style.display = "block";
  form.style = "pointer-events: none";

  scanner = new Instascan.Scanner({ video: videoBox });
  Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
      // let camera = cameras[0];
      changeCameraBtn.addEventListener("click", () => {
        // var selectedCam = cameras[0];
        // camera.forEach(cameras, (i, c) => {
        //   if (c.name.indexOf('back') != -1) {
        //     selectedCam = c;
        //     return false;
        //   }
        // });
        alert("Unable to change camera")
      });

      scanner.start(cameras[0]).then(() => {
        form.classList.add("active-video");
        videoBox.style.display = "block";
        content.style.display = "none";
      })
    }
  }).catch(err => console.error(err));

  scanner.addListener("scan", (c) => {
    textDisplay.textContent = c;
  })
})

stop.addEventListener("click", () => {
  scanner.stop();
  stop.style.display = "none";
  camera.style.display = "inline-block";
  scanText.textContent = "Upload QR Code to Scan";
  videoBox.style.display = "none";
  content.style.display = "flex";

  textDisplay.classList.remove("active");
  closeBtn.style.display = "none";
  copyBtn.style.display = "none";
  changeCameraBtn.style.display = "none";
  form.style = "pointer-events: all";
  scanText.textContent = "Upload QR Code to Scan";
})

closeBtn.addEventListener("click", () => {
  imageDisplay.src = "";
  imageDisplay.style.display = "none";
  content.style.display = "flex";

  textDisplay.classList.remove("active");
  textDisplay.textContent = "";
  closeBtn.style.display = "none";
  copyBtn.style.display = "none";
  changeCameraBtn.style.display = "none";
  form.style = "pointer-events: all";
})

copyBtn.addEventListener("click", () => {
  let text = textDisplay.textContent;
  navigator.clipboard.writeText(text);
})
