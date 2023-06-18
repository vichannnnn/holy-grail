import { useState, useContext, FormEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { Title } from "../../components/Title/Title";
import { Text } from "../../components/Text/Text";
import { AccountForm } from "../../components/AccountForm/AccountForm";
import "./login.css"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      toast({
        title: "Logged in successfully.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <section className="login section container" id="login">
      <AccountForm>
        <div className="login__title">Log in</div>
        <div className="section__subtitle">Enter your credentials to access your account.</div>

        <form className="login__fields" onSubmit={handleLogin}>
          <VStack spacing="6">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="100%">
              Log In
            </Button>
          </VStack>
        </form>
        <Box>
          <div className="login__footer">
            Forgot your password?{" "}
            <Link
                as="button"
                onClick={handleForgotPassword}
                textDecoration="underline"
            >
              Click here.
            </Link>
          </div>
          <div className="login__footer">
            Not a member?{" "}
            <Link
              as="button"
              onClick={handleRegister}
              textDecoration="underline"
            >
              Register now.
            </Link>
          </div>
        </Box>
      </AccountForm>
    </section>
  );
};

export default LoginPage;
