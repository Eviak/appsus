const { Link } = ReactRouterDOM

export function Home() {
  return <section className="home">
      <img src="../assets/img/home-bg.png" alt="Background image" />

      <Link to="mail?status=inbox" >To Mail app</Link>
      <Link to="notes">To Notes app</Link> 
      </section>
}
