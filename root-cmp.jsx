import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { NoteApp } from './apps/notes/pages/note-app.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
import { Footer } from './cmps/footer.jsx'
import { BookApp } from './apps/books/pages/book-app.jsx'
import { BookDetails } from './apps/books/pages/book-details.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/notes" component={NoteApp} />
                <Route path="/mail*" component={MailApp} /> 
                <Route path="/books/:bookId" component={BookDetails} />
                <Route path="/books:filter" component={BookApp} />
                <Route path="/books" component={BookApp} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
        <Footer />
    </Router>
}
