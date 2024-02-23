import {
    Box,
    Button,
    ButtonGroup,
    HStack,
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
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { LuShare2, LuSiren } from "react-icons/lu";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWishlists, putWishlist } from "../api";
import ProtectedPage from "./Protectedpage";
import CreateDrawer from "./CreateDrawer";
import DeleteDrawer from "./DeleteDrawer";
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
        isOpen: drawerIsOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const {
        isOpen: popIsOpen,
        onOpen: onPopOpen,
        onClose: onPopClose,
    } = useDisclosure();

    const btnRef = useRef<HTMLButtonElement>(null);
    const { data: wishlistsData } = useQuery<IWishlist[]>(
        ["wishlists"],
        () => getWishlists(),
    );

    const [selectedPk, setselectedPk] = useState("");

    const handleSave = async () => {
        await putWishlist({
            wishlistPk: Number(selectedPk),
            storePk: storeData!.pk,
        });
        reloadStoreData();
        console.log("다시 불러옴 !!!");
        onDrawerClose();
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
                <Box>
                    <Button
                        ref={btnRef}
                        colorScheme="white"
                        onClick={onDrawerOpen}
                        style={{ padding: "0" }}
                    >
                        <FaHeart
                            size={heart_size}
                            color={storeData?.is_liked ? "red" : buttonColor}
                        />
                    </Button>
                </Box>
                {storeData?.is_liked ? (
                    <DeleteDrawer
                        isOpen={drawerIsOpen}
                        onClose={onDrawerClose}
                        btnRef={btnRef}
                        wishlistsData={wishlistsData}
                        handleSave={handleSave}
                        selectedPk={selectedPk}
                        setselectedPk={setselectedPk}
                    />
                ) : (
                    <CreateDrawer
                        isOpen={drawerIsOpen}
                        onClose={onDrawerClose}
                        btnRef={btnRef}
                        wishlistsData={wishlistsData}
                        handleSave={handleSave}
                        selectedPk={selectedPk}
                        setselectedPk={setselectedPk}
                    />
                )}

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
        </ProtectedPage>
    );
}
