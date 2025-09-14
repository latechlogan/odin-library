// DATA STORAGE & STATE

let myLibrary;

// DOM ELEMENTS

const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
const modalForm = document.querySelector(".modal__form");
const author = document.querySelector("#author");
const authorError = document.querySelector("#author + span");
const title = document.querySelector("#title");
const titleError = document.querySelector("#title + span");
const modalSubmitBtn = document.querySelector(".modal__form-submit");
const library = document.querySelector(".library");
const addBookBtn = `
  <button class="library__add-book">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-plus add-book-icon"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Add Book
  </button>
`;
const removeBookBtn = `
  <button type="button" class="book__remove text-small">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-x remove-book-icon"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line></svg
    >Remove Book
  </button>
`;

// HELPER FUNCTIONS

function buildBookElement(tag, className, textContent) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}

function generateBookId() {
  return window.crypto.randomUUID();
}

function buildCheckboxElement(bookId, isChecked) {
  const label = document.createElement("label");
  label.classList.add("switch");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `read-status-${bookId}`;
  checkbox.name = `read-status-${bookId}`;
  checkbox.checked = isChecked;

  const span = document.createElement("span");
  span.classList.add("slider");

  label.append(checkbox, span);
  return label;
}

// CORE FUNCTIONS

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.display();
  }

  removeBook(id) {
    const indexToRemove = this.books.findIndex((obj) => obj.id === id);
    if (indexToRemove > -1) {
      this.books.splice(indexToRemove, 1);
      this.display();
    }
  }

  display() {
    displayLibrary([...this.books].reverse());
  }
}

class Book {
  constructor(author, title, numPages, format, readStatus, id) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.format = format;
    this.readStatus = readStatus === "true";
    this.id = generateBookId();
  }

  toggleReadStatus = () => {
    this.readStatus = !this.readStatus;
  };
}

// UI/DISPLAY FUNCTIONS

function displayLibrary(array) {
  const library = document.querySelector(".library");
  library.innerHTML = "";

  for (let book of array) {
    const bookContainer = document.createElement("article");
    bookContainer.classList.add("library__book");
    bookContainer.setAttribute("data-id", book.id);

    let title = buildBookElement("h3", "book__title", book.title);
    let author = buildBookElement(
      "p",
      "book__author",
      `Author:  ${book.author}`
    );
    let numPages = buildBookElement(
      "p",
      "book__number-pages",
      `Length:  ${
        book.numPages === "Unknown" ? "Unknown" : book.numPages + " pages"
      }`
    );
    let format = buildBookElement(
      "p",
      "book__format",
      `Format:  ${book.format}`
    );
    bookContainer.append(title, author, numPages, format);
    bookContainer.append(buildCheckboxElement(book.id, book.readStatus));
    bookContainer.insertAdjacentHTML("beforeend", removeBookBtn);

    library.appendChild(bookContainer);
  }

  library.insertAdjacentHTML("afterbegin", addBookBtn);
}

// EVENT HANDLERS

function handleLibraryClick(e) {
  if (
    e.target.matches(".library__add-book") ||
    e.target.matches(".add-book-icon")
  ) {
    handleModalOpen();
  }
  if (e.target.matches(".book__remove")) {
    handleRemoveBook(e);
  }
  if (e.target.matches(".switch")) {
    handleReadStatusToggle(e);
  }
}

function handleModalOpen() {
  modal.showModal();
}

function handleModalClose() {
  modal.close();
}

function handleRemoveBook(e) {
  const targetId = e.target.parentNode.dataset.id;
  myLibrary.removeBook(targetId);
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!title.validity.valid) {
    handleInputError(title, titleError);
  }

  if (!author.validity.valid) {
    handleInputError(author, authorError);
  }

  const numPages =
    document.querySelector("#number-pages").value !== ""
      ? document.querySelector("#number-pages").value
      : "Unknown";
  const format = document.querySelector('input[name="format"]:checked')
    ? document.querySelector('input[name="format"]:checked').value
    : `Unknown`;
  const readStatus = document.querySelector('input[name="read-status"]:checked')
    ? document.querySelector('input[name="read-status"]:checked').value
    : false;

  if (author.validity.valid && title.validity.valid) {
    const book = new Book(
      author.value,
      title.value,
      numPages,
      format,
      readStatus
    );
    myLibrary.addBook(book);
    modalForm.reset();
    handleModalClose();
  }
}

function handleInputValidation(input, inputError) {
  if (input.validity.valid) {
    inputError.textContent = "";
    inputError.className = "error";
  } else {
    handleInputError(input, inputError);
  }
}

function handleInputError(input, inputError) {
  if (input.validity.valueMissing) {
    inputError.textContent = `Please provide the ${input.id} of the book.`;
  }
  inputError.className = "error active";
}

function handleReadStatusToggle(e) {
  const targetId = e.target.parentNode.dataset.id;
  const bookToUpdate = myLibrary.books.filter((obj) => obj.id === targetId)[0];
  bookToUpdate.toggleReadStatus();
}

// INIT & LISTENERS

function init() {
  myLibrary = new Library();
  library.addEventListener("click", handleLibraryClick);
  modalCloseBtn.addEventListener("click", handleModalClose);
  modalForm.addEventListener("submit", (e) => handleFormSubmit(e));

  title.addEventListener("input", () =>
    handleInputValidation(title, titleError)
  );
  author.addEventListener("input", () =>
    handleInputValidation(author, authorError)
  );

  // CREATE DUMMY DATA
  let book1 = new Book(
    "Gordon L. Rottman",
    "The Hardest Ride",
    299,
    "eBook",
    "true"
  );
  let book2 = new Book(
    "Cal Newport",
    "So Good They Cant Ignore You",
    288,
    "Hardcover",
    "true"
  );
  myLibrary.addBook(book1);
  myLibrary.addBook(book2);

  myLibrary.display();
}

// START THE APP
document.addEventListener("DOMContentLoaded", init);

//FUTURE FEATURES
// book cover images
// confirmation before removing
