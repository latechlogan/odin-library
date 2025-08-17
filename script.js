const myLibrary = [
  {
    author: "Tolkien",
    title: "LOTR",
    numPages: 1000,
    format: "Paperback",
    readStatus: "Unread",
  },
  {
    author: "Cal Newport",
    title: "So Good They Can't Ignore You",
    numPages: 350,
    format: "Hardcover",
    readStatus: "Read",
  },
];

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

    let title = document.createElement("h3");
    title.classList.add("book__title");
    title.textContent = `${book.title}`;
    bookContainer.appendChild(title);

    let author = document.createElement("p");
    author.classList.add("book__author");
    author.textContent = `${book.author}`;
    bookContainer.appendChild(author);

    let numPages = document.createElement("p");
    numPages.classList.add("book__number-pages");
    numPages.textContent = `${book.numPages}`;
    bookContainer.appendChild(numPages);

    let format = document.createElement("p");
    format.classList.add("book__format");
    format.textContent = `${book.format}`;
    bookContainer.appendChild(format);

    let readStatus = document.createElement("p");
    readStatus.classList.add("book__read-status");
    readStatus.textContent = `${book.readStatus}`;
    bookContainer.appendChild(readStatus);

    library.appendChild(bookContainer);
  }
}

displayLibrary(myLibrary);
// function for looping through array
// function for displaying array

// add new book button on library
// tie "new book" button to form (author, title, # pages, unread/read)
// preventDefault will come in handy

// remove book button on book

// unread/read toggle on book
