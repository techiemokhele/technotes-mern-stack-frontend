import { Link } from 'react-router-dom'

const PublicComponent = () => {
    const content = (
        <section className="container m-auto">
            <header>
                <h1>Welcome to <span className="nowrap">Neo M. Auto Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Springs City - Gauteng, Neo M. Auto Repairs provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Neo M. Auto Repairs<br />
                    555 Springs Drive<br />
                    Springs City, GP 1559<br />
                    <a href="tel:+27648473363">(+27)64 847-3363</a>
                </address>
                <br />
                <p>Owner: Neo Mokhele</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default PublicComponent