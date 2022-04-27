const { Link } = ReactRouterDOM 

export function Home() {
  return <section className="home">
       <Link to="/notes">Notes</Link>
      </section>
}
