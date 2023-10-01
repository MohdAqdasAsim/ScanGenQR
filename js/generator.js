const imageBox = document.querySelector(".image-box");
const downloadBox = document.querySelector(".download");
const textField = document.getElementById("text-field");
const numberField = document.getElementById("number-field");
const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click", () => {
  imageBox.style.height = "150px";
  imageBox.style.border = "2px dashed #448686";
  downloadBox.style.display = "flex";

  imageBox.style.background = `url(https://api.qrserver.com/v1/create-qr-code/?size=${numberField.value}x${numberField.value}&data=${textField.value})`;
  imageBox.style.backgroundRepeat = "no-repeat";
  imageBox.style.backgroundClip = "border-box";
  imageBox.style.backgroundPosition = "center";
  imageBox.style.backgroundSize = "contain";
})

downloadBox.addEventListener("click",() => {
  fetchFile(`https://api.qrserver.com/v1/create-qr-code/?size=${numberField.value}x${numberField.value}&data=${textField.value}`);
})

function fetchFile(url) {
  fetch(url).then(res => res.blob()).then(file => {
    let tempUrl = URL.createObjectURL(file);
    let aTag = document.createElement("a");
    aTag.href = tempUrl;
    aTag.download = textField.value;
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  })
}

textField.addEventListener("change", () => {
  if (!textField.value == "") return;

  imageBox.style.height = "0px";
  imageBox.style.border = "0px";
  downloadBox.style.display = "none";
})