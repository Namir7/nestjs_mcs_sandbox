import { t } from "@lang";
import { school } from "@preview";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { School } from "common/types";

type Props = {
  school: School;
};

/*
   unread_messages_yet.html.twig
*/

export const MessagesUnread = ({ school }: Props) => (
  <CommonLayout
    preview={t("messagesUnread.preview")}
    titleText={t("messagesUnread.title")}
    buttonLink={`https://${school.domain}`}
    buttonText={t("messagesUnread.buttonText")}
  >
    <Section style={section}>
      <Text>{t("messagesUnread.text")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

MessagesUnread.PreviewProps = {
  school,
} as Props;

export default MessagesUnread;
