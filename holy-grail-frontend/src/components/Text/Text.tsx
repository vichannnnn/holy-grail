import { Typography, TypographyProps } from "@mui/material";

export const Text = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      fontFamily="Trebuchet MS, sans-serif"
      color="black"
      fontSize={["sm", "md", "lg", "xl"]}
      {...props}
    >
      {children}
    </Typography>
  );
};
