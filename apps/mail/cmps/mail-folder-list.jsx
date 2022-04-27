const { NavLink } = ReactRouterDOM
export function MailFolderList(){
    return <section className="mail-folder-list flex-col">
        <NavLink to="/mail?status=inbox">Inbox</NavLink>
        <NavLink to="/mail?status=sent">Sent</NavLink>
    </section>
}