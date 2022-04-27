
export function MailPreview(props){
    const {mail} = props
    return <section className="mail-preview flex space-between">
        <h3 className="sender-name">{mail.fullName}</h3>
        <h3 className="subject">{mail.subject}</h3>
        <p className="body">{mail.body}</p> 
        <h3>5:18PM</h3>
    </section>
}