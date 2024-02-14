import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStore, getStoreReviews } from "../api";
import {
    AspectRatio,
    Box,
    Grid,
    HStack,
    Heading,
    Skeleton,
    Image,
    VStack,
    Link,
    Badge,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    List,
    ListItem,
    ListIcon,
    Avatar,
    Container,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import KakaoMap from "../components/KakaoMap";

export default function StoreDetail() {
    const { storePk } = useParams();
    const { isLoading, data } = useQuery<IStoreDetail>(
        [`stores`, storePk],
        getStore,
    );
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
        IReview[]
    >([`stores`, storePk, `reviews`], getStoreReviews);
    const getBadgeStyle = () => {
        switch (data?.status) {
            case "진행중":
                return { bg: "green", color: "white" };
            case "종료":
                return { bg: "gray", color: "black" };
            default:
                return { bg: "red", color: "white" };
        }
    };
    const { bg, color } = getBadgeStyle();
    function formatDate(date: Date | undefined): string {
        if (!date) return "";
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("ko-KR", options);
    }

    return (
        <Box mt={10} px={{ base: 10, lg: 40 }}>
            <Box
                display={{ base: "block", lg: "flex" }}
                justifyContent="space-between"
                mt={5}
            >
                <Box
                    mb={{ base: "30", lg: "none" }}
                    flex={{ base: "none", lg: 2 }}
                    mr={{ base: 0, lg: 2 }}
                >
                    <AspectRatio ratio={14 / 9}>
                        <Image
                            src={data?.img_url}
                            alt={data?.p_name}
                            objectFit="cover"
                            maxHeight="550px"
                            maxWidth="100%"
                            rounded="3xl"
                        />
                    </AspectRatio>
                </Box>
                <Box flex={{ base: "none", lg: 1 }} ml={{ base: 0, lg: 20 }}>
                    {data && <KakaoMap p_name={data.p_name} />}
                </Box>
            </Box>
            <Skeleton height={43} mb={3} width="75%" isLoaded={!isLoading}>
                <Heading>{data?.p_name}</Heading>
            </Skeleton>
            <Text ml={2} mb={3}>
                {data?.p_hashtag}
            </Text>
            <Badge
                px={2}
                ml={2}
                mb={10}
                height={30}
                width="auto"
                fontSize="20"
                {...{ bg, color }}
            >
                {data?.status}
            </Badge>
            <Tabs mb={10}>
                <TabList>
                    <Tab>팝업스토어 정보</Tab>
                    <Tab>이용후기</Tab>
                    <Tab>
                        <Link href={data?.news_url} isExternal>
                            원문 기사 이동 <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel mt={10}>
                        <List spacing={3}>
                            <ListItem>
                                <HStack>
                                    <ListIcon
                                        as={MdCheckCircle}
                                        color="green.500"
                                    />
                                    <Text fontSize={"lg"}>
                                        {formatDate(data?.p_startdate)} ~{" "}
                                        {formatDate(data?.p_enddate)}
                                    </Text>
                                </HStack>
                            </ListItem>
                            <ListItem>
                                <HStack>
                                    <ListIcon
                                        as={MdCheckCircle}
                                        color="green.500"
                                    />
                                    <Text fontSize={"lg"}>
                                        {data?.p_location}
                                    </Text>
                                </HStack>
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel>
                        <Box mt={10}>
                            <Heading mb={5} fontSize={"2xl"}>
                                <HStack>
                                    <FaStar /> <Text>{data?.rating} ·</Text>
                                    <Text>후기 {reviewsData?.length}개</Text>
                                </HStack>
                            </Heading>
                            <Container
                                mt={10}
                                maxW="container.lg"
                                marginX="none"
                            >
                                <Grid
                                    gap={40}
                                    templateColumns={"1fr 1fr"}
                                >
                                    {reviewsData?.map((review, index) => (
                                        <VStack
                                            alignItems={"flex-start"}
                                            key={index}
                                        >
                                            <HStack spacing={3}>
                                                <Avatar
                                                    name={review.user.name}
                                                    src={review.user.avatar}
                                                    size="md"
                                                />
                                                <VStack
                                                    alignItems={"flex-start"}
                                                >
                                                    <Heading fontSize={"md"}>
                                                        {review.user.name}
                                                    </Heading>
                                                    <HStack spacing={1}>
                                                        <FaStar size="12px" />
                                                        <Text>
                                                            {review.rating}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                            <Text>{review.payload}</Text>
                                        </VStack>
                                    ))}
                                </Grid>
                            </Container>
                        </Box>
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
