const myLibrary = [];

// MAIN FUNCTIONS

function Book(author, title, numPages, format, readStatus, id) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.format = format;
  this.readStatus = readStatus;
  this.id = id;
}

function addBookToLibrary(author, title, numPages, format, readStatus) {
  const id = window.crypto.randomUUID();
  const book = new Book(author, title, numPages, format, readStatus, id);
  myLibrary.push(book);
}

function displayLibrary(array) {
  const library = document.querySelector(".library");

  for (let book of array) {
    const bookContainer = document.createElement("article");
    bookContainer.classList.add("book");
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
}

// HELPERS

buildBookElement = (tag, className, textContent) => {
  let element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
};

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
displayLibrary(myLibrary);
// function for looping through array
// function for displaying array

// add new book button on library
// tie "new book" button to form (author, title, # pages, unread/read)
// preventDefault will come in handy

// remove book button on book

// unread/read toggle on book
