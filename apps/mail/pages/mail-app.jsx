import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailApp extends React.Component {

    state = {
        mails: [],
        criteria: {},
        compose: false
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        console.log('rendering')
        mailService.query(this.state.criteria)
            .then(mails => this.setState({ mails }))
    }

    onMailClicked = (id) => {
        console.log(`marked ${id} as read`)
        mailService.setOnRead(id)
        this.loadMails()
    }

    onSendMail = (sendParams) => {
        mailService.sendMail(sendParams)
        this.loadMails()
    }

    toggleCompose = (compose) => {
        this.setState({compose})
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
        const { mails, compose } = this.state
        return <section className="mail-app flex">
            <section className="interface">
                <button onClick = {() => this.toggleCompose(true)}>Compose</button>
                <MailFolderList />
            </section>
            <section className="main-mail">
                <MailList mails={this.statusToFilter} onMailClicked={this.onMailClicked} />
                {compose && <MailCompose onSendMail={this.onSendMail} toggleCompose={this.toggleCompose} />}
            </section>
        </section>
    }
}