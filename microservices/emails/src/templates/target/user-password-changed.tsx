import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";

/*
   user_password_change.html.twig
*/

export const UserPasswordChanged = () => (
  <CommonLayout
    preview={t("userPasswordChanged.preview")}
    titleText={t("userPasswordChanged.title")}
  >
    <Section style={section}>
      <Text>{t("userPasswordChanged.text")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

export default UserPasswordChanged;
