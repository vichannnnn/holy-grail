import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Title } from "../../components/Title/Title";
import { Text } from "../../components/Text/Text";
import { verifyAccount } from "../../utils/auth/VerifyAccount";
import { Link, useToast } from "@chakra-ui/react";
import { resendVerificationEmail } from "../../utils/auth/ResendVerificationEmail";

const VerifyAccountPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const location = useLocation();
  const toast = useToast();

  const parseQuery = (query: string): URLSearchParams => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const query = parseQuery(location.search);
    const token = query.get("token");
    setToken(token);

    if (token) {
      verifyAccount(token)
        .then(() => {
          setResetStatus(
            "Your account has been successfully verified. You can now upload resources."
          );
        })
        .catch(() => {
          setFailed(true);
        });
    } else {
      setFailed(true);
    }
  }, [location.search]);

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail();
      toast({
        title: "Verification email resent successfully.",
        description:
          "Please check your email for the verification mail sent to you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to resend verification email.",
        description: "An error occurred while sending.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Title mt="15%">Account Verification</Title>

      {resetStatus ? (
        <Text mt="10%" mb="15%">{resetStatus}</Text>
      ) : isFailed ? (
        <Text mt="10%" mb="15%">
          The account verification link is invalid or has expired. Please{" "}
          <Link onClick={handleResendVerificationEmail} textDecoration="underline">
            Click here.
          </Link>
        </Text>
      ) : null}
    </>
  );
};

export default VerifyAccountPage;