const { NavLink } = ReactRouterDOM
export function MailFolderList(){
    return <section className="mail-folder-list flex-col">
        <NavLink>Inbox</NavLink>
        <NavLink>Sent</NavLink>
    </section>
}