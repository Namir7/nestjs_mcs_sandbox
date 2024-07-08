import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";

/*
   user_password_recovery.html.twig
*/

type Props = {
  password: string;
};

export const UserPasswordRecovered = ({ password }: Props) => (
  <CommonLayout
    preview={t("userPasswordRecovered.preview")}
    titleText={t("userPasswordRecovered.title")}
  >
    <Section style={section}>
      <Text>{t("userPasswordRecovered.text", { password })}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

UserPasswordRecovered.PreviewProps = {
  password: 'qwerty123'
} as Props;

export default UserPasswordRecovered;
