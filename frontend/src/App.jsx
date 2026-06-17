import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

export default App;