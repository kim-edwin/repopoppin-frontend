import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack bg="gray.100" justifyContent={"center"} minHeight="100vh">
            <Heading>Page not found.</Heading>
            <Text>It seems that you're lost.</Text>
            <Link to="/">
                <Button colorScheme={"red"} variant={"link"}>
                    Go home &rarr;
                </Button>
            </Link>
        </VStack>
    );
}
