import * as React from "react";
import { school, requisite } from "@preview";
import { Requisite, School } from "common/types";
import { CommonLayout } from "templates/common/common-layout";
import { t } from "@lang";
import { Text } from "@react-email/components";

/*
   school_append_requisite.html.twig
*/

type Props = {
  school: School;
  requisite: Requisite;
};

export const SchoolRequesitesAppended = ({ school, requisite }: Props) => (
  <CommonLayout preview={t("schoolRequesitesAppended.preview")}>
    <Text style={{ textAlign: "center" }}>
      {t("schoolRequesitesAppended.text", {
        school: school.name,
        requisiteId: requisite.id,
      })}
    </Text>
  </CommonLayout>
);

SchoolRequesitesAppended.PreviewProps = {
  school,
  requisite,
} as Props;

export default SchoolRequesitesAppended;
