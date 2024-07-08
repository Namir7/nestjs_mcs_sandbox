import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { School } from "common/types";
import { school } from "@preview";

type Props = {
  school: School;
  /*
   available values:
   7 - 7 days until expiration
   1 - 1 day until expiration
   0 - expired
   -1 - expired and blocked
   */
  expiresInDays: number;
};

const preview = (expiresInDays: number) =>
  expiresInDays > 0
    ? t("tariffExpires.previewExpires")
    : t("tariffExpires.previewExpired");

const title = (expiresInDays: number) => {
  switch (expiresInDays) {
    case 7:
      return t("tariffExpires.titleExpiresIn7days");
    case 1:
      return t("tariffExpires.titleExpiresIn1day");
    case 0:
      return t("tariffExpires.titleExpired");
    case -1:
      return t("tariffExpires.titleExpiredBlocked;");
    default:
      throw new Error('undefined "expiresInDays" prop');
  }
};

const text = (expiresInDays: number) => {
  switch (expiresInDays) {
    case 7:
      return t("tariffExpires.textExpiresIn7days");
    case 1:
      return t("tariffExpires.textExpiresIn1day");
    case 0:
      return t("tariffExpires.textExpired");
    case -1:
      return t("tariffExpires.textExpiredBlocked;");
    default:
      throw new Error('undefined "expiresInDays" prop');
  }
};

/*
   tariff_ends_7_days.html.twig   
   tariff_ends_1_day.html.twig
   tariff_end_after_7_day.html.twig
   tariff_end.html.twig
*/

export const TariffExpires = ({ expiresInDays, school }: Props) => {
  return (
    <CommonLayout
      preview={preview(expiresInDays)}
      titleText={title(expiresInDays)}
      buttonLink={`https://${school.domain}/plans`}
      buttonText={t("tariffExpires.buttonText")}
    >
      <Section style={section}>
        <Text>{text(expiresInDays)}</Text>
      </Section>
    </CommonLayout>
  );
};

const section: React.CSSProperties = {
  textAlign: "center",
};

TariffExpires.PreviewProps = {
  school,
  expiresInDays: 1,
} as Props;

export default TariffExpires;
