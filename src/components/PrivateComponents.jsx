import {Navigate, Outlet} from "react-router-dom";

const privateComponents = ()=>{
    const auth = localStorage.getItem("partner");
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default privateComponents;