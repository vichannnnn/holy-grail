import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./features/NavBar/NavBar";
import LoginPage from "./features/SignIn/LoginPage";
import LandingPage from "./features/Landing/LandingPage";
import Library from "./features/Library/Library";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./features/Footer/Footer";
import SignUpPage from "./features/SignUp/SignUpPage";
import UploadPage from "./features/Upload/UploadPage";
import { AuthProvider } from "./providers/AuthProvider";
import ApprovalPage from "./features/Approval/ApprovalPage";
import NotFound from "./features/Common/NotFound";
import DeveloperPage from "./features/Developer/DeveloperPage";

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
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
