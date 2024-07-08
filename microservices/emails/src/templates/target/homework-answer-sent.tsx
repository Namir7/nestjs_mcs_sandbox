import { t } from "@lang";
import { school } from "@preview";
import { Section, Text } from "@react-email/components";
import { School } from "common/types";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";

/*
   student_sent_homework_answer.html.twig
*/

type Props = {
  school: School;
};

export const HomeworkAnswerSent = ({ school }: Props) => (
  <CommonLayout
    preview={t("homeworkAnswerSent.preview")}
    titleText={t("homeworkAnswerSent.title")}
    buttonLink={`https://${school.domain}`}
    buttonText={t("homeworkAnswerSent.buttonText")}
  >
    <Section style={section}>
      <Text>{t("homeworkAnswerSent.text")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

HomeworkAnswerSent.PreviewProps = {
  school,
} as Props;

export default HomeworkAnswerSent;
