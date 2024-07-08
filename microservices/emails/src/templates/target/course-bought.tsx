import { Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";

type Props = {
  school: {
    domain: string;
  };
  course: {
    id: string;
  };
};

/*
  course_student_bought.html.twig
*/

export const CourseBought = ({ school, course }: Props) => (
  <CommonLayout
    preview={t("courseBought.preview")}
    titleText={t("courseBought.title")}
    buttonLink={`https://${school.domain}/course/${course.id}`}
    buttonText={t("courseBought.buttonText")}
  >
    <Text style={text}>{t("courseBought.text")}</Text>
  </CommonLayout>
);

const text: React.CSSProperties = {
  marginBottom: "30px",

  textAlign: "center",
};

CourseBought.PreviewProps = {
  school: {
    domain: "example.com",
  },
  course: {
    id: "00000000-0000-0000-0000-000000000000",
  },
} as Props;

export default CourseBought;
