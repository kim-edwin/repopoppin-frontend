import { Box } from "@chakra-ui/react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

export default function Root() {
    return (
        <Box>
            <Header />
            <Outlet />
            {/* <ReactQueryDevtools /> */}
            <Footer />
        </Box>
    );
}
