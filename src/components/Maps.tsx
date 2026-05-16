import React, { useEffect, useMemo, useRef } from "react";
import Constants from "expo-constants";
import MapView, { Circle, Marker, Polyline, type LatLng, type Region } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

export type MapMarker = {
	id: string;
	coordinate: LatLng;
	title?: string;
	subtitle?: string;
	type?: "user" | "driver" | "pickup" | "dropoff" | "generic";
};

export type MapFollowMode = "none" | "user" | "driver" | "both";

type MapViewProps = {
	initialRegion: Region;
	region?: Region;
	markers?: MapMarker[];
	userLocation?: LatLng;
	driverLocation?: LatLng;
	followMode?: MapFollowMode;
	autoFitPadding?: { top: number; right: number; bottom: number; left: number };
	showsUserLocation?: boolean;
	showAccuracyCircle?: boolean;
	accuracyRadiusMeters?: number;
	showRoute?: boolean;
	routeCoordinates?: LatLng[];
	interactionEnabled?: boolean;
	onRegionChangeComplete?: (region: Region) => void;
	onMarkerPress?: (marker: MapMarker) => void;
	onMapPress?: (coordinate: LatLng) => void;
	style?: { height?: number; width?: number; borderRadius?: number };
};

const DEFAULT_PADDING = { top: 48, right: 48, bottom: 48, left: 48 };

export default function Maps({
	initialRegion,
	region,
	markers = [],
	userLocation,
	driverLocation,
	followMode = "both",
	autoFitPadding = DEFAULT_PADDING,
	showsUserLocation = false,
	showAccuracyCircle = false,
	accuracyRadiusMeters = 60,
	showRoute = false,
	routeCoordinates = [],
	interactionEnabled = true,
	onRegionChangeComplete,
	onMarkerPress,
	onMapPress,
	style,
}: MapViewProps) {
	const mapRef = useRef<MapView>(null);

	const googleMapsApiKey =
		Constants.expoConfig?.android?.config?.googleMaps?.apiKey ??
		Constants.expoConfig?.ios?.config?.googleMapsApiKey;
	const canRenderMap = Boolean(googleMapsApiKey);

	const focusPoints = useMemo(() => {
		if (followMode === "user" && userLocation) return [userLocation];
		if (followMode === "driver" && driverLocation) return [driverLocation];
		if (followMode === "both") {
			return [userLocation, driverLocation].filter(Boolean) as LatLng[];
		}
		return [] as LatLng[];
	}, [driverLocation, followMode, userLocation]);

	useEffect(() => {
		if (!focusPoints.length) {
			return;
		}

		requestAnimationFrame(() => {
			mapRef.current?.fitToCoordinates(focusPoints, {
				edgePadding: autoFitPadding,
				animated: true,
			});
		});
	}, [autoFitPadding, focusPoints]);

	return (
		<View style={[styles.container, style]}>
			{canRenderMap ? (
				<MapView
					ref={mapRef}
					style={styles.map}
					initialRegion={initialRegion}
					region={region}
					onRegionChangeComplete={onRegionChangeComplete}
					scrollEnabled={interactionEnabled}
					zoomEnabled={interactionEnabled}
					rotateEnabled={interactionEnabled}
					pitchEnabled={interactionEnabled}
					showsUserLocation={showsUserLocation}
					onPress={(event) => onMapPress?.(event.nativeEvent.coordinate)}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.id}
							coordinate={marker.coordinate}
							title={marker.title}
							description={marker.subtitle}
							onPress={() => onMarkerPress?.(marker)}
						/>
					))}

					{userLocation ? (
						<Marker
							identifier="user-location"
							coordinate={userLocation}
							pinColor="#0F7A3A"
						/>
					) : null}

					{driverLocation ? (
						<Marker
							identifier="driver-location"
							coordinate={driverLocation}
							pinColor="#1D4ED8"
						/>
					) : null}

					{showAccuracyCircle && userLocation ? (
						<Circle
							center={userLocation}
							radius={accuracyRadiusMeters}
							strokeColor="rgba(15, 122, 58, 0.3)"
							fillColor="rgba(15, 122, 58, 0.12)"
						/>
					) : null}

					{showRoute && routeCoordinates.length > 1 ? (
						<Polyline
							coordinates={routeCoordinates}
							strokeWidth={4}
							strokeColor="#0F7A3A"
						/>
					) : null}
				</MapView>
			) : (
				<View style={styles.mapFallback}>
					<Text style={styles.mapFallbackTitle}>Map unavailable</Text>
					<Text style={styles.mapFallbackSub}>Configure Google Maps key and rebuild dev client.</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 220,
		overflow: "hidden",
		borderRadius: 16,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	mapFallback: {
		flex: 1,
		backgroundColor: "#E9ECE6",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	mapFallbackTitle: { fontSize: 14, fontWeight: "600", color: "#2F3740" },
	mapFallbackSub: { marginTop: 4, textAlign: "center", fontSize: 12, color: "#6D7480" },
});
