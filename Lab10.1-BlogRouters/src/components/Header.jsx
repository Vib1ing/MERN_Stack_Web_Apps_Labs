import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const Header = ({ loggedIn, SETisLoggedIn }) => {
    const menuStyle = {
        display: "flex",
        gap: "10px"
    };
    const handleLogout = () => {
        SETisLoggedIn(false);
        navigate("/");
    };
    return (
        <div>
            <h1>Blog App</h1>
            <div style={menuStyle}>
                <Link to="/">Home </Link>
                <Link to="/about">About </Link>
                <Link to="/users">Users </Link>
                {!loggedIn ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    )
}

export default Header