const { NavLink, withRouter } = ReactRouterDOM
function _MailFolderList(props) {
    const { inbox, sent, starred, trash } = props.length || 0
    const { search } = props.location
    return <section className="mail-folder-list flex-col">
        <NavLink to="/mail?status=inbox" className="folder flex space-between" onClick={props.clearCriteria} isActive={() => ['?status=inbox'].includes(search)} activeClassName="folder-active">
            Inbox
            <h5>{inbox}</h5>
        </NavLink>
        <NavLink to="/mail?status=sent" className="folder flex space-between" onClick={props.clearCriteria} isActive={() => ['?status=sent'].includes(search)} activeClassName="folder-active">
            Sent
            <h5>{sent}</h5>
        </NavLink>
        <NavLink to="/mail?status=starred" className="folder flex space-between" onClick={props.clearCriteria} isActive={() => ['?status=starred'].includes(search)} activeClassName="folder-active">
            Starred
            <h5>{starred}</h5>
        </NavLink>
        <NavLink to="/mail?status=trash" className="folder flex space-between" onClick={props.clearCriteria} isActive={() => ['?status=trash'].includes(search)} activeClassName="folder-active">
            Trash
            <h5>{trash}</h5>
        </NavLink>
    </section>
}


export const MailFolderList = withRouter(_MailFolderList)