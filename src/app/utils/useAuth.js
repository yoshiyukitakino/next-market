import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {

            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/user/login")
            }

            const KEY = "next-market-app-book";
            try {

                const secretKey = new TextEncoder().encode(KEY);
                const decodedJwt = await jwtVerify(token, secretKey)
                setLoginUserEmail(decodedJwt.payload.email);
            } catch (error) {
                alert("useAuth error" + error);
                //                router.push("/user/login")
            }
        }
        checkToken();
    }, [router]);
    return loginUserEmail;
}

export default useAuth