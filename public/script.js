//Frontend JS
/*DOM elements*/
const fileForm = document.getElementById("file-form");
const fileInput = document.getElementById("file-input");
const fileInputLabel = document.getElementById("file-input_label");
const fileInputIcon = document.getElementById("input-icon");
const fileInputMessage = document.getElementById("input-message");
const submitInput = document.getElementById("submit-file");
const repitedWords = document.querySelectorAll(".word");
const repetitionsPanel = document.getElementById("repetitionsPanel"); //table of repited words
const sinonimsURL = "/api/sinonims/";
const spinner = '<div class="loader"></div>';
const modal = document.getElementById("myModal");
const modalSpan = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const modalBody = document.getElementsByClassName("modal-body")[0];
const modalFooter = document.getElementsByClassName("modal-footer")[0];
//text form elements
const textForm = document.getElementById("input-area__form");
const Textbox = document.getElementById("input-area__text-box");
const submitButton = document.getElementById("analizar");
let noSinonimsMessage =
  "<h4> No hay sinónimos disponibles para esta palabra </h4>";
let sinonimsErrorMessage =
  "<h4> Algo anda mal! por favor refresque en intente de nuevo </h4>";

const urlOptions = {
  //options on the call to get the sinonims
  method: "GET",
  headers: new Headers({ "Content-type": "application/json" }),
  mode: "cors",
};

/*event listeners*/

fileInput && fileInput.addEventListener("change", handleFileLoad);
repitedWords &&
  repitedWords.forEach((word) => {
    word.addEventListener("click", displaySinonims);
  });

fileForm && fileForm.addEventListener("submit", loading);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

// When the user clicks on <span> (x), close the modal
modalSpan && modalSpan.addEventListener("click", closeModal);

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
  repetitionsPanel.style.pointerEvents = "none";
  try {
    let sinonims = await getSinonims(e);
    modal.style.display = "block";
    if (sinonims && sinonims.length && sinonims.length > 1) {
      modalBody.innerHTML = ""; //clean the boody
      //add the sinonims
      sinonims.forEach((sinonim) => {
        modalBody.innerHTML += "<p>" + capitalize(sinonim.sinonimo) + "</p>";
      });
    } else {
      modalBody.innerHTML = noSinonimsMessage;
    }

    modalFooter.innerHTML = "<h3>" + capitalize(e.target.innerText) + "</h3>";
    repetitionsPanel.style.pointerEvents = "auto";
  } catch (error) {
    modalBody.innerHTML = sinonimsErrorMessage;
    modalFooter.innerHTML = "<h3>" + capitalize(e.target.innerText) + "</h3>";
    repetitionsPanel.style.pointerEvents = "auto";
  }
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

function loading() {
  fileInputIcon.innerHTML = spinner;
  fileForm.style.pointerEvents = "none"; //block ckicks during the submit
}

async function getSinonims(e) {
  let word = await e.target.innerText;
  let response = await fetch(sinonimsURL + word, urlOptions);
  let data = await response.json();
  return data.sinonims;
}

function closeModal() {
  modal.style.display = "none";
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
