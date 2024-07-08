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
   teacher_sent_homework_answer.html.twig
   teacher_sent_homework_answer_cron.html.twig
*/

export const HomeworkReviewed = ({ school }: Props) => (
  <CommonLayout
    preview={t("homeworkReviewed.preview")}
    titleText={t("homeworkReviewed.title")}
    buttonLink={`https://${school.domain}`}
    buttonText={t("courseBought.buttonText")}
  >
    <Section style={section}>
      <Text>{t("homeworkReviewed.text")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

HomeworkReviewed.PreviewProps = {
  school,
} as Props;

export default HomeworkReviewed;
