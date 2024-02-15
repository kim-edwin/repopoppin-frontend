import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";

const client = new QueryClient();
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </QueryClientProvider>,
);
