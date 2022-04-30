import { BookPreview } from "./book-preview.jsx"

export function BookList(props) {
    const { books } = props
    return <section className="book-list">
        {books.map(book => <BookPreview key={book.id} book={book} onSelectBook={props.onSelectBook}/>)}
    </section>
}