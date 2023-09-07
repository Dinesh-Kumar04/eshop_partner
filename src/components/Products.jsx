import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Products = () => {
    const [products, setProducts] = React.useState([])

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const id = JSON.parse(localStorage.getItem("partner")).userId;

    React.useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        axios({
            method: "get",
            url: "http://localhost:4000/e_shop-partner/products",
            params : {id},
            headers : {authorization : token.responseToken}
        }).then((result) => {
            setProducts(result.data);
        })
    }

    const deleteProduct = (id) => {
        axios({
            method: "delete",
            url: `http://localhost:4000/e_shop-partner/delete/${id}`,
            headers : {authorization : token.responseToken}
        }).then((response) => {
            getProducts();
        })
    }

    const searchHandle = (event)=>{
        let value = event.target.value;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        
        if(value){
            axios({
                method : "get",
                url : `http://localhost:4000/e_shop-partner/search/${value}`,
                params : {id},
                headers : {authorization : token.responseToken}
            }).then((result)=>{
                setProducts(result.data)
            })
        }else{
            getProducts();
        }
        
    }

    return (
        <div className="product-container">
            <div className="search-box">
                <input type="text" placeholder="Search" onChange={searchHandle}/>
            </div>
            <div className="card">
            {
                products.length > 0 ?
                    products.map((items, index) => (
                        <div className="item" key={index}>
                            <div className="product-details">
                                <img src={items.imageLink} alt="item-img" />
                                <h3 onClick={()=> navigate('/products/details')}>{items.company} {items.modelName}</h3>
                                <h4>₹ {items.price}</h4>
                            </div>
                            <div className="actions">
                                <button className="update-btn" onClick={() => navigate(`/update/${items._id}`)}>Update</button>
                                <button className="delete-btn" onClick={() => deleteProduct(items._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                    : <div><h2>Sorry!! Product Not Found.</h2></div>
            }
            </div>
            
        </div>
    )
}

export default Products;