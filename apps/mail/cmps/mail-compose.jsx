
export function MailCompose() {
    return <section className="mail-compose flex-col">
        <header class="compose-header flex space-between">
            <h3>New Message</h3>
            <button>x</button>
        </header>
        <main>
            <form className="compose-main flex-col">
                <input type="text" placeholder="Recipients" />
                <input type="text" placeholder="Subject" />
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </form>
        </main>

    </section>
}