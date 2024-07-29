"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/app/utils/useAuth";

const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/readone`;
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/update`;
const UpdateItemPage = (context) => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const loginUserEmail = useAuth();

    useEffect(() => {
        const getReadOne = async (id: string) => {
            const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" })
            const jsonData = await response.json()
            console.log(jsonData);
            const item = jsonData.item
            setTitle(item.title);
            setPrice(item.price);
            setImage(item.image);
            setDescription(item.description);
            setDescription(item.email);
        }
        getReadOne(context.params.id);

    }, [context]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const id = context.params.id;
            const response = await fetch(`${UPDATE_API_URL}/${id}`, {
                method: "PUT",
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
                    email: loginUserEmail
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("商品変更失敗" + error);
        }
    }

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-titile">商品変更</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="商品名" required />
                    <br />
                    <input type="text" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="価格" required />
                    <br />
                    <input type="text" name="image" value={image} onChange={(e) => { setImage(e.target.value) }} placeholder="画像" required />
                    <br />
                    <textarea name="description" rows={15} value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="説明" required></textarea>
                    <br />
                    <button>変更</button>
                    <Link href={'/item/readOne/' + context.params.id}>詳細</Link>

                </form>
            </div>
        )
    } else {
        return <div>権限がありません</div>
    };
}

export default UpdateItemPage;