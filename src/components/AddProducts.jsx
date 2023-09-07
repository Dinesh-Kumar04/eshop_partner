import React from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const AddProducts = () => {
    const [imageLink, setImageLink] = React.useState("")
    let [modelName, setModelName] = React.useState("");
    let [company, setCompany] = React.useState("");
    let [category, setCategory] = React.useState("");
    let [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const collectProductInfo = () => {
        if (!imageLink || !modelName || !company || !category || !price || !description) {
            setError(true);
            return false;
        }

        const userData = localStorage.getItem("partner");
        const userID = JSON.parse(userData).userId
        const userName = JSON.parse(userData).name

        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        company = company.charAt(0).toUpperCase() + company.slice(1);
        category = category.charAt(0).toUpperCase() + category.slice(1);
        description = description.toLowerCase();

        const token = JSON.parse(localStorage.getItem("token"));

        axios({
            method: "post",
            url: "http://localhost:4000/e_shop-partner/add-product",
            data: { userID, imageLink, userName, modelName, company, category, description, price },
            headers : {authorization : token.responseToken}
        }).then((response) => {
            console.log(response.request.status);
            if (response.request.status === 200) {
                console.log("SuccessFull")
                navigate("/products")
            } else {
                console.log("Error : Data not inserted successfuly")
            }
        })
    }

    return (
        <div className="product-form">
            <div className="form-heading">
                <h1>Add Product</h1>
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
                <button onClick={collectProductInfo}>Add Product</button>
            </div>
        </div>
    )
}

export default AddProducts;