import * as React from "react";
import { Course, School } from "common/types";
import { course, school } from "@preview";
import { CommonLayout } from "templates/common/common-layout";
import { t } from "@lang";
import { Section, Text } from "@react-email/components";

/*
   payment_student_course.html.twig 
*/

type Props = {
  course: Course;
  school: School;
};

export const CoursePurchased = ({ course, school }: Props) => (
  <CommonLayout
    preview={t("coursePurchased.preview")}
    titleText={t("coursePurchased.title", { course: course.name })}
    buttonLink={`https://${school.domain}/course/${course.id}`}
    buttonText={t("coursePurchased.buttonText")}
  >
    <Section>
      <Text style={{ textAlign: "center" }}>{t("coursePurchased.text")}</Text>
    </Section>
  </CommonLayout>
);

CoursePurchased.PreviewProps = {
  course,
  school,
} as Props;

export default CoursePurchased;
