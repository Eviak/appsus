import { eventBusService } from "../../../services/event-bus.service.js"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetail } from "./mail-detail.jsx"



const { Route } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: [],
        criteria: "",
        compose: false
    }


    componentDidMount() {
        this.removeEvent = eventBusService.on('send-search', (criteria) => {
            this.setState((prevState) => ({ ...prevState, criteria }), () => this.loadMails())
        })
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.criteria)
            .then(mails => this.setState({ mails }))
    }

    onMailClicked = (ev,id, field) => {
        ev.stopPropagation()
        mailService.onSetToggle(id, field)
        if(field === 'isRead') this.props.history.push(`/mail/?id=${id}`)
        if(field === 'isTrash') this.loadMails()
    }


    onSendMail = (sendParams) => {
        mailService.sendMail(sendParams)
        this.loadMails()
        this.toggleCompose(false)
    }

    toggleCompose = (compose) => {
        this.setState({ compose })
    }

    clearCriteria = () => {
        this.setState((prevState) => ({ ...prevState, criteria: '' }), () => this.loadMails())
    }

    get statusToFilter() {
        const { mails } = this.state
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const status = urlSrcPrm.get('status')
        return mails.filter(mail => {
            return status === 'inbox' && mail.to === 'puki@lala.com' && !mail.isTrash ||
                status === 'sent' && mail.to !== 'puki@lala.com' && !mail.isTrash ||
                status === 'starred' && mail.isStarred && !mail.isTrash ||
                status === 'trash' && mail.isTrash
        })
    }


    render() {
        const { mails, compose } = this.state
        const { pathname, search } = this.props.location
        return <section className="mail-app flex">
            <section className="interface">
                <button onClick={() => this.toggleCompose(true)}>Compose</button>
                <MailFolderList clearCriteria={this.clearCriteria} />
            </section>
            <section className="main-mail">
                {!mails.length && <h2 className="search-results">No Results</h2>}
                <MailList mails={this.statusToFilter} onMailClicked={this.onMailClicked}/>
                {this.props.location.pathname.includes('/mail/') && <MailDetail />}
                {compose && <MailCompose onSendMail={this.onSendMail} toggleCompose={this.toggleCompose} />}
            </section>
        </section>
    }
}