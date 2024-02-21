import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Select,
    Button,
} from "@chakra-ui/react";

interface DelteDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<HTMLButtonElement | null>;
    wishlistsData: IWishlist[] | undefined;
    handleSave: () => void;
    selectedPk: string;
    setselectedPk: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteDrawer: React.FC<DelteDrawerProps> = ({
    isOpen,
    onClose,
    btnRef,
    wishlistsData,
    handleSave,
    selectedPk,
    setselectedPk,
}) => (
    <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
    >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{"위시리스트 삭제"}</DrawerHeader>

            <DrawerBody>
                <Select
                    placeholder="Select option"
                    value={selectedPk}
                    onChange={(e) => setselectedPk(e.target.value)}
                >
                    {wishlistsData?.map((wishlist) => {
                        if (wishlist.stores.length > 0) {
                            return (
                                <option key={wishlist.pk} value={wishlist.pk}>
                                    {wishlist.name}
                                </option>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Select>
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSave}>
                    Save
                </Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);

export default DeleteDrawer;
