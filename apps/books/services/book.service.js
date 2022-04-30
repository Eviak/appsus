import { bookJSON } from './json/books.json.js'
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const bookService = {
    query,
    getById,
    getPrice,
}
const KEY = 'bookDB'
const gBooks = _loadFromStorage() || bookJSON.getParsedBooks()

function query(filterBy) {
    let books = gBooks
    if (filterBy) {
        let { title, minPrice, maxPrice, categories } = filterBy
        if (!minPrice) minPrice = 0;
        if (!maxPrice) maxPrice = Infinity
        books = gBooks.filter(book =>
            book.title.includes(title) &&
            book.listPrice.amount <= maxPrice &&
            book.listPrice.amount >= minPrice)
    }
    return Promise.resolve(books)
}

function getById(id) {
    const book = gBooks.find(book => book.id === id)
    return Promise.resolve(book)
}

function getPrice(currencyCode, amount){
    let currencySign
    switch (currencyCode) {
        case 'USD':
            currencySign = '$'
            return `${currencySign} ${amount}`
        case 'EUR':
            currencySign = '€'
            return `${amount} ${currencySign}`
        case 'ILS':
            currencySign = '₪'
            return `${amount} ${currencySign}`
    }
}

function _saveToStorage(books) {
    storageService.saveToStorage(KEY, books)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
