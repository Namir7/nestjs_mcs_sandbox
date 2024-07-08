import { Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { School } from "common/types";
import { school } from "@preview";

type Props = {
  school: School;
  link: string;
};

/*
   user_change_email.html.twig
*/

export const UserEmailChange = ({ school, link }: Props) => (
  <CommonLayout
    preview={t("userEmailChange.preview")}
    titleText={t("userEmailChange.title")}
    buttonLink={`https://${school.domain}` + link}
    buttonText={t("userEmailChange.buttonText")}
  >
    <Section style={section}>
      <Text>{t("userEmailChange.text")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

UserEmailChange.PreviewProps = {
  school,
  link: "?change-pass=#293e3",
} as Props;

export default UserEmailChange;
