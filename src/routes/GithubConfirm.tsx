import { Heading, VStack, Text, Button, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
    const { search } = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        console.log(code);
        if (code) {
            const status = await githubLogIn(code);
            if (status === 200) {
                toast({
                    status: "success",
                    title: "Welcome!",
                    position: "bottom-right",
                    description: "Happy to have you back!",
                });
                queryClient.refetchQueries(["me"]);
                navigate("/");
            }
        }
    };
    useEffect(() => {
        confirmLogin();
    }, []);
    return (
        <VStack mt={80} justifyContent={"center"}>
            <Heading>로그인 중입니다 ...</Heading>
            <Text mb={30}>잠시만 기다려주세요 !</Text>
            <Spinner size="xl"></Spinner>
        </VStack>
    );
}
