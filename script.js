const myLibrary = [];

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

// function displayLibrary(array) {
//   const output = document.querySelector(".lib-output");

//   for (let book in array) {
//     // create html element
//     // then, add to output
//   }
// }

// function for looping through array
// function for displaying array

// add new book button on library
// tie "new book" button to form (author, title, # pages, unread/read)
// preventDefault will come in handy

// remove book button on book

// unread/read toggle on book
