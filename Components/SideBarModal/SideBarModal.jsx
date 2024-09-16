import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const SideBarModal = ({
  children,
  isOpen,
  handleClose,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const translateX = useSharedValue(-1000);
  const isVisibleRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      translateX.value = withTiming(0, { duration: 300 });
    } else {
      translateX.value = withTiming(-1000, { duration: 300 }, () => {
        runOnJS(setIsVisible)(false);
      });
    }
    isVisibleRef.current = isOpen;
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        handleClose();
      }}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modalContent, animatedStyle]}>
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "white",
    padding: 20,
  },
});

export default SideBarModal;
