//Frontend JS
//dDOM elements
const fileInput = document.getElementById("file-input");
const fileInputLabel = document.getElementById("file-input_label");
const fileInputIcon = document.getElementById("input-icon");
const fileInputMessage = document.getElementById("input-message");
const submitInput = document.getElementById("submit-file");
const repitedWords = document.querySelectorAll(".word");
const sinonimsURL = "/api/sinonims/";
const urlOptions = {
  method: "GET",
  headers: new Headers({ "Content-type": "application/json" }),
  mode: "cors",
};
const spinner = document.createElement("div").className("loader");
//event listeners

fileInput && fileInput.addEventListener("change", handleFileLoad);
repitedWords &&
  repitedWords.forEach((word) => {
    word.addEventListener("click", displaySinonims);
  });

submitInput.addEventListener("submit", (fileInputIcon.innerHTML = spinner));

//Event handelers

function handleFileLoad(e) {
  if (e.target.value) {
    displayFileIsLoaded(e);
    return;
  }
  displayNoFileIsLoaded();
  return;
}

async function displaySinonims(e) {
  let word = await e.target.innerText;
  let response = await fetch(sinonimsURL + word, urlOptions);
  let data = await response.json();

  console.log(data);
}
//changes the content of the  input to display the  name of the  file loadad and a new icon to signal it. (shooth transition included)
function displayFileIsLoaded(e) {
  // Extract the name of the file from the input
  let fileName;
  try {
    fileName = e.target.value.match(/[^\\/:*?"<>|\r\n]+$/);
  } catch (error) {
    fileName = e.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  }
  //change the style of the input to show the file is loaded
  fileInputLabel.style.backgroundColor = "#00cc44";
  fileInputMessage.style.opacity = 0;
  fileInputIcon.style.opacity = 0;
  fileInputMessage.innerText = fileName;
  fileInputIcon.innerText = "file_download_done";
  fileInputMessage.style.opacity = 1;
  fileInputIcon.style.opacity = 1;
  submitInput.style.visibility = "visible";
  submitInput.style.opacity = 1;
}

function displayNoFileIsLoaded() {
  fileInputLabel.style.backgroundColor = "red";
  fileInputMessage.innerText = "Seleccione un archivo";
  fileInputIcon.innerText = "backup";
  submitInput.style.visibility = "hidden";
  submitInput.style.opacity = 0;
}
