class BookAdd {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this. author = author;
        this. pages = pages;
        this.haveRead = haveRead
    }
    info() {
        return {title: this.title,
                author: this.author,
                pages: this.pages,
                haveRead: this.haveRead,}
    }
}

let activeBook

const book1 = new BookAdd("Infinite Jest", "David Foster Wallace", 1000, true)
const book2 = new BookAdd("Cat's Cradle", "Kurt Vonnegut", 300, true)
const book3 = new BookAdd("The Corrections", "Jonathan Franzen", 600, true)
const book4 = new BookAdd("Catch-22", "Joseph Heller", 550, true)
const book5 = new BookAdd("Twilight", "Stephanie Meyer", 300, false)

let shelf = []
shelf.push(book1, book2, book3, book4, book5);

const bookShelf = document.getElementById('displayCase')
const openBook = document.getElementById('openBook')
const openTitle = document.getElementById('openTitle')
const openAuthor = document.getElementById('openAuthor')
const openPages = document.getElementById('openPages')
const openRead = document.getElementById('openRead')
const removeButton = document.getElementById('removeBookButton')
const updateButton = document.getElementById('updateButton')

function upDateShelf() {
    bookShelf.innerHTML = ""
    let i = 0;
    for (const books in shelf) {
        x = (shelf[books])
        container = document.createElement("div")
        container.classList.add("book")
        container.innerHTML = `${x.title}`
        container.setAttribute("data-value", `${i}`)
        i++
        bookShelf.appendChild(container)
        }
        clicker()
}

function removeBook() {
    removeButton.addEventListener('click', (e) => {
        x = openTitle.innerHTML
        split = x.split(': ')
        bookTitletoRemove = split[1]
        let i = 0;
        for (books in shelf) {
            if (bookTitletoRemove === shelf[books].title) {
                shelf.splice(i, 1)
                bookTitletoRemove = null
                openTitle.innerHTML = `Title:`
                openAuthor.innerHTML = `Author:`
                openPages.innerHTML = `Pages:`
                openRead.innerHTML = `Read:`
                i++
            } else {i++}
        }
        upDateShelf()
    })
}

function haveReadBook() {
    updateButton.addEventListener('click', (e) => {
            bookTitletoUpdate = shelf[activeBook].haveRead;
                switch (bookTitletoUpdate) {case true:
                        shelf[activeBook].haveRead = false;
                        openRead.innerHTML = `Read: ❌`
                        break;
                    case false:
                        shelf[activeBook].haveRead = true;
                        openRead.innerHTML = `Read: ✅`}
                    upDateShelf()
                    } 
    )}

function clicker() {
    let books = document.querySelectorAll('.book')
    books.forEach((book) => {
        book.addEventListener('click', (e) => {
            let v = (book.dataset.value)
            activeBook = v
            information = (shelf[v].info())
            openTitle.innerHTML = `Title: ${information.title}`
            openAuthor.innerHTML = `Author: ${information.author}`
            openPages.innerHTML = `Pages: ${information.pages}`
            if (shelf[activeBook].haveRead === true) {
                openRead.innerHTML = `Read: ✅`
            } else {
                openRead.innerHTML = `Read: ❌`
            }
        })
    })
}

function addBook() {
    let title = prompt("Title:");
    let author = prompt("Author:")
    let pages = prompt("# of pages:")
    let haveRead = confirm("Have you read this book")
    let theBook = new BookAdd (title, author, pages, haveRead)
    shelf.push(theBook)
    upDateShelf()
}

let newBookButton = document.getElementById('inputPanel')
newBookButton.addEventListener('click', addBook)

upDateShelf()
removeBook()
haveReadBook()