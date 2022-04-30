import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export function BookPreview(props) {
    const { book } = props
    const { currencyCode, amount } = book.listPrice
    const price = bookService.getPrice(currencyCode,amount)

    return <Link className="book-preview" to={`/books/${book.id}`}>
        <div className="img-container"><img src={book.thumbnail} /></div>
        <h2>{book.title}</h2>
        <h5>{price}</h5>
    </Link>

}