import React, { useState, useRef, useEffect } from "react";
import { View, Animated } from "react-native";

const Accordion = ({ children, expanded, setExpanded }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    if (!expanded) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      
    } else {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    toggleAccordion();
  }, [expanded]);

  return (
    <Animated.View
      style={[
        {
          overflow: "hidden",
          height: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          }),
        },
      ]}
    >
      <View
        style={{
          position: "absolute",
        }}
        onLayout={(event) => {
          if (contentHeight === 0) {
            const height = event.nativeEvent.layout.height;
            setContentHeight(height);
          }
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default Accordion;
