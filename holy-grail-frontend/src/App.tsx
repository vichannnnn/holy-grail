import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./features/NavBar";
import LoginPage from "./features/LoginPage";
import LandingPage from "./features/LandingPage";
import Library from "./features/Library";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./features/Footer";
import SignUpPage from "./features/SignUpPage";
import UploadPage from "./components/LibraryContent/UploadPage";
import { AuthProvider } from "./providers/AuthProvider";
import ApprovalPage from "./features/ApprovalPage";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/admin" element={<ApprovalPage />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
