import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup"
import PrivateComponents from "./PrivateComponents";
import ProductDetails from "./ProductDetails";
import PageNotFound from "./PageNotFound"

const PartnerRoutes = () => {
    return (
        <div className="container">
            <Routes>
                <Route element={<PrivateComponents />}>
                    <Route path='/products' element={<Products />} />
                    <Route path='/add' element={<AddProducts />} />
                    <Route path='/update/:id' element={<UpdateProducts />} />
                    <Route path='/products/details' element={<ProductDetails />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    )
}

export default PartnerRoutes;