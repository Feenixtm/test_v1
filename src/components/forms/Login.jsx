import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const setUser = props.setUser;
  const setAccessToken = props.setAccessToken;

  const setUserCustomTextAreas = props.setUserCustomTextAreas;
  const setUserEntries = props.setUserEntries;
  const setUserHabits = props.setUserHabits;
  const setUserTasks = props.setUserTasks;

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameOrEmail, password: password })
      });

      if (!response.ok) {
        throw new Error('Login failed. Response not okay...');
        setError('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      setAccessToken(data.accessToken);
      setUser(data.existingUserData.username);

      setUserCustomTextAreas(data.existingUserData.customTextAreas.sort((a, b) => a.id - b.id));
      setUserEntries(data.existingUserData.journalEntries);
      setUserHabits(data.existingUserData.habits);
      setUserTasks(data.existingUserData.tasks);
      
      navigate("/");
      alert("Login successful!");
      

    } catch (error) {
      setError("Login Failed: Server might be down");
      console.error('Error logging in:', error);
    }
  }

  const navigate = useNavigate();

  const fakeLogin = () => {
    setUser({ username: 'Guest', email: 'guest@example.com' });
    navigate('/');
    alert("Guest mode activated. You can now access other routes.");
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center border p-6 w-fit min-w-[18rem]">
        <h1 className="text-[1.5rem] font-semibold">Login</h1>

        <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>

          <input
            className="p-2 border"
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />

          <input
            className="p-2 border"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <p>Don't have an account? <a href="/sign-up" className="text-blue-500">Sign Up</a></p>

          <button 
            className="py-1 border hover:bg-black hover:text-white cursor-pointer" 
            type="button"
            onClick={(e) => { handleLogin(e) }}
          >Login</button>

          <div className="mt-4">
            <p className="text-center">Don't want to make an account?<br/> Then try out:</p>
            <button className="w-full py-1 border hover:bg-black hover:text-white cursor-pointer" type="button" onClick={() => {fakeLogin()}}>Guest Mode</button>
          </div>
          
        </form>
    </div>
  )
}

export default Login;