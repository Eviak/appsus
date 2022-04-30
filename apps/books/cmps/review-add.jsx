import { BookService } from "../services/books-service.js"

export class ReviewAdd extends React.Component {
    state = {
        review: {
            name: '',
            stars: '',
            date: '',
            review: ''
        }
    }

    

    render() {
        return <section className="review-add">
            <h1>Leave A Review</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input className="username" type="text" id="name" placeholder="" />
            </form>
        </section>
    }
}