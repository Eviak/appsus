const { Link } = ReactRouterDOM

export function Home() {
  return <section className="home">
      <Link to="notes">To Notes app</Link> 
      </section>
}
