import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    HStack,
    Box,
    Text,
    Heading,
    Image,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { deleteWishlist } from "../api";
import { Link } from "react-router-dom";

interface IWishlistProps {
    pk: number;
    stores: IStoreDetail[];
    reloadWishlists: () => void;
}

export default function WishlistBox({
    pk,
    stores,
    reloadWishlists,
}: IWishlistProps) {
    const storeName = stores.length > 0 ? stores.slice(-1)[0].p_name : "";
    const thumbnail = stores.length > 0 ? stores.slice(-1)[0].thumbnail : "";

    // AlertDialog를 위한 상태와 함수
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);

    const handleDeleteWishlist = async (wishlistPk: number) => {
        try {
            await deleteWishlist(wishlistPk);
            reloadWishlists();
        } catch (error) {
            console.error("위시리스트 삭제 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <>
            <HStack
                key={pk}
                position={"relative"}
                overflow="hidden"
                mb={2}
                rounded="3xl"
                alignItems="center"
                border="3px solid #FF69B4"
                borderRadius="3xl"
                justifyContent="space-between"
            >
                <Box
                    textAlign="left"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    px={10}
                >
                    <Heading mb={3}>name</Heading>
                    <Text mb={10}>
                        {stores.length === 0 && "추가된 팝업스토어가 없습니다."}
                        {stores.length === 1 && storeName}
                        {stores.length > 1 &&
                            `${storeName} 외 ${stores.length - 1}개 팝업스토어`}
                    </Text>
                    <HStack gap={3}>
                        <Link to={`/wishlist/${pk}`}>
                            <Button>상세보기</Button>
                        </Link>
                        <Button
                            colorScheme="red"
                            onClick={() => setIsOpen(true)}
                        >
                            삭제
                        </Button>
                    </HStack>
                </Box>
                <Box>
                    <Image
                        src={thumbnail}
                        objectFit="cover"
                        width="auto"
                        height="250px"
                    />
                </Box>
            </HStack>

            {/* AlertDialog */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            위시리스트 삭제
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            정말로 위시리스트를 삭제하시겠습니까?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                취소
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleDeleteWishlist(pk);
                                    onClose();
                                }}
                                ml={3}
                            >
                                삭제
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
