import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";
import { EmployeeContext } from "@/context/employee-context";
import { router } from "expo-router";

export default function AddEmployee() {
  const { employees, setEmployees } = useContext(EmployeeContext);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [deduction, setDeduction] = useState("");

  const handleAddEmployee = () => {
    if (!name || !id || !salary) {
      Alert.alert("Error", "Please fill required fields");
      return;
    }

    const baseSalary = parseFloat(salary);
    const bonusAmount = parseFloat(bonus) || 0;
    const deductionAmount = parseFloat(deduction) || 0;

    const netSalary = baseSalary + bonusAmount - deductionAmount;

    const newEmployee = {
      name,
      id,
      baseSalary,
      bonus: bonusAmount,
      deduction: deductionAmount,
      netSalary,
    };

    setEmployees([...employees, newEmployee]);

    router.push("/employee-list");

    setName("");
    setId("");
    setSalary("");
    setBonus("");
    setDeduction("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Employee</Text>

      <TextInput
        placeholder="Employee Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Employee ID"
        style={styles.input}
        value={id}
        onChangeText={setId}
      />

      <TextInput
        placeholder="Base Salary"
        style={styles.input}
        keyboardType="numeric"
        value={salary}
        onChangeText={setSalary}
      />

      <TextInput
        placeholder="Bonus"
        style={styles.input}
        keyboardType="numeric"
        value={bonus}
        onChangeText={setBonus}
      />

      <TextInput
        placeholder="Deduction"
        style={styles.input}
        keyboardType="numeric"
        value={deduction}
        onChangeText={setDeduction}
      />

      <Button title="Add Employee" onPress={handleAddEmployee} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});