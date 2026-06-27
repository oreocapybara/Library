const bookLibrary = document.querySelector(".book-container");
const addButton = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

// Event listener for the add button
addButton.addEventListener("click", () => {
	dialog.showModal();
	console.log('addButton clicked');
});

form.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevent empty form submission

	const title = form.elements["title"].value;
	const author = form.elements["author"].value;
	const pages = form.elements["pages"].value;
	const read = form.elements["read"].checked;

	addBookToLibrary(title, author, pages, read);
	dialog.close();
	form.reset();
});

const myLibrary = []; //Array to store book instances

// Object Constructor
function Book(title, author, pages, read = false) {
	if (!new.target) {
		throw Error("The new operator must be used to call the constructor");
	}

	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// Add New Book Instance to Array
function addBookToLibrary(title, author, pages, read) {
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);

	displaySingleBook(newBook);
}

// Initial function to display all existing books
function displayALLBooks() {
	myLibrary.forEach((book) => {
		const bookContainer = document.createElement("div");
		bookContainer.dataset.id = book.id;

		const headerTitle = document.createElement("h1");
		headerTitle.textContent = book.title;

		const author = document.createElement("h2");
		author.textContent = book.author;

		const pages = document.createElement("p");
		pages.textContent = `${book.pages} pages`;

		const status = document.createElement("p");
		status.textContent = book.read ? "Read" : "Not read yet";

		bookContainer.append(headerTitle, author, pages, status);

		bookLibrary.append(bookContainer);
	});
}

// function to display single book instance
function displaySingleBook(book) {
	const bookContainer = document.createElement("div");
	bookContainer.dataset.id = book.id;

	const headerTitle = document.createElement("h1");
	headerTitle.textContent = book.title;

	const author = document.createElement("h3");
	author.textContent = book.author;

	const pages = document.createElement("p");
	pages.textContent = `${book.pages} pages`;

	const status = document.createElement("p");
	status.textContent = book.read ? "Read" : "Not read yet";

	bookContainer.append(headerTitle, author, pages, status);

	bookLibrary.append(bookContainer);
}

displayALLBooks();
