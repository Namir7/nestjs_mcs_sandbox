import { Button } from "@react-email/components";
import * as React from "react";

type Props = {
  link: string;
  text: string;
};

export const CommonButton: React.FC<Props> = ({ link, text }) => (
  <Button style={common} href={link}>
    {text}
  </Button>
);

export const CommonButtonAltered: React.FC<Props> = ({ link, text }) => (
  <Button style={altered} href={link}>
    {text}
  </Button>
);

const common = {
  padding: "15px 30px",

  color: "#ffffff",
  backgroundColor: "#17B198",
  borderRadius: "8px",
};

const altered = {
  padding: "15px 30px",

  color: "#17B198",
  backgroundColor: "#17B1981c",
  borderRadius: "8px",
};
