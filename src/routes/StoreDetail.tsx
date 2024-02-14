import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStore } from "../api";
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
    OrderedList,
    UnorderedList,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import KakaoMap from "../components/KakaoMap";

export default function StoreDetail() {
    const { storePk } = useParams();
    const { isLoading, data } = useQuery<IStoreDetail>(
        [`stores`, storePk],
        getStore,
    );
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
                    <TabPanel>
                        <List spacing={3}>
                            <ListItem>
                                <ListIcon
                                    as={MdCheckCircle}
                                    color="green.500"
                                />
                                <Text as="b">
                                    {data?.p_startdate.toLocaleString()} ~{" "}
                                    {data?.p_enddate.toLocaleString()}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <ListIcon
                                    as={MdCheckCircle}
                                    color="green.500"
                                />
                                <Text as="b">{data?.p_location}</Text>
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel>
                        <p>여기다가 리뷰 만들거임</p>
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
