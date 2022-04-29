import { eventBusService } from "../../../services/event-bus.service.js"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetail } from "./mail-detail.jsx"


const {BrowseRouter,Route,Switch} = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: [],
        criteria: "",
        compose: false
    }


    componentDidMount() {
        this.removeEvent = eventBusService.on('send-search', (criteria) => {
            this.setState((prevState) => ({...prevState, criteria}),() => this.loadMails())
        })
        this.loadMails()
    }

    loadMails = () => {
        console.log('rendering, criteria is ',this.state.criteria)
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
        this.toggleCompose(false)
    }

    toggleCompose = (compose) => {
        this.setState({compose})
    }

    clearCriteria = () => {
        this.setState((prevState) => ({...prevState, criteria:''}),() => this.loadMails())
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
                <MailFolderList clearCriteria={this.clearCriteria}/>
            </section>
            <section className="main-mail">
                {!mails.length && <h2 className="search-results">No Results</h2>}
                <MailList mails={this.statusToFilter} onMailClicked={this.onMailClicked} />
                {/* <MailDetail /> */}
                {compose && <MailCompose onSendMail={this.onSendMail} toggleCompose={this.toggleCompose} />}
            </section>
        </section>
    }
}