import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import StoreDetail from "./routes/StoreDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import Wishlists from "./routes/Wishlists";
import WishlistDetail from "./routes/WishlistDetail";
import RecentView from "./routes/RecentView";

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
                children: [
                    { path: "github", element: <GithubConfirm /> },
                    { path: "kakao", element: <KakaoConfirm /> },
                ],
            },
            // {
            //     path: "wishlist",
            //     element: <Wishlists />,
            // },
            {
                path: "wishlist",
                element: <WishlistDetail />,
            },
            {
                path: "recentview",
                element: <RecentView />,
            },
        ],
    },
]);

export default router;
