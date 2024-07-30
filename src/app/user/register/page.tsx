"use client"
import { useState } from "react";
import exp from "constants";

const USER_REGISTER_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`;

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(USER_REGISTER_API_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("ユーザー登録失敗");
        }
    }

    return (
        <div>
            <h1 className="page-title">ユーザ登録</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="ユーザ名" required /><br />
                <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="メール" required /><br />
                <input type="text" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="パスワード" required /><br />
                <button>登録</button>
            </form>
        </div>
    );
}

export default RegisterPage;