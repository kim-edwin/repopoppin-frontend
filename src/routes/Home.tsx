import { Grid, useEditable } from "@chakra-ui/react";
import Store from "../components/Store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import StoreSkeleton from "../components/StoreSkeleton";
import { getStores } from "../api";

export default function Home() {
    const { isLoading, data } = useQuery<IStore[]>(["stores"], getStores);
    return (
        <Grid
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
            columnGap={16}
            rowGap={20}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
            }}
        >
            {isLoading ? (
                <>
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                    <StoreSkeleton />
                </>
            ) : null}
            {data?.map((store) => (
                <Store
                    key={store.id}
                    pk={store.pk}
                    img_url={store.img_url}
                    p_name={store.p_name}
                    rating={store.rating}
                    p_location={store.p_location}
                    p_hashtag={store.p_hashtag}
                    p_startdate={store.p_startdate}
                    p_enddate={store.p_enddate}
                    status={store.status}
                />
            ))}
        </Grid>
    );
}
