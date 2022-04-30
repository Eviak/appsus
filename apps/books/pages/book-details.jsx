import { LongText } from "../cmps/long-text.jsx"
import { ReviewAdd } from "../cmps/review-add.jsx"
import { bookService } from "../services/book.service.js"
const { Link } = ReactRouterDOM
export class BookDetails extends React.Component { //show Sale sign
    state = {
        currDate: new Date
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then((book) => this.setState({ book }))
    }

    onGoBack = () => {
        this.props.history.push('/books')
    }
    render() {
        const { book } = this.state
        if (!book) return <h4>Loading...</h4>
        const currYear = this.state.currDate.getFullYear()
        const { publishedDate, pageCount, listPrice } = book
        return <section className="book-details">
            <h4 className="path">{'>'} <Link to="/"> Home</Link> {'>'} <Link to="/books"> Books</Link>{' > '} <span>{`${book.title}`}</span></h4>
            <h4><Link to='/books'>{'>'} Back</Link></h4>
            <section className="book-main">
                <div className="image-container"><img src={book.thumbnail} /></div>
                <div className="book-information">
                    <h1>{book.title}</h1>
                    <h1>{book.subtitle}</h1>
                    <h4 className="author">{book.authors.map((author, idx) => <div key={idx}>{author}</div>)}</h4>
                    <h4 className="tags">{book.categories.map((category, idx) => <span key={idx}>{category}</span>)}</h4>
                    <h2 className="price">{bookService.getPrice(listPrice.currencyCode, listPrice.amount)}{book.listPrice.isOnSale && <span>{bookService.getPrice(listPrice.currencyCode, listPrice.amount + 50)}</span>}</h2>
                    <LongText desc={book.description} />
                    <h5>Published: {publishedDate} {(currYear - publishedDate >= 10) && <span>(Veteran Book)</span>} {(currYear - publishedDate < 1) && <span>(New!)</span>}</h5>
                    <h5>Page Count: {pageCount} {(pageCount >= 500) && <span>(Long Read)</span> || (pageCount >= 200) && <span>(Decent Read)</span> || (pageCount <= 100) && <span>(Light Read)</span>}</h5>
                </div>
            </section>
            <ReviewAdd />
        </section>
    }
}