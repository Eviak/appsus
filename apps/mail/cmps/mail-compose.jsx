import { mailService } from "../services/mail.service.js"

export class MailCompose extends React.Component {

    state = {
        to: '',
        subject: '',
        body: ''
    }

    handleChange = ({target}) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({...prevState,[field]:value}))
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.onSendMail(this.state)
    }
    render() {
        const {to,subject,body} = this.state
        
        return <section className="mail-compose flex-col">
            <header className="compose-header flex space-between">
                <h3>New Message</h3>
                <button onClick={() => this.props.toggleCompose(false)}>x</button>
            </header>
            <main>
                <form onSubmit={this.onSubmit} className="compose-main flex-col">
                    <input type="text" placeholder="Recipient" name="to" onChange={this.handleChange} value={to} />
                    <input type="text" placeholder="Subject" name="subject" onChange={this.handleChange} value={subject} />
                    <textarea name="body" cols="30" rows="10" onChange={this.handleChange} value={body}></textarea>
                    <button>Send</button>
                </form>
            </main>

        </section>
    }
}