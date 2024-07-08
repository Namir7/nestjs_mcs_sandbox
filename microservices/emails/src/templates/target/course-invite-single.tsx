import { Column, Row, Section, Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import {
  CommonButton,
  CommonButtonAltered,
} from "templates/common/common-button";
import { CommonLayout } from "templates/common/common-layout";

type Props = {
  registed: boolean;
  course: {
    id: string;
    name: string;
  };
  school: {
    domain: string;
  };
};

const supportLink =
  "https://example.com/tpost/ntc81sly91-problema-ne-poluchaetsya-voiti-v-akkaunt";

/*
   course_student_invite.html.twig
*/

export const CourseInviteSingle = ({ school, course }: Props) => (
  <CommonLayout
    preview={t("courseInviteSingle.preview")}
    titleText={t("courseInviteSingle.title")}
  >
    <Section style={contentSection}>
      <Text style={text}>
        {t("courseInviteSingle.text", { course: course.name })}
      </Text>
      <Text style={text}>{t("courseInviteSingle.subText")}</Text>
    </Section>
    <Section>
      <Row style={loginButtonRow}>
        <Column align="center">
          <CommonButton
            link={`https://${school.domain}/course/${course.id}`}
            text={t("courseInviteSingle.buttonLogin")}
          />
        </Column>
      </Row>
      <Row>
        <Column align="center">
          <CommonButtonAltered
            text={t("courseInviteSingle.buttonSupport")}
            link={supportLink}
          />
        </Column>
      </Row>
    </Section>
  </CommonLayout>
);

const text: React.CSSProperties = {
  textAlign: "center",
  margin: "0px",
};

const contentSection = {
  marginBottom: "20px",
};

const loginButtonRow = {
  marginBottom: "20px",
};

CourseInviteSingle.PreviewProps = {
  registed: true,
  school: {
    domain: "example.com",
  },
  course: {
    name: "Street art",
  },
} as Props;

export default CourseInviteSingle;
