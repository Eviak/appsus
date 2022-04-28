import { MailPreview } from "./mail-preview.jsx"

export function MailList(props){
    const {mails,onMailClicked} = props
    return <section className="mail-list">
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onMailClicked={onMailClicked}/>)}
    </section>
}