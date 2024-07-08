import { t } from "@lang";
import { Section, Text } from "@react-email/components";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { Requisite, School } from "common/types";
import { school, requisites } from "@preview";

type Props = {
  school: School;
  requisites: Requisite[];
};

/*
   school_withrdaw_request.html.twig
*/

export const SchoolWithdrawRequest = ({ school, requisites }: Props) => (
  <CommonLayout
    preview={t("schoolWithdrawRequest.preview")}
    titleText={t("schoolWithdrawRequest.title", {
      name: school.name,
      slug: school.slug,
    })}
  >
    <Section style={section}>
      {requisites.map(({ code, value }) => (
        <Text>{`${code}: ${value}`}</Text>
      ))}
    </Section>
  </CommonLayout>
);

const section: React.CSSProperties = {
  textAlign: "center",
};

SchoolWithdrawRequest.PreviewProps = {
  school,
  requisites,
};

export default SchoolWithdrawRequest;
