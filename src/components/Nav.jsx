import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Nav = () => {
    const auth = localStorage.getItem("partner");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to="/"><img src="/images/logo.png" alt="logo" /></Link>
            </div>
            <div className="nav-links">
                <ul className="nav-ul">
                    {auth ? <>
                        <li>
                            <Link className="link" to="/products">
                                <h4>Products</h4>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="/add">
                                <h4>Add Products</h4>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logout} className="link" to="/login">
                                <h4>Logout</h4>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="/profile">
                                <h4><AccountCircleOutlinedIcon className="profile-icon" /> {JSON.parse(auth).name}</h4>
                            </Link>
                        </li>
                    </> : <li>
                        <Link className="link" to="/login">
                            <h4>Login</h4>
                        </Link>
                    </li>}
                </ul>
            </div>
        </div>
    )
}

export default Nav;