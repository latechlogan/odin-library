// DATA STORAGE & STATE

const myLibrary = [];

// DOM ELEMENTS

const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
const modalForm = document.querySelector(".modal__form");
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
      class="feather feather-plus-circle add-book-icon"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
    Add Book
  </button>`;

// HELPER FUNCTIONS

buildBookElement = (tag, className, textContent) => {
  let element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
};

generateBookID = () => {
  return window.crypto.randomUUID();
};

// CORE FUNCTIONS

function Book(author, title, numPages, format, readStatus, id) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.format = format;
  this.readStatus = readStatus;
  this.id = id;
}

function addBookToLibrary(author, title, numPages, format, readStatus) {
  const book = new Book(
    author,
    title,
    numPages,
    format,
    readStatus,
    generateBookID
  );
  myLibrary.push(book);
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
    let author = buildBookElement("p", "book__author", book.author);
    let numPages = buildBookElement(
      "p",
      "book__number-pages",
      `${book.numPages} pages`
    );
    let format = buildBookElement("p", "book__format", book.format);
    let readStatus = buildBookElement(
      "p",
      "book__read-status",
      book.readStatus ? "Read" : "Not Read"
    );
    bookContainer.append(title, author, numPages, format, readStatus);

    library.appendChild(bookContainer);
  }

  library.insertAdjacentHTML("beforeend", addBookBtn);
}

// EVENT HANDLERS

function handleModalOpen(e) {
  if (
    e.target.matches(".library__add-book") ||
    e.target.matches(".add-book-icon")
  ) {
    modal.showModal();
  }
}

function handleModalClose() {
  modal.close();
}

function handleFormSubmit(e) {
  e.preventDefault();
  console.log("registering form submission");
}

// INIT & LISTENERS

function init() {
  library.addEventListener("click", handleModalOpen);
  modalCloseBtn.addEventListener("click", handleModalClose);
  modalSubmitBtn.addEventListener("click", (e) => handleFormSubmit(e));

  displayLibrary(myLibrary);
}

// START THE APP
document.addEventListener("DOMContentLoaded", init);

addBookToLibrary(
  "J.R.R. Tolkien",
  "Lord of the Rings",
  1000,
  "Paperback",
  false
);
addBookToLibrary(
  "Cal Newport",
  "So Good They Can't Ignore You",
  250,
  "Hardcover",
  true
);

//TODO
// tie "new book" button to data input form
// be sure to prevent default on form submission
// remove book button on book elements
// remove book function/logic
// unread/read toggle on book elements
// unread/read toggle logic
