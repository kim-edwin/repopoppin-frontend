import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import customLogo from "../sources/poppin_logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
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
    return (
        <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            py={5}
            px={40}
            direction={{
                base: "column",
                md: "row",
            }}
            spacing={{
                base: 4,
                md: 0,
            }}
            borderBottomWidth={1}
        >
            <Link to={`/`}>
                <Box
                    as="img"
                    src={customLogo}
                    alt="Custom Logo"
                    w="auto"
                    h="48px"
                />
            </Link>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
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
                        <Avatar
                            name={user?.name}
                            src={user?.avatar}
                            size={"md"}
                        />
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
