"use client"
import { useEffect, useState } from "react";
import Image from "next/image"
import useAuth from "@/app/utils/useAuth";
import Link from "next/link";

const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/readone`;
const DELETE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/delete`;
const DeleteItemPage = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const loginUserEmail = useAuth()

    useEffect(() => {
        const getReadOne = async (id: string) => {
            const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" })
            const jsonData = await response.json()
            console.log(jsonData);
            const item = jsonData.item
            setTitle(item.title)
            setPrice(item.price)
            setImage(item.image)
            setDescription(item.description)
            setEmail(item.email)
            setLoading(true)

        }
        getReadOne(context.params.id);

    }, [context]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const id = context.params.id;
            const response = await fetch(`${DELETE_API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (err) {
            alert("商品削除失敗");
        }
    }

    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">商品削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} width={750} height={500} alt="item-image" priority />
                    <h3>¥{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                    <Link href={'/item/readOne/' + context.params.id}>詳細</Link>
                </form>
            </div>
        );
    } else {
        return <div>権限がありません</div>
    };
}

export default DeleteItemPage;