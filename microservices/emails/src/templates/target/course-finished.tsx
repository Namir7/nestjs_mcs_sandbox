import { t } from "@lang";
import { Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "../common/common-layout";
import { Course, School } from "common/types";
import { courses, school } from "@preview";

type Props = {
  school: School;
  courses: Course[];
};

/*
  course_finished_teacher_notify.html.twig
*/

export const CourseFinished = ({ school, courses }: Props) => (
  <CommonLayout
    preview={t("courseFinished.preview")}
    titleText={t("courseFinished.title")}
    buttonLink={`https://${school.domain}/students`}
    buttonText={t("courseFinished.buttonText")}
  >
    <Section style={coursesSection}>
      {courses.map(({ name, students }) => (
        <>
          <Heading style={courseTitle} as="h2">
            {t("common.course") + ` «${name}»`}
          </Heading>
          {students.map((student) => (
            <Text style={studentRow}>
              {student.name} — <Link href="student.email">{student.email}</Link>
            </Text>
          ))}
        </>
      ))}
    </Section>
  </CommonLayout>
);

const coursesSection: React.CSSProperties = {
  marginBottom: "20px",
};

const courseTitle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "16px",
};

const studentRow: React.CSSProperties = {
  marginTop: "0px",

  textAlign: "center",
  fontSize: "16px",
};

CourseFinished.PreviewProps = {
  school,
  courses,
} as Props;

export default CourseFinished;
