const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home flex-col align-center">
  
      <h1 className="title">One account.</h1>
      <h1 className="subtitle">All the features you need.</h1>

      <div className="app-cards flex">
        <Link to="mail?status=inbox">
          <div className="app-img"><img src="../assets/img/mail.png" /></div>
          <h2>Mail</h2>
          <p>Read and reply to your emails in the most accesible way.</p>
        </Link>
        <Link to="books">
          <div className="app-img"><img src="../assets/img/books.png" /></div>
          <h2>Books</h2>
          <p>Find and purchase your favorite books.Anytime,anywhere.</p>
        </Link>
        <Link to="notes">
          <div className="app-img"><img src="../assets/img/notes.png" /></div>
          <h2>Notes</h2>
          <p>Write down any type of memo in the easiest and fastest way possible.</p>
        </Link>
      </div>

      <h1 className="about-title">Brought to you by:</h1>

      <div className="about-cards">
        <div className="about-card flex">
          <div className="profile-container">
            <img src="../assets/img/eviatar.jpg" />
          </div>
          <div className="about-txt">
            <h2>Eviatar Karbian</h2>
            <p>Is a full-stack rabbit which is well known for his formula of converting React and JSX into carrots.
The hard rabbit worker built various apps throughout his career and is very recommended for hiring as a leading rabbit.
            </p>
          </div>
          <div className="socials flex-col">
            <Link to="/"><img src="../assets/img/facebook.png" /></Link>
            <Link to="/"><img src="../assets/img/git.png" /></Link>
            <Link to="/"><img src="../assets/img/linkedin.png" /></Link>
          </div>
        </div>

        <div className="about-card flex">
          <div className="profile-container">
            <img src="../assets/img/yotam.jpg" />
          </div>
          <div className="about-txt">
            <h2>Yotam Elani</h2>
            <p>A 24 year old future fullstack web developer who loves mechanical keyboards and nerd culture. He is unfortunately not a rabbit but is still eager to master react.
            </p>
          </div>
          <div className="socials flex-col">
            <Link to="/"><img src="../assets/img/facebook.png" /></Link>
            <Link to="/"><img src="../assets/img/git.png" /></Link>
            <Link to="/"><img src="../assets/img/linkedin.png" /></Link>
          </div>
        </div>



      </div>

    </section>
  )
}
