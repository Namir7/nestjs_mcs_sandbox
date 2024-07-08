import { t } from "@lang";
import { school } from "@preview";
import { Column, Row, Section, Text } from "@react-email/components";
import { School } from "common/types";
import * as React from "react";
import {
  CommonButton,
  CommonButtonAltered,
} from "templates/common/common-button";
import { CommonLayout } from "templates/common/common-layout";

type Props = {
  school: School;
  token: string;
};

/*
   user_register.html.twig
 */

const supportLink =
  "https://example.com/tpost/ntc81sly91-problema-ne-poluchaetsya-voiti-v-akkaunt";

export const UserRegistered = ({ school, token }: Props) => (
  <CommonLayout
    preview={t("userRegistered.preview")}
    titleText={t("userRegistered.title")}
  >
    <Section style={section}>
      <Text>{t("userRegistered.text")}</Text>
    </Section>
    <Section>
      <Row style={loginButtonRow}>
        <Column align="center">
          <CommonButton
            link={`https://${school.domain}}` + `?registerToken=${token}`}
            text={t("userRegistered.buttonLogin")}
          />
        </Column>
      </Row>
      <Row>
        <Column align="center">
          <CommonButtonAltered
            text={t("userRegistered.buttonSupport")}
            link={supportLink}
          />
        </Column>
      </Row>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

const loginButtonRow = {
  marginBottom: "20px",
};

UserRegistered.PreviewProps = {
  school,
  token: "token#203i20",
} as Props;

export default UserRegistered;
