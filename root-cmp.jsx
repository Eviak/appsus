import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { NoteIndex } from './apps/notes/pages/note-index.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/notes" component={NoteIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
