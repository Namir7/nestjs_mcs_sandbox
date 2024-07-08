import * as React from "react";
import { user } from "@preview";
import { CommonLayout } from "templates/common/common-layout";
import { t } from "@lang";
import { Text } from "@react-email/components";

type Props = {
  email: string;
};

/*
   user_change_email_success.html.twig
*/

export const UserEmailChanged = ({ email }: Props) => (
  <CommonLayout
    preview={t("userEmailChanged.preview")}
    titleText={t("userEmailChanged.title")}
  >
    <Text style={text}>{t("userEmailChanged.text", { email })}</Text>
  </CommonLayout>
);

const text: React.CSSProperties = {
  textAlign: "center",
};

UserEmailChanged.PreviewProps = {
  email: user.email,
} as Props;

export default UserEmailChanged;
