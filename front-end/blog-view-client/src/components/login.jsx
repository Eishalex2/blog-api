import Header from "./header"

const Login = () => {
  return (
    <>
      <Header />
      <form action="" method="POST">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

export default Login;