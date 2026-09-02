import "./Navbar.css"
function Navbar() {
    return(
    <nav className="navbar">
        <div className="container navbar-content">
            <h2>My portfolio</h2>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;


