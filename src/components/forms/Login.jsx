import { useState } from 'react'

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usernameOrEmail, password })
        });

        if (!response.ok) {
          throw new Error('Login failed');
          setError('Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center ">
        <form className="p-4 border" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          
          <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;