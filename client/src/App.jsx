import Navbar from "./components/Navbar";
import { UserContextProvider } from "./contexts/userContext";
import CustomRoutes from "./routes/CustomRoutes";

const App = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <CustomRoutes />
    </UserContextProvider>
  );
};

export default App;
