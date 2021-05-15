class DomElements {
  //All elemnts from the DOM
  fileForm = document.getElementById("file-form");

  fileInput = document.getElementById("file-input");

  fileInputLabel = document.getElementById("file-input_label");

  fileInputIcon = document.getElementById("input-icon");

  fileInputMessage = document.getElementById("input-message");

  fileSubmitInput = document.getElementById("submit-file"); //submit for the file form

  repitedWords = document.querySelectorAll(".word");

  repetitionsPanel = document.getElementById("repetitionsPanel"); //table of repited words

  spinner = '<div class="loader"></div>';

  modal = document.getElementById("myModal");

  modalSpan = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

  modalBody = document.getElementsByClassName("modal-body")[0];

  modalFooter = document.getElementsByClassName("modal-footer")[0];
  //text form elements

  textForm = document.getElementById("input-area__form");

  Textbox = document.getElementById("input-area__text-box");

  textSubmitButton = document.getElementById("analizar");

  noSinonimsMessage = "<h4> No hay sinónimos disponibles</h4>";

  sinonimsErrorMessage = "<h4> Ha ocurrido un error! intente de nuevo </h4>";
}

class DomActions extends DomElements {
  constructor() {
    super();
    this.boundDisplayFileIsLoaded = (e) => this.displayFileIsLoaded(e);
    this.boundDisplayNoFileIsLoaded = () => this.displayNoFileIsLoaded();
    this.boundHandleFileLoad = (e) => this.handleFileLoad(e);
    this.boundDisplaySinonims = (e) => this.displaySinonims(e);
    this.boundLoading = (e) => this.loading(e);
    this.boundGetSinonims = (e) => this.getSinonims(e);
    this.boundGetSinonims = (e) => this.getSinonims(e);
    this.bounCloseModal = () => this.closeModal();
  }

  handleFileLoad(e) {
    e.target.value ? this.displayFileIsLoaded(e) : this.displayNoFileIsLoaded();
  }

  displayFileIsLoaded(e) {
    // Extract the name of the file from the input
    let fileName;
    try {
      fileName = e.target.value.match(/[^\\/:*?"<>|\r\n]+$/);
    } catch (error) {
      fileName = e.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    //change the style of the input to show the file is loaded
    this.fileInputLabel.style.backgroundColor = "#00cc44";
    this.fileInputMessage.style.opacity = 0;
    this.fileInputIcon.style.opacity = 0;
    this.fileInputMessage.innerText = fileName;
    this.fileInputIcon.innerText = "file_download_done";
    this.fileInputMessage.style.opacity = 1;
    this.fileInputIcon.style.opacity = 1;
    this.fileSubmitInput.style.visibility = "visible";
    this.fileSubmitInput.style.opacity = 1;
  }

  displayNoFileIsLoaded() {
    this.fileInputLabel.style.backgroundColor = "red";
    this.fileInputMessage.innerText = "Seleccione un archivo";
    this.fileInputIcon.innerText = "backup";
    this.fileSubmitInput.style.visibility = "hidden";
    this.fileSubmitInput.style.opacity = 0;
  }

  async displaySinonims(e) {
    this.repetitionsPanel.style.pointerEvents = "none";
    try {
      let sinonims = await this.getSinonims(e);
      this.modal.style.display = "block";
      if (sinonims && sinonims.length && sinonims.length > 1) {
        this.modalBody.innerHTML = ""; //clean the boody
        //add the sinonims
        sinonims.forEach((sinonim) => {
          this.modalBody.innerHTML +=
            "<p>" + this.capitalize(sinonim.sinonimo) + "</p>";
        });
      } else {
        this.modalBody.innerHTML = this.noSinonimsMessage;
      }

      this.modalFooter.innerHTML =
        "<h3>" + this.capitalize(e.target.innerText) + "</h3>";
      this.repetitionsPanel.style.pointerEvents = "auto";
    } catch (error) {
      this.modalBody.innerHTML = this.sinonimsErrorMessage;
      this.modalFooter.innerHTML =
        "<h3>" + this.capitalize(e.target.innerText) + "</h3>";
      this.repetitionsPanel.style.pointerEvents = "auto";
    }
  }

  loading(e) {
    if (e.target == this.fileForm) {
      this.fileInputIcon.innerHTML = this.spinner;
      this.fileForm.style.pointerEvents = "none"; //block ckicks during the submit
      return;
    }
    this.textSubmitButton.value = "Cargando...";
    this.textForm.style.pointerEvents = "none";
  }

  async getSinonims(e) {
    const removeAccents = (str) => {
      //remove accents and special characters to prevent errors in the api call
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const sinonimsURL = "/api/sinonims/";
    const urlOptions = {
      //options on the call to get the sinonims
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
      mode: "cors",
    };
    let word = removeAccents(await e.target.innerText);

    let response = await fetch(sinonimsURL + word, urlOptions);
    let data = await response.json();
    return data.sinonims;
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

class UI extends DomActions {
  constructor() {
    super();
    /*add event listeners*/
    //change the styles of the label to show the file is loaded
    this.fileInput &&
      this.fileInput.addEventListener("change", this.boundHandleFileLoad);
    //display repited words
    this.repitedWords &&
      this.repitedWords.forEach((word) => {
        word.addEventListener("click", this.boundDisplaySinonims);
      });
    //show loading weel when loading during submition
    this.fileForm &&
      this.fileForm.addEventListener("submit", this.boundLoading);
    this.textForm &&
      this.textForm.addEventListener("submit", this.boundLoading);

    // When the user clicks on <span> (x), close the modal
    this.modalSpan &&
      this.modalSpan.addEventListener("click", this.bounCloseModal);
  }
}

//initiate the UI on load

let GUI = new UI();
