import { Link } from 'react-router-dom'

const DevHeader = () => {
    return (
        <header className="px-4 py-2 bg-blue-600">
            <nav className="flex justify-between">
                <div className="flex gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/journal">Journal</Link>
                    <Link to="/habits">Habits</Link>
                    <Link to="/tasks">Tasks</Link>
                    <Link to="/heatmaps/yearly">Yearly Heatmap</Link>
                    <Link to="/heatmaps/monthly">Monthly Heatmap</Link>
                </div>
                
                <div className="flex gap-4">
                    <Link to="/login">Login</Link>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            </nav>
        </header>
    )
}

export default DevHeader;