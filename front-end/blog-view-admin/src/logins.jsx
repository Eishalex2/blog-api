import { useState } from 'react';

const Login = ({ setUser, setToken, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-api-eishalex.fly.dev/api/login", requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        // login worked
        setUsername('');
        setPassword('');
        setUser(data.user);
        setToken(data.token);
        setLoggedIn(true);
      } else {
        console.log("Hmm, that didn't work");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" name='username' id='username' onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;