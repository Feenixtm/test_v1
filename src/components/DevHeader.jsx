import { Link } from 'react-router-dom'

const DevHeader = () => {
    return (
        <header className="px-4 py-2 bg-blue-300">
            <nav className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/journal">Journal</Link>
                <Link to="/habits">Habits</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
        </header>
    )
}

export default DevHeader;