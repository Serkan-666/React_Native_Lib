import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from "react-native";
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const CustomDraggableBottomSheet = forwardRef(
  (
    { min_height = 0.08, max_height = 0.7, bg_color = "white", children },
    ref
  ) => {
    const WINDOW_HEIGHT = Dimensions.get("window").height;
    const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * max_height;
    const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * min_height;
    const MAX_UPWARD_TRANSLATE_Y =
      BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
    const MAX_DOWNWARD_TRANSLATE_Y = 0;
    const DRAG_THRESHOLD = 50;

    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          animatedValue.setOffset(lastGestureDy.current);
        },
        onPanResponderMove: (e, gesture) => {
          animatedValue.setValue(gesture.dy);
        },
        onPanResponderRelease: (e, gesture) => {
          animatedValue.flattenOffset();
          lastGestureDy.current += gesture.dy;
          if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
          } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
          }
          if (gesture.dy > 0) {
            if (gesture.dy <= DRAG_THRESHOLD) {
              springAnimation("up");
            } else {
              springAnimation("down");
            }
          } else {
            if (gesture.dy >= -DRAG_THRESHOLD) {
              springAnimation("down");
            } else {
              springAnimation("up");
            }
          }
        },
      })
    ).current;

    const springAnimation = (direction) => {
      lastGestureDy.current =
        direction === "down"
          ? MAX_DOWNWARD_TRANSLATE_Y
          : MAX_UPWARD_TRANSLATE_Y;
      Animated.spring(animatedValue, {
        toValue: lastGestureDy.current,
        useNativeDriver: true,
      }).start();
    };

    const bottomSheetAnimation = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    useImperativeHandle(ref, () => ({
      springAnimation,
    }));

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            height: BOTTOM_SHEET_MAX_HEIGHT,
            bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
            ...Platform.select({
              android: { elevation: 3 },
              ios: {
                shadowColor: "#a8bed2",
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
              },
            }),
            backgroundColor: bg_color,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
          bottomSheetAnimation,
        ]}
      >
        <View
          style={{
            width: 200,
            height: BOTTOM_SHEET_MIN_HEIGHT,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              width: 100,
              height: 6,
              backgroundColor: "#d3d3d3",
              borderRadius: 10,
            }}
          />
        </View>
        {children}
      </Animated.View>
    );
  }
);

export default CustomDraggableBottomSheet;
