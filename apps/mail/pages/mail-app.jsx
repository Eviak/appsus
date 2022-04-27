import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailApp extends React.Component {

    state = {
        mails: [],
        criteria: {}
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.criteria)
            .then(mails => this.setState({ mails }))
    }

    get statusToFilter() {
        const {mails} = this.state
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const status = urlSrcPrm.get('status')
        return mails.filter(mail => {
            return status === 'inbox' && mail.to === 'puki@lala.com' ||
            status === 'sent' && mail.to !== 'puki@lala.com' 
        })
    }

    render() {
        const { mails } = this.state
        return <section className="mail-app flex">
            <section className="interface">
                <button>Compose</button>
                <MailFolderList />
            </section>
            <section className="main-mail">
                <MailList mails={this.statusToFilter} />
            </section>
        </section>
    }
}