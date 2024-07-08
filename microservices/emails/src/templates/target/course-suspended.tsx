import { course, school } from "@preview";
import { Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { Course, School } from "common/types";

type Props = {
  course: Course;
  school: School;
};

/*
   course_student_remove.html.twig
*/

export const CourseSuspended = ({ school, course }: Props) => (
  <CommonLayout
    preview={t("courseSuspended.preview")}
    titleText={t("courseSuspended.title", { course: course.name })}
  >
    <Section style={section}>
      <Text>
        {t("courseSuspended.text", {
          course: course.name,
          school: school.name,
        })}
      </Text>
      <Text style={section}>{t("courseSuspended.subText")}</Text>
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

CourseSuspended.PreviewProps = {
  course,
  school,
} as Props;

export default CourseSuspended;
