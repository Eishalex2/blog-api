import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Login from './logins';

const Header = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  function loginPath() {
    navigate("/login");
  }

  return (
    <>
      <header>
        <Link to="/">Blog Editing</Link>
      </header>
      {isLoggedIn ? (
        <Outlet context={{
          user,
          token
        }} />
      ) : (
        <Login setUser={setUser} setToken={setToken} setLoggedIn={setIsLoggedIn} />
      )}
    </>
  )
}

export default Header;