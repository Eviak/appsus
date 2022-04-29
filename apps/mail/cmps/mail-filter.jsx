import { eventBusService } from "../../../services/event-bus.service.js"

export class MailFilter extends React.Component {
    
    state = {
        criteria:''
    }
    
    handleChange = ({target}) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({...prevState,[field]:value}))
    }

    search = (ev) => {
        ev.preventDefault()
        eventBusService.emit("send-search",this.state.criteria)
        this.setState({criteria:''})
    }

    render() {
        const {criteria} = this.state 
        return <section className="mail-filter">
            <form onSubmit={this.search}>
                <button>🔍</button>
                <input className="search-bar" type="text" placeholder="Search Mail" name="criteria" onChange={this.handleChange} value={criteria}/>
            </form>

        </section>
    }
}

