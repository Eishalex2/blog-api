import Header from "./header"

const Register = () => {
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
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register;