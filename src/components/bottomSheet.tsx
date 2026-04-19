import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Modal,
	PanResponder,
	Pressable,
	StyleProp,
	StyleSheet,
	useWindowDimensions,
	View,
	ViewStyle,
} from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

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
	showBackdropShadow?: boolean;
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
	showBackdropShadow = true,
	sheetStyle,
	contentContainerStyle,
}: BottomSheetProps) {
	const { height: windowHeight } = useWindowDimensions();
	const [activeSnapPoint, setActiveSnapPoint] = useState(initialSnapPoint);
	const [shouldRender, setShouldRender] = useState(isVisible);
	const [isBackdropInteractive, setIsBackdropInteractive] = useState(false);
	const dragStartY = useRef(0);
	const isClosingRef = useRef(false);
	const translateY = useSharedValue(windowHeight);

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
			translateY.value = withSpring(
				toTranslateY(point),
				{
					damping: 24,
					stiffness: 260,
					mass: 0.85,
				},
				(finished) => {
					if (!finished) {
						return;
					}

					runOnJS(setActiveSnapPoint)(point);
					if (onSnapPointChange) {
						runOnJS(onSnapPointChange)(point);
					}
					if (onDone) {
						runOnJS(onDone)();
					}
				}
			);
		},
		[onSnapPointChange, toTranslateY, translateY]
	);

	const closeSheet = useCallback(() => {
		if (isClosingRef.current) {
			return;
		}

		isClosingRef.current = true;
		setIsBackdropInteractive(false);
		animateToPoint(0, () => {
			isClosingRef.current = false;
			onClose?.();
		});
	}, [animateToPoint, onClose]);

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
			isClosingRef.current = false;
			setIsBackdropInteractive(false);
			const startPoint = validSnapPoints.includes(initialSnapPoint)
				? initialSnapPoint
				: validSnapPoints[validSnapPoints.length - 1];

			translateY.value = windowHeight;
			animateToPoint(startPoint);
			const timer = setTimeout(() => {
				setIsBackdropInteractive(true);
			}, 180);
			return () => clearTimeout(timer);
		}

		setIsBackdropInteractive(false);
		if (shouldRender) {
			translateY.value = withTiming(windowHeight, { duration: 220 }, (finished) => {
				if (finished) {
					runOnJS(setShouldRender)(false);
				}
			});
		}
	}, [
		animateToPoint,
		initialSnapPoint,
		isVisible,
		shouldRender,
		translateY,
		validSnapPoints,
		windowHeight,
	]);

	useEffect(() => {
		if (isVisible) {
			translateY.value = toTranslateY(activeSnapPoint);
		}
	}, [activeSnapPoint, isVisible, toTranslateY, translateY]);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 3,
				onPanResponderGrant: () => {
					dragStartY.current = translateY.value;
				},
				onPanResponderMove: (_, gestureState) => {
					const nextY = clamp(dragStartY.current + gestureState.dy, 0, windowHeight);
					translateY.value = nextY;
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

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: interpolate(translateY.value, [0, windowHeight], [0.45, 0], Extrapolation.CLAMP),
	}));

	const sheetAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	if (!shouldRender) {
		return null;
	}

	const shouldRenderTopArea = Boolean(topContent || showHandle);

	return (
		<Modal transparent animationType="none" visible={shouldRender} onRequestClose={closeSheet}>
			<View style={styles.root}>
				{showBackdropShadow && (
					<Animated.View style={[styles.backdrop, backdropStyle]}>
						<Pressable
							style={StyleSheet.absoluteFill}
							onPress={enableBackdropClose && isBackdropInteractive ? closeSheet : undefined}
						/>
					</Animated.View>
				)}

				<Animated.View
					style={[styles.sheet, { height: windowHeight }, sheetAnimatedStyle, sheetStyle]}
					{...(!shouldRenderTopArea ? panResponder.panHandlers : {})}
				>
					{shouldRenderTopArea && (
						<View style={styles.topArea} {...panResponder.panHandlers}>
							{topContent ?? <View style={styles.handle} />}
						</View>
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
