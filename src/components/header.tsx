import React, { useState, useRef, useEffect } from "react";
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
    Tooltip,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import customLogo from "../sources/poppin_logo2.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SearchModal from "./SearchModal";

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
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 검색 모달의 열림 상태

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun);
    const bgColor = useColorModeValue("white", "gray.800");
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

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (!(event.target instanceof HTMLElement)) return;
            if (!event.target.closest(".avatar-tooltip")) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleDocumentClick);
        }

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [isOpen]);
    const handleTooltipClose = () => {
        setIsOpen(false);
    };

    const handleAvatarClick = () => {
        setIsOpen(!isOpen);
    };

    const logoSize = useBreakpointValue({ base: "45px", md: "40px" });
    const header_px = useBreakpointValue({ base: "20px", md: "300px" });
    const avatar_size = useBreakpointValue({ base: "sm", md: "md" });

    return (
        <Flex
            w={"100%"}
            position={"fixed"}
            zIndex={100}
            justifyContent="space-between"
            alignItems="center"
            py={5}
            px={header_px}
            bg={bgColor}
        >
            <Link to={`/`}>
                <Image
                    src={customLogo}
                    alt="Custom Logo"
                    width={logoSize}
                    mt={1}
                    mr={"25px"}
                />
            </Link>
            <HStack spacing={2}>
                <SearchModal
                    isOpen={isSearchModalOpen}
                    onOpen={openSearchModal}
                    onClose={closeSearchModal}
                />
                <IconButton
                    onClick={toggleColorMode}
                    variant="ghost"
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Menu>
                                <MenuButton>
                                    <Tooltip
                                        isOpen={isOpen}
                                        hasArrow
                                        label={
                                            <Stack mt={"1px"} gap={"0"}>
                                                <Text>회원가입하고 </Text>
                                                <Text>
                                                    팝업스토어 추천받기 📌
                                                </Text>
                                            </Stack>
                                        }
                                        placement="bottom-end"
                                        onClose={handleTooltipClose}
                                        className="avatar-tooltip" // 추가된 부분
                                    >
                                        <Avatar
                                            size={avatar_size}
                                            onClick={handleAvatarClick}
                                        />
                                    </Tooltip>
                                </MenuButton>
                                <MenuList
                                    alignSelf={"right"}
                                    minWidth="100px"
                                    zIndex={9999}
                                >
                                    <MenuItem>
                                        <Text onClick={onLoginOpen}>
                                            로그인
                                        </Text>
                                    </MenuItem>
                                    <MenuItem bg="pink">
                                        <Text onClick={onSignUpOpen}>
                                            회원가입
                                        </Text>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
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
                            <MenuList width={"100px"} zIndex={9999}>
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
