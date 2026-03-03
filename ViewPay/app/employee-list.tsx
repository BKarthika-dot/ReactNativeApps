import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { EmployeeContext } from "@/context/employee-context";

const { height } = Dimensions.get("window");

export default function EmployeeList() {
  const { employees } = useContext(EmployeeContext);
  const [search, setSearch] = useState("");

  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredEmployees = employees.filter((emp: any) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const ITEM_HEIGHT = 70;

  const renderItem = ({ item, index }: any) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1.05, 1],
      extrapolate: "clamp",
    });

    const backgroundColor = scrollY.interpolate({
      inputRange,
      outputRange: ["#ffffff", "#e0f2fe", "#ffffff"],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.row,
          {
            height: ITEM_HEIGHT,
            transform: [{ scale }],
            backgroundColor,
          },
        ]}
      >
        <Text style={[styles.cell, styles.name]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>${item.baseSalary.toFixed(0)}</Text>
        <Text style={styles.cell}>${item.bonus.toFixed(0)}</Text>
        <Text style={styles.cell}>${item.netSalary.toFixed(0)}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>

      <TextInput
        placeholder="Search by name..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {filteredEmployees.length === 0 ? (
        <Text style={styles.noResult}>No employees found.</Text>
      ) : (
        <>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.name]}>Name</Text>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Salary</Text>
            <Text style={styles.headerCell}>Bonus</Text>
            <Text style={styles.headerCell}>Net</Text>
          </View>

          <Animated.FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 1,
  },
  cell: {
    flex: 1,
    fontSize: 13,
  },
  name: {
    flex: 1.4,
  },
  noResult: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});