const { Link,useHistory } = ReactRouterDOM
export class NavSearch extends React.Component{

    // history = useHistory
    inputRef = React.createRef()

    // onSearch = (ev) => {
    //     ev.preventDefault()
    //     console.log(this.inputRef.value)
    //     this.props.history.push('/books')
        
    // }

    render(){
        return <section className="nav-search">
            <form>
                <input type="text" className="nav-searchbar" placeholder="Search By Name.." name = "title" ref= {(el) => this.inputRef = el}/>
            </form>
        </section>
    }
}