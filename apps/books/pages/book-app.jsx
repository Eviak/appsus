import { bookService } from '../services/book.service.js'
import { BookDetails } from './book-details.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSelectBook = (book) => {
        this.setState({ selectedBook: book })
    }

    onSetFilter = (filterBy) => {
        this.setState({filterBy}, this.loadBooks)
    }

    render() {
        const { books } = this.state
        const { selectedBook } = this.state
        return <section className='book-app'>
            {!selectedBook && <React.Fragment>
                <BookFilter onSetFilter={this.onSetFilter}/>
                <BookList books={books} onSelectBook={this.onSelectBook} />
            </React.Fragment>
            }
            {selectedBook && <BookDetails book={selectedBook}/>}
        </section>

    }
}