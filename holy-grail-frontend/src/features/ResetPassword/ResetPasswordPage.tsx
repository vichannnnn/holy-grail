import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Title } from "../../components/Title/Title";
import { Text } from "../../components/Text/Text";
import { resetPassword } from "../../utils/auth/ResetPassword";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const parseQuery = (query: string): URLSearchParams => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const query = parseQuery(location.search);
    const token = query.get("token");
    setToken(token);

    if (token) {
      resetPassword(token)
        .then(() => {
          setResetStatus(
            "Your password reset is successful. Please check your email for the new password sent to you."
          );
        })
        .catch(() => {
          setFailed(true);
        });
    } else {
      setFailed(true);
    }
  }, [location.search]);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <Title mt="15%">Reset Password</Title>

      {resetStatus ? (
        <Text mt="10%" mb="15%">{resetStatus}</Text>
      ) : isFailed ? (
        <Text mt="10%" mb="15%">
          The password reset link is invalid or has expired. Please click{" "}
          <Link onClick={handleForgotPassword} textDecoration="underline">
            here
          </Link>
          {" "}
          to reset your password again.
        </Text>
      ) : null}
    </>
  );
};

export default ResetPasswordPage;
