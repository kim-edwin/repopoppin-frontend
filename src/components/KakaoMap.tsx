import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box, Heading } from "@chakra-ui/react";

interface KakaoMapProps {
    frontLat: number;
    frontLon: number;
}

export default function KakaoMap({ frontLat, frontLon }: KakaoMapProps) {
    const isVisible = frontLat !== null && frontLon !== null;
    return isVisible ? (
        <Box>
            <Map
                center={{
                    lat: frontLat,
                    lng: frontLon,
                }}
                style={{
                    width: "550px",
                    height: "550px",
                    borderRadius: "20px",
                }}
            >
                <MapMarker
                    position={{
                        lat: frontLat,
                        lng: frontLon,
                    }}
                ></MapMarker>
            </Map>
        </Box>
    ) : null;
}
