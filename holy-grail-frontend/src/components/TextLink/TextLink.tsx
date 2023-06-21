import { Typography, TypographyProps } from "@mui/material";
import { Text } from "../Text/Text";

type TextLinkProps = TypographyProps & {
  children: string;
};

export const TextLink = ({ children, ...props }: TextLinkProps) => {
  return (
    <Typography sx={{ cursor: "pointer" }} {...props}>
      {children}
    </Typography>
  );
};
