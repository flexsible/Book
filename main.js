const books = [];
const RENDER_EVENT = 'render-book';

//Input Book
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook')
    submitForm.addEventListener('submit', function (event) {
        const popup = window.confirm('Add this book?');
        if(popup == true){
            event.preventDefault();
            addBook();
            window.alert('Book added to the list succesfully ')
        }else{
            window.alert('Book is not added to the list')
            event.preventDefault();
        }
        
    });
})
 
//Book
function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const generateID = generateId();
    const Thisbook = generateThisbook(generateID, bookTitle, bookAuthor, bookYear, isComplete);
    books.push(Thisbook);
 
    document.dispatchEvent(new Event(RENDER_EVENT));
}
 
//Generate ID
function generateId() {
    return Math.random();
}
 
//Present Book
function generateThisbook(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}
 
//Getting the Elements
document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';
 
    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';
 
    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (bookItem.isComplete == false) {
            incompleteBookshelfList.append(bookElement);
        } else {
            completeBookshelfList.append(bookElement);
        }
    }
})
 
//Switching Book between Complete and Uncomplete with delete popup
function makeBook(Thisbook) {
    const textBook = document.createElement('h3');
    textBook.innerText = Thisbook.title;
 
    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis : ' + Thisbook.author;
 
    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun : ' + Thisbook.year;
 
    const textArticle = document.createElement('article');
    textArticle.classList.add('book_item');
    textArticle.setAttribute('id', `book-${Thisbook.id}`);
    textArticle.append(textBook, textAuthor, textYear);
 
    if (Thisbook.isComplete) {
        const action = document.createElement('div');
        action.classList.add('action');
 
        const buttonInComplete = document.createElement('button');
        buttonInComplete.innerText = 'Belum selesai di Baca';
        buttonInComplete.classList.add('green');
 
        buttonInComplete.addEventListener('click', function () {
            undoBookFromComplete(Thisbook.id);
        })
 
        const buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Hapus buku';
        buttonRemove.classList.add('red');
 
        buttonRemove.addEventListener('click', function () {
            const popup = window.confirm('remove this book?');
            if (popup==true){
                remove(Thisbook.id);
                window.alert('Book removed from the list')
            }else{
                return Thisbook.id
            }
        })
 
        action.append(buttonInComplete, buttonRemove);
        textArticle.append(action);
 
    } else {
        const action = document.createElement('div');
        action.classList.add('action');
 
        const buttonComplete = document.createElement('button');
        buttonComplete.innerText = 'Selesai dibaca';
        buttonComplete.classList.add('green');
 
        buttonComplete.addEventListener('click', function () {
            addBookToComplete(Thisbook.id);
        })
 
        const buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Hapus buku';
        buttonRemove.classList.add('red');
 
        buttonRemove.addEventListener('click', function () {
            const popup = window.confirm('remove this book?');
            if (popup==true){
                remove(Thisbook.id);
                window.alert('Book removed from the list')
            }else{
                return Thisbook.id
            }
        })
 
        action.append(buttonComplete, buttonRemove);
        textArticle.append(action);
    }
 
    return textArticle;
}
 
//I cant proccess the searching tab, sorry sir!
function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}
function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}
 
//function move the book to readed
function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId);
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
 
}
 
//function move the book to unread
function undoBookFromComplete(bookId) {
    const bookTarget = findBook(bookId);
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}
 
//function delete list of books
function remove(bookId) {
    const bookTarget = findBookIndex(bookId);
 
    if (bookTarget === -1) return;
 
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}