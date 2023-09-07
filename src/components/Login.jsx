import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const auth = localStorage.getItem("partner");
        if (auth) {
            navigate("/products")
        }
    }, [])

    const collectData = () => {
        if (!email || !password) {
            setError(true);
            return false;
        }
        axios({
            method: "post",
            url: "http://localhost:4000/e_shop-partner/login",
            data: { email, password }
        }).then((response) => {
            console.log(response);
            const responseToken = response.data.auth;
            if (responseToken) {
                const responseData = response.data.user;
                const name = responseData.name;
                const userId = responseData._id
                localStorage.setItem("partner", JSON.stringify({ name, email, userId }));
                localStorage.setItem("token", JSON.stringify({ responseToken }));
                navigate("/products");
            } else {
                setError(true);
            }
        })
    }

    return (
        <div className="form">
            {error ? <div><h2>Sorry!! Wrong Email, Password</h2></div>
                : <div>
                    <div className="form-heading">
                        <h1>Login</h1>
                    </div>
                    <div className="form-input">
                        <input className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                        {error && !email ? <span className="error">Empty field : Enter valid email</span> : null}
                        <input className="input-box" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        {error && !password ? <span className="error">Empty field : Enter valid password</span> : null}
                    </div>
                    <div className="form-button">
                        <button onClick={collectData}>Login</button>
                        <h5>Don't have account <Link className="form-link" to="/signup">Sign Up</Link></h5>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;