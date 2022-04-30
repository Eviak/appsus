
export class BookFilter extends React.Component {

    state = {
        filterBy: {
            minPrice: '0',
            maxPrice: '200',
            title: '',
            catagories: []
        }
    }

    inputRef = React.createRef() //look at this

    handleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => this.props.onSetFilter(this.state.filterBy))
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { minPrice, maxPrice, title } = this.state.filterBy
        return <section className="book-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-title">Title</label>
                <input type="text" id="by-title" placeholder="Title" name="title"
                    value={title} onChange={this.handleChange} ref={this.inputRef} />

                <label htmlFor="by-minPrice">Min Price</label>
                <input type="number" id="by-minPrice" placeholder="by min Price" name="minPrice"
                    value={minPrice} onChange={this.handleChange} />

                <label htmlFor="by-maxPrice">Max Price</label>
                <input type="number" id="by-maxPrice" placeholder="by max Price" name="maxPrice"
                    value={maxPrice} onChange={this.handleChange} />

                <button>Filter</button>
            </form>
        </section>
    }
}