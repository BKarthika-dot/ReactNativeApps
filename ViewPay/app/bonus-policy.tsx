import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function BonusPolicy() {
  const position = useRef(new Animated.ValueXY({ x: 50, y: 50 })).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const velocity = useRef({ x: 3, y: 4 }).current;

  const IMAGE_SIZE = 120;

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      position.setValue({
        x: position.x._value + velocity.x,
        y: position.y._value + velocity.y,
      });

      if (position.x._value <= 0 || position.x._value >= width - IMAGE_SIZE) {
        velocity.x *= -1;
      }

      if (position.y._value <= 0 || position.y._value >= height - IMAGE_SIZE) {
        velocity.y *= -1;
      }

      rotation.setValue(rotation._value + 2);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      <Stack.Screen options={{ title: "Bonus Policy" }} />

      <View style={styles.container}>

        {/* Animated Background */}
        <Animated.View
          style={[
            styles.animatedLogo,
            {
              transform: [
                ...position.getTranslateTransform(),
                { rotate: rotateInterpolate },
              ],
            },
          ]}
        >
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, opacity: 0.06 }}
          />
        </Animated.View>

        {/* Policy Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.title}>Employee Bonus Policy</Text>
          <Text style={styles.subtitle}>
            Effective from April 2026
          </Text>

          <Section
            heading="1. Eligibility"
            text="All full-time employees who have completed a minimum of 12 months of continuous service are eligible for the annual performance bonus."
          />

          <Section
            heading="2. Performance Criteria"
            text="Bonuses are awarded based on individual performance ratings, team contribution, project impact, and overall company profitability."
          />

          <Section
            heading="3. Bonus Structure"
            text="The annual bonus ranges from 5% to 20% of the employee's base salary depending on performance category and department allocation."
          />

          <Section
            heading="4. Payment Timeline"
            text="Approved bonuses will be credited along with the April payroll cycle following the financial year closing."
          />

          <Section
            heading="5. Management Discretion"
            text="The management reserves the right to adjust bonus percentages based on company performance, compliance factors, and extraordinary circumstances."
          />
        </ScrollView>
      </View>
    </>
  );
}

function Section({ heading, text }: { heading: string; text: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    paddingHorizontal: 20,
  },

  animatedLogo: {
    position: "absolute",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 80,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    marginTop: 6,
  },

  section: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    elevation: 2,
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
});