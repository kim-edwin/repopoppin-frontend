import { Box, Divider, Grid, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";



export default function NewSkeleton() {

    return (
        <Box>
            <Grid gap={2} templateColumns={"3fr 4fr"}>
                <Box w="100%" height="100%">
                    <Skeleton
                        height="100%"
                        width="100%"
                        startColor="gray.200"
                        endColor="gray.400"
                        rounded="3xl"
                    />
                </Box>
                <VStack ml={1} align="stretch">
                    <Skeleton height="1rem" width="80%" />
                    <Skeleton height="0.75rem" width="70%" />
                    <Box>
                        <Skeleton
                            height="1rem"
                            width="100%"
                            startColor="gray.200"
                            endColor="gray.400"
                        />
                    </Box>
                    <Skeleton
                        height="1rem"
                        width="80%"
                        startColor="gray.200"
                        endColor="gray.400"
                    />
                </VStack>
            </Grid>
            <Divider mt={3} />
        </Box>
    );
}
