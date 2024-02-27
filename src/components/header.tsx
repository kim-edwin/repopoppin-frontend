import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    ToastId,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import customLogo from "../sources/poppin_logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient();
    const toastId = useRef<ToastId>();
    const mutation = useMutation(logOut, {
        onMutate: () => {
            toastId.current = toast({
                title: "로그아웃 중입니다...",
                description: "곧 다시 만나요 !",
                status: "loading",
                position: "bottom-right",
            });
        },
        onSuccess: () => {
            if (toastId.current) {
                queryClient.refetchQueries(["me"]);
                toast.update(toastId.current, {
                    status: "success",
                    title: "로그아웃 성공!",
                    description: "가지마세욤",
                });
            }
        },
    });
    const onlogout = async () => {
        mutation.mutate();
    };

    const logoSize = useBreakpointValue({ base: "30px", md: "40px" });
    const header_px = useBreakpointValue({ base: "20px", md: "300px" });
    const avatar_size = useBreakpointValue({ base: "sm", md: "md" });
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            py={5}
            px={header_px}
        >
            <Link to={`/`}>
                <Image
                    src={customLogo}
                    alt="Custom Logo"
                    width={logoSize}
                    mt={1}
                />
            </Link>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant="ghost"
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <Button onClick={onSignUpOpen} colorScheme="pink">
                                Sign up
                            </Button>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name={user?.name}
                                    src={user?.avatar}
                                    size={avatar_size}
                                />
                            </MenuButton>
                            <MenuList width={"100px"}>
                                <MenuItem>
                                    <Text>{user?.name}님, 안녕하세요!</Text>
                                </MenuItem>
                                <Link to="/recentview">
                                    <MenuItem>최근 조회한 스토어</MenuItem>
                                </Link>
                                <Link to="/wishlist">
                                    <MenuItem>위시리스트</MenuItem>
                                </Link>
                                <MenuItem bg="pink" onClick={onlogout}>
                                    로그아웃
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Flex>
    );
}
