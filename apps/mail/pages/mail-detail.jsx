import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { withRouter } = ReactRouterDOM

class _MailDetail extends React.Component {
    state = {
        mail:{
            subject:"title",
            body:"body",
            fullName:"name"
        }
    }

    componentDidMount() {
        this.loadmail()
    }

    loadmail() {
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        mailService.getMailById(urlSrcPrm.get('id'))
            .then((mail) => {
                mail = mail[0]
                this.setState({mail})
            })
    }

    getFullTime = (date) => {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        console.log(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${utilService.createHours(date)}`)
    }

    render(){
        const {subject,body,fullName,sentAt} = this.state.mail
        
    return <section className="mail-detail flex-col">
        <header className="detail-header">
            <h2>{subject}</h2>
        </header>
        <div className="detail-information flex space-between">
            <h5 className="full-name">{fullName}</h5>
            <h5 className="time-sent">Apr 28, 2022, 6:02 PM (23 hours ago)</h5>
            <button className="star-button">star</button>
        </div>
        <div className="detail-body">
            <p>{body}</p>
        </div>
    </section>
    }
}


export const MailDetail = withRouter(_MailDetail)