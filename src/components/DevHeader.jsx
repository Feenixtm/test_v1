import { Link } from 'react-router-dom'

const DevHeader = (props) => {
  const user = props.user;
  const setUser = props.setUser;
  const accessToken = props.accessToken;
  const setAccessToken = props.setAccessToken;

  const theme = props.theme;
  const setTheme = props.setTheme;

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
    <header className="px-4 py-2" data-theme={props.theme}>
      <nav className="flex items-center gap-4"
        style={{ justifyContent: user !== null ? "" : 'flex-end' }}
      >

        {
          user !== null && (
            <div className="flex w-full justify-between items-center">
              <div>
                <Link to='/' className="text-[1rem] font-semibold">Logger</Link>
              </div>

              <div className="absolute flex gap-4 left-1/2 -translate-x-1/2">
                {/* <Link to="/">Home</Link> */}
                <Link to="/notes">Notes</Link>
                <Link to="/journal">Journal</Link>
                <Link to="/habits">OldHabits</Link>
                <Link to="/tasks">OldTasks</Link>
              </div>

              <div className="flex gap-4">
                {theme === 'light' && <button onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark'); }}>Dark Mode</button>}
                {theme === 'dark' && <button onClick={() => { setTheme('light'); localStorage.setItem('theme', 'light'); }}>Light Mode</button>}
                <button onClick={() => { setUser(null); setAccessToken(null); }}>Log Out</button>
              </div>
            </div>

          )
        }
      
        {
          user === null && (
            <div className="flex self-end gap-4">
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