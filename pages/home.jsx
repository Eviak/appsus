const { Link } = ReactRouterDOM

export function Home() {
  return <section className="home">

      <Link to="mail?status=inbox" >To Mail app</Link>
      <Link to="notes">To Notes app</Link> 
      </section>
}
