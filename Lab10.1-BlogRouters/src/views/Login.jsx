import { useNavigate } from "react-router-dom";
const Login = ({SETisLoggedIn}) => {
  const navigate=useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("login successful");
    event.target.username.value = "";
    event.target.password.value = "";
    SETisLoggedIn(true);
    navigate("/"); 
  };

  return (
    <div>
      <h3>Login to Application</h3>
      <form onSubmit={handleLogin}>
        Username: <input type="text" name="username" />
        Password: <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
