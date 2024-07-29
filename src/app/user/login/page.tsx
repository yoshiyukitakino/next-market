"use client"
import exp from "constants";
import { useRouter } from "next/navigation"
import { useState } from "react";

const LOGIN_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`;
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(LOGIN_API_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const jsonData = await response.json();

            localStorage.setItem("token", jsonData.token);
            alert(jsonData.message);
            router.push("/")

        } catch (error) {
            alert("ログイン失敗");
        }
    }

    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="メール" required /><br />
                <input type="text" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="パスワード" required /><br />
                <button>ログイン</button>
            </form>
        </div>
    );
}
export default LoginPage;