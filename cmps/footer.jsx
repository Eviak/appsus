const { withRouter } = ReactRouterDOM
function _Footer(props) {
    return <footer className="flex justify-center align-center" style= {props.location.pathname.includes('/mail') && {display:'none'} || {display:'block'}}> 
        CoffeeRights
    </footer>
}

export const Footer = withRouter(_Footer)