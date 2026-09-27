import { Link } from 'react-router-dom'

const DevHeader = () => {
    return (
        <header className="p-4">
            <nav className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
            </nav>
        </header>
    )
}

export default DevHeader;