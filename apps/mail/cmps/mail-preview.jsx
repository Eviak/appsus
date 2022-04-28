
export function MailPreview(props){
    const {mail} = props
    const isRead = mail.isRead && 'read' || ''
    return <section className={`mail-preview flex ${isRead}`} onClick={() => props.onMailClicked(mail.id)}>
        <h3 className="sender-name">{mail.fullName}</h3>
        <div className="subj-body flex">
        <h3 className="subject">{mail.subject}</h3>
        <p className="body"> - {mail.body}</p> 
        </div>
        <h3 className="date flex">5:18PM</h3>
    </section>
}