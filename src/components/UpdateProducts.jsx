import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProducts = () => {
    const [imageLink, setImageLink] = React.useState("");
    let [modelName, setModelName] = React.useState("");
    let [company, setCompany] = React.useState("");
    let [category, setCategory] = React.useState("");
    let [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [error, setError] = React.useState(false);

    const param = useParams();
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("token"));

    React.useEffect(()=>{
        getProducts();
    },[])

    const getProducts = ()=>{
        axios({
            method : "get",
            url : `http://localhost:4000/e_shop-partner/update/${param.id}`,
            headers : {authorization : token.responseToken}
        }).then((result)=>{
            const productData = result.data;
            setImageLink(productData.imageLink);
            setModelName(productData.modelName);
            setCompany(productData.company);
            setCategory(productData.category);
            setPrice(productData.price);
            setDescription(productData.description);
        })
    }

    const collectProductInfo = () => {
        if (!imageLink || !modelName || !company || !category || !price || !description) {
            setError(true);
            return false;
        }

        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        company = company.charAt(0).toUpperCase() + company.slice(1);
        category = category.charAt(0).toUpperCase() + category.slice(1);
        description = description.toLowerCase();

        axios({
            method:"put",
            url:`http://localhost:4000/e_shop-partner/update/${param.id}`,
            data:{imageLink, modelName, company, category, price, description},
            headers : {authorization : token.responseToken}
        }).then((response)=>{
            if(response.status === 200){
                navigate("/products")
            }
        })
    }

    return (
        <div className="product-form">
            <div className="form-heading">
                <h1>Update Product</h1>
            </div>
            <div className="form-input">
                <input className="input-box" value={imageLink} onChange={(e) => setImageLink(e.target.value)} type="text" placeholder="Image link" />
                {error && !imageLink ? <span className="error">Empty field : Enter valid image link name</span> : null}
                <input className="input-box" value={modelName} onChange={(e) => setModelName(e.target.value)} type="text" placeholder="Model" />
                {error && !modelName ? <span className="error">Empty field : Enter valid model name</span> : null}
                <input className="input-box" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Company" />
                {error && !company ? <span className="error">Empty field : Enter valid company</span> : null}
                <input className="input-box" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category" />
                {error && !category ? <span className="error">Empty field : Enter valid category</span> : null}
                <input className="input-box" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price" />
                {error && !price ? <span className="error">Empty field : Enter valid price</span> : null}
                <textarea className="input-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                {error && !description ? <span className="error">Empty field : Enter valid Description</span> : null}
            </div>
            <div className="form-button">
                <button onClick={collectProductInfo}>Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProducts;