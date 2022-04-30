
export function MailPreview(props) {
    const { mail, onMailClicked } = props
    const isRead = mail.isRead && 'read' || ''
    const getTime = () => {
        const datecurr = new Date()
        const datemssg = new Date(mail.sentAt * 1000)
        const oneDay = 1000 * 60 * 60 * 24
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        if ((datecurr - datemssg) / oneDay > 1) return <h3 className="date flex">{months[datemssg.getMonth()]} {datemssg.getDate()}</h3>
        else {
            const time = [datemssg.getHours(), datemssg.getMinutes()]
            const suffix = ( time[0] < 12 ) ? "AM" : "PM"
            time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12
            time[0] = time[0] || 12
            if (time[1] === 0) time[1] = '00'
            return <h3 className="date flex">{time.join(':')} {suffix}</h3>
        }

    }
    return <section className={`mail-preview flex ${isRead}`} onClick={(ev) => onMailClicked(ev, mail.id, 'isRead')}>
        <button className="star-button" onClick={(ev) => onMailClicked(ev, mail.id, 'isStarred')}>✨</button>
        <h3 className="sender-name">{mail.fullName}</h3>
        <div className="subj-body flex">
            <h3 className="subject">{mail.subject}</h3>
            <p className="body"> - {mail.body}</p>
        </div>
        {getTime()}
        <button className="star-button" onClick={(ev) => onMailClicked(ev, mail.id, 'isTrash')}>🗑</button>
    </section>
}