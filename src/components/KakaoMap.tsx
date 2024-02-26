import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box, useBreakpointValue } from "@chakra-ui/react";

interface KakaoMapProps {
    frontLat: number | null;
    frontLon: number | null;
    map_width: number | null;
    map_height: number | null;
}

export default function KakaoMap({
    frontLat,
    frontLon,
    map_width,
    map_height,
}: KakaoMapProps) {
    const defaultLat = 0; // 기본 위도 값
    const defaultLon = 0; // 기본 경도 값

    return (
        <Box width={Number(map_width)} height={Number(map_height)}>
            <Map
                center={{
                    lat: frontLat ?? defaultLat,
                    lng: frontLon ?? defaultLon,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                }}
            >
                <MapMarker
                    position={{
                        lat: frontLat ?? defaultLat,
                        lng: frontLon ?? defaultLon,
                    }}
                ></MapMarker>
            </Map>
        </Box>
    );
}
