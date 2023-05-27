import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./features/Common/NavBar";
import LoginPage from "./features/SignIn/LoginPage";
import LandingPage from "./features/Landing/LandingPage";
import Library from "./features/Library/Library";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./features/Common/Footer";
import SignUpPage from "./features/SignUp/SignUpPage";
import UploadPage from "./features/Upload/UploadPage";
import { AuthProvider } from "./providers/AuthProvider";
import ApprovalPage from "./features/Approval/ApprovalPage";

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
