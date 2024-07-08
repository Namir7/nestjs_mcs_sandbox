import { Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { Plan, School } from "common/types";
import { school, plan } from "@preview";

/*
   payment_school_plan.html.twig
*/

type Props = {
  school: School;
  plan: Plan;
};

export const TariffPuchased = ({ plan, school }: Props) => (
  <CommonLayout
    preview={t("tariffPurchased.preview")}
    titleText={t("tariffPurchased.title", { tariff: plan.name })}
    buttonLink={`https://${school.domain}`}
    buttonText={t("tariffPurchased.buttonText")}
  >
    <Section>
      <Text style={{ textAlign: "center" }}>
        {t("tariffPurchased.text", {
          date: `${plan.endAt.getDate()}.${plan.endAt.getMonth()}.${plan.endAt.getFullYear()}`,
        })}
      </Text>
    </Section>
  </CommonLayout>
);

TariffPuchased.PreviewProps = {
  plan,
  school,
} as Props;

export default TariffPuchased;
