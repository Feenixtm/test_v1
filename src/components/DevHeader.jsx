import { Link } from 'react-router-dom'

const DevHeader = (props) => {
  const user = props.user;
  const setUser = props.setUser;
  const accessToken = props.accessToken;
  const setAccessToken = props.setAccessToken;

  async function handleRefreshAccessToken() {
    try {
      const response = await fetch("http://localhost:5050/auth/refresh-token", {
        method: "POST",
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`
        // },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Expired or Invalid refresh token");
      }

      const { newAccessToken } = response.json();
      console.log(newAccessToken);
      setAccessToken(newAccessToken);

    } catch (error) {
      console.error("Error refreshing access token: ", error)
    }
  }

  return (
    <header className="px-4 py-2 bg-blue-600">
      <nav className="flex justify-between">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/custom-text-areas">Custom Text Areas</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/habits">Habits</Link>
          <Link to="/tasks">Tasks</Link>
          {/* <Link to="/heatmaps/yearly">Yearly Heatmap</Link> */}
          {/* <Link to="/heatmaps/monthly">Monthly Heatmap</Link> */}
        </div>

        {
          user !== null && (
            <div className="flex gap-4">
              <span>Welcome back {user || 'USER'}</span>
              {/* <button onClick={() => { handleRefreshAccessToken() }}>Refresh Access Token</button> */}
              <button onClick={() => { setUser(null); setAccessToken(null); }}>Log Out</button>
            </div>
          )
        }

        {
          user === null && (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          )
        }

      </nav>
    </header>
  )
}

export default DevHeader;