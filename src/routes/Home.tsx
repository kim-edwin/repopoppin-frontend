import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Store from "../components/Store";

export default function Home() {
    return (
        <Grid
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
            columnGap={8}
            rowGap={20}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
            }}
        >
            <Box>
                <Skeleton
                    rounded="3xl"
                    h={{ sm: "255.61px", md: "230.23px", lg: "324.72px" }}
                    mb={5}
                />
                <SkeletonText w="30%" noOfLines={3} spacing={4} />
            </Box>
            <Store />
        </Grid>
    );
}
