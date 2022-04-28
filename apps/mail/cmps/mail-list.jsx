import { MailPreview } from "./mail-preview.jsx"

export function MailList(props){
    const {mails} = props
    return <section className="mail-list">
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onMailClicked={props.onMailClicked}/>)}
    </section>
}