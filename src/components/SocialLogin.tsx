import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    let kakaoParams = {
        client_id: "d166f87c9d3f4176d1b79841064ba8d4",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const githubParams = {
        client_id: "60d345cd98fcc45c5bda",
        scope: "read:user,user:email",
    };
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
        kakaoParams,
    ).toString()}`;
    const githubUrl = `https://github.com/login/oauth/authorize?${new URLSearchParams(
        githubParams,
    ).toString()}`;
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text
                    textTransform={"uppercase"}
                    color="gray.500"
                    fontSize={"xs"}
                    as="b"
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    as="a"
                    href={githubUrl}
                    w="100%"
                    leftIcon={<FaGithub />}
                >
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={kakaoUrl}
                    w="100%"
                    leftIcon={<FaComment />}
                    colorScheme={"yellow"}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
