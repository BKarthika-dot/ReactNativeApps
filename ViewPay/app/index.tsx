import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Index() {
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
      <Stack.Screen options={{ title: "ViewPay" }} />

      <View style={styles.container}>

        {/* Animated Background Logo */}
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
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, opacity: 0.08 }}
          />
        </Animated.View>

        {/* Foreground Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to ViewPay</Text>
            <Text style={styles.subtitle}>
              Smart • Secure • Seamless Payments
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Available Balance</Text>
            <Text style={styles.balance}>$ 85,000,000</Text>
          </View>

          <View style={styles.actions}>
            <ActionButton title="Add Bonus" />
            <ActionButton title="Add Deduction" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why Choose ViewPay?</Text>

            <Feature
              text="🔐 Secure Payment Information"
            />
            <Feature
              text="⚡ Employee Record Maintenance"
            />
            <Feature
              text="📊 Real-time Transaction Tracking"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

function ActionButton({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureText}>{text}</Text>
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

  header: {
    marginTop: 80,
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#4f46e5",
    padding: 20,
    borderRadius: 20,
  },

  cardLabel: {
    color: "#c7d2fe",
  },

  balance: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
  },

  buttonText: {
    fontWeight: "600",
  },

  section: {
    marginTop: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  feature: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  featureText: {
    fontSize: 14,
  },
});