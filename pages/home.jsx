const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home flex-col align-center">
      {/* <div className="image-container">
      <img src="https://cdn.discordapp.com/attachments/598242619851800576/970398725765754931/unknown.png" alt="Background image" />
      </div> */}

      <h1 class="title">One account.</h1>
      <h1 class="subtitle">All the features you need.</h1>

      <div className="app-cards flex">
        <Link to="mail?status=inbox">
          <div className="app-img"><img src="../assets/img/mail.png"/></div>
          <h2>Mail</h2>
          <p>Read and reply to your emails in the most accesible way.</p>
        </Link>
        <Link to="books">
          <div className="app-img"><img src="../assets/img/books.png"/></div>
          <h2>Books</h2>
          <p>Find and purchase your favorite books.Anytime,anywhere.</p>
        </Link>
        <Link to="notes">
          <div className="app-img"><img src="../assets/img/notes.png"/></div>
          <h2>Notes</h2>
          <p>Write down any type of memo in the easiest and fastest way possible.</p>
        </Link>
      </div>

      <h1>Brought to you by:</h1>

      <div className="about-cards">
        <div className="about-card">
          <div className="profile-container">
            {/* <img src="" alt="" /> */}
          </div>
          <h2>Eviatar Karbian</h2>
          <p>A fullstack astronaut words words yayaya bebe mamam nene nangenri more words a word that is different from other words more words to display here thank you i
            think that's enough okay
          </p>
          <div className="socials flex-col">
            <Link to="/">Twt</Link>
            <Link to="/">Git</Link>
            <Link to="/">Ins</Link>
          </div>
        </div>

        <div className="about-card">
          <div className="profile-container">
            {/* <img src="" alt="" /> */}
          </div>
          <h2>Eviatar Karbian</h2>
          <p>A fullstack astronaut words words yayaya bebe mamam nene nangenri more words a word that is different from other words more words to display here thank you i
            think that's enough okay
          </p>
          <div className="socials flex-col">
            <Link to="/">Twt</Link>
            <Link to="/">Git</Link>
            <Link to="/">Ins</Link>
          </div>
        </div>
      </div>

    </section>
  )
}
