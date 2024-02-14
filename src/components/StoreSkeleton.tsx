import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function StoreSkeleton() {
    return (
        <Box>
            <Skeleton
                rounded="3xl"
                h={{ sm: "255.61px", md: "230.23px", lg: "324.72px" }}
                mb={5}
            />
            <SkeletonText w="30%" noOfLines={3} spacing={4} />
        </Box>
    );
}
