// 사용자가 로그인 했는지 안했는지만 검증하는 페이지
// 로그인 안했으면 우회해서 홈으로 리다이렉션 가게 할거임
import React, { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
    const { user, isLoggedIn, userLoading } = useUser();
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoading) {
            if(!isLoggedIn) {
                navigate("/")
            }
        }
    }, [userLoading, isLoggedIn, navigate])
    return <>{children}</>;
}
