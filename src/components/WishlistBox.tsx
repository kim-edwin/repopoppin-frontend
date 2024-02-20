import { Box, Button, Heading, HStack, Text, Image, AspectRatio } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IWishlistProps {
    pk: number;
    name: string;
    stores: IStoreDetail[];
}

export default function WishlistBox({ pk, name, stores }: IWishlistProps) {
    const storeName = stores.length > 0 ? stores.slice(-1)[0].p_name : "";
    const thumbnail = stores.length > 0 ? stores.slice(-1)[0].thumbnail : "";
    return (
        <HStack
            position={"relative"}
            overflow="hidden"
            mb={2}
            rounded="3xl"
            alignItems="center" // 상하 중앙 정렬
            border="3px solid #FF69B4" // 윤곽선 추가
            borderRadius="3xl" // 윤곽선의 둥근 모서리 설정
        >
            <Box
                w="100%"
                h="auto"
                textAlign="left"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                px={10}
            >
                <Heading mb={3}>{name}</Heading>
                <Text mb={10}>
                    {storeName} 외 {stores.length - 1}개 팝업스토어
                </Text>
                <Link to={`/wishlist/${pk}`}>
                    <Button>상세보기</Button>
                </Link>
            </Box>
            <Box width="100%" height="100%" alignItems="center">
                <AspectRatio ratio={4 / 3}>
                    <Image src={thumbnail} objectFit="cover" />
                </AspectRatio>
            </Box>
        </HStack>
    );
}
