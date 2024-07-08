import { School } from "common/types";
import { school } from "@preview";
import { CommonLayout } from "templates/common/common-layout";
import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";

type Props = {
  school: School;
  registered: boolean;
  token?: string;
};

/*
   school_user_invite.html.twig
   school_user_invite_and_register.html.twig
*/

export const SchoolGotAccess = ({ school, registered, token }: Props) => (
  <CommonLayout
    preview={t("schoolGotAccess.preview")}
    titleText={`«${school.name}»`}
    buttonLink={
      `https://${school.domain}` +
      (!registered ? "" : `?registerToken=${token}`)
    }
    buttonText={t("schoolGotAccess.buttonText")}
  >
    <Section style={section}>
      <Text>{t("schoolGotAccess.text")}</Text>
      {!registered && <Text>{t("schoolGotAccess.subText")}</Text>}
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

SchoolGotAccess.PreviewProps = {
  school,
  registered: true,
} as Props;

export default SchoolGotAccess;
