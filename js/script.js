const generatorBtn = document.getElementById("generator-btn");
const readerBtn = document.getElementById("reader-btn");
const readerPage = document.getElementById("reader");
const generatorPage = document.getElementById("generator");

generatorBtn.addEventListener("click",() => {
  generatorPage.style.display = "block";
  readerPage.style.display = "none";

  generatorBtn.classList.add("active");
  readerBtn.classList.remove("active");
});

readerBtn.addEventListener("click",() => {
  readerPage.style.display = "flex";
  generatorPage.style.display = "none";

  readerBtn.classList.add("active");
  generatorBtn.classList.remove("active");
});