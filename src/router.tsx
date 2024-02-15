import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import StoreDetail from "./routes/StoreDetail";
import GithubConfirm from "./routes/GithubConfirm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "stores/:storePk",
                element: <StoreDetail />,
            },
            {
                path: "social",
                children: [{ path: "github", element: <GithubConfirm /> }],
            },
        ],
    },
]);

export default router;
