import Home from "./pages/Home";
import "./styles/theme.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-app-theme min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Home />
    </div>
  );
}

export default App;