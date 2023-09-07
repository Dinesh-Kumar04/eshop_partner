import React from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = ()=>{
    let [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(()=>{
        const auth = localStorage.getItem("partner");
        if(auth){
            navigate("/products")
        }
    },[])

    const collectData = ()=>{
        if(!name || !email || !password){
            setError(true);
            return false;
        }

        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        axios({
            method : "post",
            url : "http://localhost:4000/e_shop-partner/register",
            data : {name, email, password}
        }).then((response)=>{
            const responseToken = response.data.auth;
            if(responseToken){
                const userId = response.data.result._id;
                localStorage.setItem("partner", JSON.stringify({name, email, userId}));
                localStorage.setItem("token", JSON.stringify({responseToken}));
                navigate("/products");
            }else{
                setAlert(true);
            }
        })
    }
    return (
        <div className="form">
            <div className="form-heading">
                <h1>Sign Up</h1>
            </div>
            <div className="form-input">
                {alert ? <span className="error">Sorry!! Email already exist</span> : null}
                <input className="input-box" value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Name" />
                {error && !name ? <span className="error">Empty field : Enter valid name</span> : null}
                <input className="input-box" value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email" />
                {error && !email ? <span className="error">Empty field : Enter valid email</span> : null}
                <input className="input-box" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
                {error && !password ? <span className="error">Empty field : Enter valid password</span> : null}
            </div>
            <div className="form-button">
                <button onClick={collectData}>Sign Up</button>
                <h5>Already have account.? <Link className="form-link" to="/login">Login</Link></h5>
            </div>
        </div>
    )
}

export default Signup;