import { school } from "@preview";
import { Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { School } from "common/types";

type Props = {
  school: School;
};

/*
   school_register.html.twig
*/

export const SchoolRegistered = ({ school }: Props) => (
  <CommonLayout
    preview={t("schoolRegistered.preview")}
    titleText={t("schoolRegistered.title")}
    buttonLink={`https://${school.domain}`}
    buttonText={t("schoolRegistered.buttonText")}
  >
    <Section style={section}>
      <Text>1. {t("schoolRegistered.textStep1")}</Text>
      <Text>2. {t("schoolRegistered.textStep2")}</Text>
      <Text>3. {t("schoolRegistered.textStep3")}</Text>
      <Text>4. {t("schoolRegistered.textStep4")}</Text>
      <Text>5. {t("schoolRegistered.textStep5")}</Text>
      <Text>5. {t("schoolRegistered.textEnding")}</Text>
    </Section>
  </CommonLayout>
);

SchoolRegistered.PreviewProps = {
  school,
} as Props;

const section: React.CSSProperties = {
  textAlign: "center",
};

export default SchoolRegistered;
