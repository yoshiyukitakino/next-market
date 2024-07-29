"use client"
import { useState } from "react";
import useAuth from "@/app/utils/useAuth";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/create`;
const CreateItemPage = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const loginUserEmail = useAuth();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: "dummy"
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("商品登録失敗");
        }
    }

    if (loginUserEmail) {

        return (
            <div>
                <h1 className="page-tilte">商品追加</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" onChange={(e) => { setTitle(e.target.value) }} placeholder="商品名" required />
                    <br />
                    <input type="text" name="price" onChange={(e) => { setPrice(e.target.value) }} placeholder="価格" required />
                    <br />
                    <input type="text" name="image" onChange={(e) => { setImage(e.target.value) }} placeholder="画像" required />
                    <br />
                    <textarea name="description" rows={15} onChange={(e) => { setDescription(e.target.value) }} placeholder="説明" required></textarea>
                    <br />
                    <button>作成</button>

                </form>
            </div>
        );
    }
}


export default CreateItemPage;