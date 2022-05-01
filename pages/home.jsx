const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home flex-col align-center">
      <div className="image-container">
      {/* <img src="https://cdn.discordapp.com/attachments/598242619851800576/970398725765754931/unknown.png" alt="Background image" /> */}
      </div>

      <div className="to-apps-btns">
        <Link to="mail?status=inbox">To Mail app</Link>
        <Link to="books">To Books app</Link>
        <Link to="notes">To Notes app</Link>
      </div>
    </section>
  )
}
