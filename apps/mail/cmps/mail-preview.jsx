
export function MailPreview(props){
    const {mail} = props
    return <section className="MailPreview">
        {mail.subject}   {mail.body}
    </section>
}