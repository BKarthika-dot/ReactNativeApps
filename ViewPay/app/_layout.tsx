import { Tabs } from "expo-router";
import { EmployeeProvider } from "@/context/employee-context";

export default function Layout() {
  return (
    <EmployeeProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "#2563eb",
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="employee-list" options={{ title: "Employee List" }} />
        <Tabs.Screen name="add-employee" options={{ title: "Add Employee" }} />
        <Tabs.Screen name="bonus-policy" options={{ title: "Bonus Policy" }} />
      </Tabs>
    </EmployeeProvider>
  );
}