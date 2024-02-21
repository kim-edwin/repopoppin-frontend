import {
    Box,
    Button,
    HStack,
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

    const btnRef = useRef<HTMLButtonElement>(null);
    const { isLoading, data: wishlistsData } = useQuery<IWishlist[]>(
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
    return (
        <ProtectedPage>
            <HStack h="95px" gap={10} mr={10}>
                <Button ref={btnRef} colorScheme="white" onClick={onDrawerOpen}>
                    <FaHeart
                        size={30}
                        color={storeData?.is_liked ? "red" : buttonColor}
                    />
                </Button>
                {storeData?.is_liked ? (
                    <DeleteDrawer
                        isOpen={drawerIsOpen}
                        onClose={onDrawerOpen}
                        btnRef={btnRef}
                        wishlistsData={wishlistsData}
                        handleSave={handleSave}
                        selectedPk={selectedPk}
                        setselectedPk={setselectedPk}
                    />
                ) : (
                    <CreateDrawer
                        isOpen={drawerIsOpen}
                        onClose={onDrawerOpen}
                        btnRef={btnRef}
                        wishlistsData={wishlistsData}
                        handleSave={handleSave}
                        selectedPk={selectedPk}
                        setselectedPk={setselectedPk}
                    />
                )}

                <Box>
                    <LuShare2 size={30} />
                </Box>
                <Box ml={4} mb={1}>
                    <Button
                        onClick={onModalOpen}
                        style={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }}
                    >
                        <LuSiren size={35} color="buttonColor" />
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
