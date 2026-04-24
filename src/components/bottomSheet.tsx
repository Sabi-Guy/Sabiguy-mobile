import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";

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
	allowClose?: boolean;
	useModal?: boolean;
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

const closestSnapPoint = (target: number, snapPoints: number[]) => {
	let nearest = snapPoints[0];
	let nearestDistance = Number.MAX_SAFE_INTEGER;

	for (const point of snapPoints) {
		const distance = Math.abs(target - point);
		if (distance < nearestDistance) {
			nearest = point;
			nearestDistance = distance;
		}
	}

	return nearest;
};

export default function CustomBottomSheet({
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
	allowClose,
	useModal = true,
	sheetStyle,
	contentContainerStyle,
}: BottomSheetProps) {
	const modalRef = useRef<BottomSheetModal>(null);
	const sheetRef = useRef<BottomSheet>(null);
	const closingRef = useRef(false);
	const programmaticCloseRef = useRef(false);
	const validSnapPoints = useMemo(() => normalizeSnapPoints(snapPoints), [snapPoints]);
	const effectiveSnapPoints = useMemo(
		() => validSnapPoints.filter((point) => point > 0),
		[validSnapPoints]
	);
	const computedAllowClose = useMemo(() => validSnapPoints.includes(0), [validSnapPoints]);
	const canClose = allowClose ?? computedAllowClose;

	const fallbackSnapPoint = effectiveSnapPoints[effectiveSnapPoints.length - 1] ?? 50;
	const openSnapPoint = initialSnapPoint > 0 && effectiveSnapPoints.length
		? closestSnapPoint(initialSnapPoint, effectiveSnapPoints)
		: fallbackSnapPoint;
	const initialIndex = Math.max(0, effectiveSnapPoints.indexOf(openSnapPoint));
	const [currentIndex, setCurrentIndex] = useState(() => (isVisible ? initialIndex : -1));

	const renderedSnapPoints = useMemo(() => {
		const source = effectiveSnapPoints.length ? effectiveSnapPoints : [fallbackSnapPoint];
		return source.map((point) => `${point}%`);
	}, [effectiveSnapPoints, fallbackSnapPoint]);

	const notifyClosed = useCallback(() => {
		if (programmaticCloseRef.current) {
			programmaticCloseRef.current = false;
			return;
		}
		if (closingRef.current) {
			return;
		}
		closingRef.current = true;
		onSnapPointChange?.(0);
		onClose?.();
	}, [onClose, onSnapPointChange]);

	const handleChange = useCallback(
		(index: number) => {
			setCurrentIndex(index);
			if (index === -1) {
				notifyClosed();
				return;
			}

			const nextPoint = effectiveSnapPoints[index] ?? openSnapPoint;
			onSnapPointChange?.(nextPoint);
		},
		[effectiveSnapPoints, notifyClosed, onSnapPointChange, openSnapPoint]
	);

	const handleDismiss = useCallback(() => {
		notifyClosed();
	}, [notifyClosed]);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => {
			if (!showBackdropShadow) {
				return null;
			}

			return (
				<BottomSheetBackdrop
					{...props}
					opacity={0.45}
					pressBehavior={canClose && enableBackdropClose ? "close" : "none"}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			);
		},
		[canClose, enableBackdropClose, showBackdropShadow]
	);

	const renderHandle = useCallback(() => {
		if (topContent) {
			return <View style={styles.topArea}>{topContent}</View>;
		}

		if (!showHandle) {
			return <View style={styles.topAreaHidden} />;
		}

		return (
			<View style={styles.topArea}>
				<View style={styles.handle} />
			</View>
		);
	}, [showHandle, topContent]);

	useEffect(() => {
		closingRef.current = false;
		if (isVisible) {
			programmaticCloseRef.current = false;
		}
		if (!isVisible) {
			programmaticCloseRef.current = true;
			setCurrentIndex(-1);
			if (useModal) {
				modalRef.current?.dismiss();
			} else {
				sheetRef.current?.close();
			}
			return;
		}

		setCurrentIndex(initialIndex);
		if (useModal) {
			modalRef.current?.present();
			requestAnimationFrame(() => {
				modalRef.current?.snapToIndex(initialIndex);
			});
		} else {
			sheetRef.current?.snapToIndex(initialIndex);
		}
	}, [initialIndex, isVisible, useModal]);

	const content = (
		<BottomSheetView style={[styles.content, contentContainerStyle]}>{children}</BottomSheetView>
	);

	if (useModal) {
		return (
			<BottomSheetModal
				ref={modalRef}
				index={isVisible ? currentIndex : -1}
				snapPoints={renderedSnapPoints}
				backdropComponent={renderBackdrop}
				onChange={handleChange}
				onDismiss={handleDismiss}
				enablePanDownToClose={canClose}
				handleComponent={renderHandle}
				backgroundStyle={[styles.sheet, sheetStyle]}
			>
				{content}
			</BottomSheetModal>
		);
	}

	return (
		<BottomSheet
			ref={sheetRef}
			index={isVisible ? currentIndex : -1}
			snapPoints={renderedSnapPoints}
			backdropComponent={renderBackdrop}
			onChange={handleChange}
			enablePanDownToClose={canClose}
			handleComponent={renderHandle}
			backgroundStyle={[styles.sheet, sheetStyle]}
			containerStyle={styles.nonModalContainer}
		>
			{content}
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	sheet: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
	},
	nonModalContainer: {
		...StyleSheet.absoluteFillObject,
	},
	topArea: {
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 8,
	},
	topAreaHidden: {
		alignItems: "center",
		paddingTop: 6,
		paddingBottom: 6,
		opacity: 0,
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
