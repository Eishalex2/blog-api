import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  let navigate = useNavigate();

  function loginPath() {
    navigate("/login");
  }

  function registerPath() {
    navigate("/register");
  }

  return (
    <header>
      <Link to="/">Blog</Link>
      <div>
        <button onClick={loginPath}>Log in</button>
        <button onClick={registerPath}>Register</button>
      </div>
    </header>
  )
}

export default Header;