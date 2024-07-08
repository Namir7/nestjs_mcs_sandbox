import { Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { School } from "common/types";
import { school } from "@preview";

/*
   notify_school_before_charge_plan.html.twig
*/

type Props = {
  school: School;
  plan: {
    name: string;
    endAt: Date;
  };
};

export const TariffBeforeChange = ({ plan, school }: Props) => (
  <CommonLayout
    preview={t("tariffBeforeChange.preview")}
    titleText={t("tariffBeforeChange.title")}
    buttonLink={`https://${school.domain}`}
    buttonText={t("tariffBeforeChange.buttonText")}
  >
    <Section style={{ marginBottom: "30px" }}>
      <Text style={{ textAlign: "center" }}>
        {t("tariffBeforeChange.text", {
          plan: plan.name,
          endTime: `${plan.endAt.getHours()}.${plan.endAt.getMinutes()}`,
          endDate: `${plan.endAt.getDate()}.${plan.endAt.getMonth()}.${plan.endAt.getFullYear()}`,
        })}
      </Text>
    </Section>
  </CommonLayout>
);

TariffBeforeChange.PreviewProps = {
  plan: {
    name: "Stnadart",
    endAt: new Date(),
  },
  school,
} as Props;

export default TariffBeforeChange;
