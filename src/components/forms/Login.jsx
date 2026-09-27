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
    <div className="flex flex-col gap-4 justify-center items-center border p-6 w-fit min-w-[18rem]">
        <h1 className="text-[1.5rem] font-semibold">Login</h1>

        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>

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

          <p>Don't have an account? <a href="/sign-up" className="text-blue-800">Sign Up</a></p>

          <button className="py-2 border hover:bg-black hover:text-white cursor-pointer" type="button">Login</button>
        </form>
    </div>
  )
}

export default Login;