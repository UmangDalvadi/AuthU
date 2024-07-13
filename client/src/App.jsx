import Navbar from "./components/Navbar";
import { useUserContext } from "./contexts/userContext";
import CustomRoutes from "./routes/CustomRoutes";

const App = () => {
  const { isLoading } = useUserContext();
  return (
    <>
      {isLoading ? (
        <div className="h-[80vh] w-full flex justify-center items-center">Loading...</div>
      ) : (
        <>
          <Navbar />
          <CustomRoutes />
        </>
      )}
    </>
  );
};

export default App;
