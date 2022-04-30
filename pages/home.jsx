const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home flex-col align-center">
      <img src="../assets/img/home-bg.png" alt="Background image" />

      <div className="to-apps-btns">
        <Link to="mail?status=inbox">To Mail app</Link>
        <Link to="notes">To Notes app</Link>
      </div>
    </section>
  )
}
