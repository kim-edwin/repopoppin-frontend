import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { LuShare2, LuSiren } from "react-icons/lu";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWishlist, putWishlist } from "../api";
import ProtectedPage from "./Protectedpage";
import ReportModal from "./ReportModal";

interface Iconprops {
    data: IStoreDetail | undefined;
    reloadStoreData: () => void;
}

export default function Threeicons() {
    const {
        isOpen: popIsOpen,
        onOpen: onPopOpen,
        onClose: onPopClose,
    } = useDisclosure();

    const btnRef = useRef<HTMLButtonElement>(null);

    const toast = useToast();

    const copyUrlToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        onPopClose(); // 팝오버 닫기
    };

    const main_h = useBreakpointValue({ base: "50px", md: "95px" });
    const main_mr = useBreakpointValue({ base: "None", md: 10 });
    const heart_size = useBreakpointValue({ base: 20, md: 30 });
    const share_size = useBreakpointValue({ base: 20, md: 30 });
    const siren_size = useBreakpointValue({ base: 25, md: 35 });
    const buttonColor = useColorModeValue("black", "white");

    return (
        <>
            <HStack h={main_h} mr={main_mr} gap={0}>
                <Box>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                ref={btnRef}
                                colorScheme="white"
                                style={{ padding: "0" }}
                            >
                                <FaHeart
                                    size={heart_size}
                                    color={buttonColor}
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>로그인 해주세요!</PopoverHeader>
                            <PopoverBody>
                                위시리스트에 담고 내게 맞는 팝업스토어를
                                추천받아보세요!
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
                <Box ml={2}>
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={popIsOpen}
                        onClose={onPopClose}
                        placement="bottom"
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <Button
                                onClick={onPopOpen}
                                style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}
                            >
                                <LuShare2 size={share_size} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverHeader fontWeight="semibold">
                                링크 공유하기
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                클립보드에 복사하시겠습니까?
                            </PopoverBody>
                            <PopoverFooter
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <ButtonGroup size="sm">
                                    <Button
                                        variant="outline"
                                        onClick={onPopClose}
                                    >
                                        아니오
                                    </Button>
                                    <Button
                                        colorScheme="pink"
                                        onClick={copyUrlToClipboard}
                                    >
                                        예
                                    </Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Box>
                <Box mb={1}>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}
                            >
                                <LuSiren
                                    size={siren_size}
                                    color="buttonColor"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>로그인 해주세요!</PopoverHeader>
                            <PopoverBody>
                                잘못된 정보를 수정해주세요
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
            </HStack>
        </>
    );
}
