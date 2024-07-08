import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";

type Props = {
  name: string;
  startAt: Date;
  link: string;

  role: "student" | "employee";
};

/*
   webinar_student_notify.html.twig
   webinar_employee_notify.html.twig
*/

const text = (role: string) => {
  switch (role) {
    case "employee":
      return t("webinarComing.textEmployee");
    case "student":
      return t("webinarComing.textStudent");
  }
};

export const WebinarComing = ({ startAt, name, link, role }: Props) => {
  const startAtDate = `${startAt.getDate()}.${startAt.getMonth()}.${startAt.getFullYear()}`;
  const startAtTime = `${startAt.getHours()}.${startAt.getMinutes()}`;

  return (
    <CommonLayout
      preview={t("webinarComing.preview")}
      titleText={t("webinarComing.title", { name, startAtDate, startAtTime })}
      buttonLink={link}
      buttonText={t("webinarComing.buttonText")}
    >
      <Section style={{ textAlign: "center" }}>
        <Text>{text(role)}</Text>
      </Section>
    </CommonLayout>
  );
};

WebinarComing.PreviewProps = {
  name: "Grafity",
  link: "https://example.com",
  startAt: new Date(),

  role: "student",
} as Props;

export default WebinarComing;
