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

export default function Threeicons({
    data: storeData,
    reloadStoreData,
}: Iconprops) {
    const {
        isOpen: modalIsOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure();
    
    const {
        isOpen: popIsOpen,
        onOpen: onPopOpen,
        onClose: onPopClose,
    } = useDisclosure();
    
    const btnRef = useRef<HTMLButtonElement>(null);

    const toast = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = async () => {
        if (storeData?.is_liked) {
            // 위시리스트에서 삭제하는 경우
            setIsModalOpen(true);
        } else {
            // 위시리스트에 추가하는 경우
            try {
                await putWishlist({
                    storePk: storeData!.pk,
                });
                reloadStoreData();
                // 성공적으로 추가되었음을 사용자에게 알림
                toast({
                    title: "성공!",
                    description: "위시리스트에 추가되었습니다.",
                    status: "success",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                // 오류 발생 시 사용자에게 알림
                toast({
                    title: "오류가 발생했습니다.",
                    description: "위시리스트에 추가하지 못했습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await putWishlist({
            storePk: storeData!.pk,
        });
        reloadStoreData();
    };

    const buttonColor = useColorModeValue("black", "white");

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

    return (
        <ProtectedPage>
            <HStack h={main_h} mr={main_mr} gap={0}>
                {/* <Box>
                    <Button
                        ref={btnRef}
                        colorScheme="white"
                        style={{ padding: "0" }}
                        onClick={handleSave}
                    >
                        <FaHeart
                            size={heart_size}
                            color={storeData?.is_liked ? "red" : buttonColor}
                        />
                    </Button>
                </Box> */}

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
                    <Button
                        onClick={onModalOpen}
                        style={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }}
                    >
                        <LuSiren size={siren_size} color="buttonColor" />
                    </Button>
                </Box>
            </HStack>
            <ReportModal
                isOpen={modalIsOpen}
                onClose={onModalClose}
                storePk={storeData?.pk || 0}
                reloadStoreData={reloadStoreData}
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>삭제 확인</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>정말 위시리스트에서 제거하시겠습니까?</ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="pink"
                            onClick={handleConfirmDelete}
                        >
                            확인
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            취소
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ProtectedPage>
    );
}
