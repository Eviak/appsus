import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailApp extends React.Component{

    state = {mails: []}

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
    }

    render() {
        const {mails} = this.state
        return <section className="mail-app">
            <section className="interface">
            <button>Compose</button>
            <MailFolderList />
            </section>
            <MailList mails={mails}/>
        </section>
    }
}