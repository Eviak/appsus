const { NavLink } = ReactRouterDOM
export function MailFolderList(props){
    return <section className="mail-folder-list flex-col">
        <NavLink to="/mail?status=inbox" onClick={props.clearCriteria}>Inbox</NavLink>
        <NavLink to="/mail?status=sent" onClick={props.clearCriteria}>Sent</NavLink>
        <NavLink to="/mail?status=starred" onClick={props.clearCriteria}>Starred</NavLink>
        <NavLink to="/mail?status=trash" onClick={props.clearCriteria}>Trash</NavLink>
    </section>
}