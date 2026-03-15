import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Animated,
	Modal,
	PanResponder,
	Pressable,
	StyleProp,
	StyleSheet,
	useWindowDimensions,
	View,
	ViewStyle,
} from "react-native";

type BottomSheetProps = {
	isVisible: boolean;
	onClose?: () => void;
	children: React.ReactNode;
	snapPoints?: number[];
	initialSnapPoint?: number;
	onSnapPointChange?: (snapPoint: number) => void;
	topContent?: React.ReactNode;
	showHandle?: boolean;
	enableBackdropClose?: boolean;
	sheetStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
};

const DEFAULT_SNAP_POINTS = [0, 25, 50, 75, 100];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeSnapPoints = (snapPoints: number[]) => {
	const uniquePoints = Array.from(new Set(snapPoints.map((point) => clamp(point, 0, 100))));

	if (!uniquePoints.includes(0)) {
		uniquePoints.push(0);
	}

	return uniquePoints.sort((a, b) => a - b);
};

const closestPoint = (targetY: number, snapPoints: number[], windowHeight: number) => {
	let nearest = snapPoints[0];
	let nearestDistance = Number.MAX_SAFE_INTEGER;

	for (const point of snapPoints) {
		const translateY = windowHeight * (1 - point / 100);
		const distance = Math.abs(targetY - translateY);

		if (distance < nearestDistance) {
			nearest = point;
			nearestDistance = distance;
		}
	}

	return nearest;
};

export default function BottomSheet({
	isVisible,
	onClose,
	children,
	snapPoints = DEFAULT_SNAP_POINTS,
	initialSnapPoint = 50,
	onSnapPointChange,
	topContent,
	showHandle = true,
	enableBackdropClose = true,
	sheetStyle,
	contentContainerStyle,
}: BottomSheetProps) {
	const { height: windowHeight } = useWindowDimensions();
	const [isMounted, setIsMounted] = useState(isVisible);
	const [activeSnapPoint, setActiveSnapPoint] = useState(initialSnapPoint);
	const dragStartY = useRef(0);
	const translateY = useRef(new Animated.Value(windowHeight)).current;

	const validSnapPoints = useMemo(() => normalizeSnapPoints(snapPoints), [snapPoints]);

	const toTranslateY = useCallback(
		(point: number) => {
			const safePoint = clamp(point, 0, 100);
			return windowHeight * (1 - safePoint / 100);
		},
		[windowHeight]
	);

	const animateToPoint = useCallback(
		(point: number, onDone?: () => void) => {
			Animated.spring(translateY, {
				toValue: toTranslateY(point),
				damping: 24,
				stiffness: 240,
				mass: 0.9,
				useNativeDriver: true,
			}).start(() => {
				setActiveSnapPoint(point);
				onSnapPointChange?.(point);
				onDone?.();
			});
		},
		[onSnapPointChange, toTranslateY, translateY]
	);

	const closeSheet = useCallback(() => {
		animateToPoint(0, () => {
			setIsMounted(false);
			onClose?.();
		});
	}, [animateToPoint, onClose]);

	useEffect(() => {
		if (isVisible) {
			const startPoint = validSnapPoints.includes(initialSnapPoint)
				? initialSnapPoint
				: validSnapPoints[validSnapPoints.length - 1];

			setIsMounted(true);
			translateY.setValue(windowHeight);
			animateToPoint(startPoint);
			return;
		}

		if (isMounted) {
			closeSheet();
		}
	}, [
		animateToPoint,
		closeSheet,
		initialSnapPoint,
		isMounted,
		isVisible,
		translateY,
		validSnapPoints,
		windowHeight,
	]);

	useEffect(() => {
		if (isMounted) {
			translateY.setValue(toTranslateY(activeSnapPoint));
		}
	}, [activeSnapPoint, isMounted, toTranslateY, translateY]);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 3,
				onPanResponderGrant: () => {
					translateY.stopAnimation((value: number) => {
						dragStartY.current = value;
					});
				},
				onPanResponderMove: (_, gestureState) => {
					const nextY = clamp(dragStartY.current + gestureState.dy, 0, windowHeight);
					translateY.setValue(nextY);
				},
				onPanResponderRelease: (_, gestureState) => {
					const projectedY = clamp(dragStartY.current + gestureState.dy, 0, windowHeight);
					const nextPoint = closestPoint(projectedY, validSnapPoints, windowHeight);

					if (nextPoint === 0) {
						closeSheet();
						return;
					}

					animateToPoint(nextPoint);
				},
			}),
		[animateToPoint, closeSheet, translateY, validSnapPoints, windowHeight]
	);

	const backdropOpacity = useMemo(
		() =>
			translateY.interpolate({
				inputRange: [0, windowHeight],
				outputRange: [0.45, 0],
				extrapolate: "clamp",
			}),
		[translateY, windowHeight]
	);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal transparent animationType="none" visible={isMounted} onRequestClose={closeSheet}>
			<View style={styles.root}>
				<Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
					<Pressable
						style={StyleSheet.absoluteFill}
						onPress={enableBackdropClose ? closeSheet : undefined}
					/>
				</Animated.View>

				<Animated.View
					style={[styles.sheet, { height: windowHeight, transform: [{ translateY }] }, sheetStyle]}
					{...panResponder.panHandlers}
				>
					{(topContent || showHandle) && (
						<View style={styles.topArea}>{topContent ?? <View style={styles.handle} />}</View>
					)}

					<View style={[styles.content, contentContainerStyle]}>{children}</View>
				</Animated.View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "flex-end",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#111827",
	},
	sheet: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
	},
	topArea: {
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 8,
	},
	handle: {
		width: 56,
		height: 5,
		borderRadius: 999,
		backgroundColor: "#D1D5DB",
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
});
