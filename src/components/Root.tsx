import { Box } from "@chakra-ui/react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Root() {

    return (
        <Box>
            <Header />
            <Outlet />
            {/* <ReactQueryDevtools /> */}
        </Box>
    );
}
