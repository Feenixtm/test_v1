import { useState } from 'react'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
        const response = await fetch ('/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
          throw new Error('Sign up failed');
          setError('Sign up failed');
        }

        const data = await response.json();
        console.log('Sign up successful:', data);

    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center border p-6 w-fit min-w-[18rem]">
        <h1 className="text-[1.5rem] font-semibold">Sign Up</h1>
      
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <input
            className="p-2 border"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="p-2 border"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            className="p-2 border"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>

          <button className="py-2 border hover:bg-black hover:text-white cursor-pointer" type="button">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp