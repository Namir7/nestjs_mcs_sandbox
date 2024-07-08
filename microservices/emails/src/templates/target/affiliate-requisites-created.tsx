import { Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { partner } from "@preview";
import { Partner } from "common/types";

/*
   email_affiliate_create_requisites.html.twig
*/

type Props = {
  partner: Partner;
};

const link =
  "https://example.com/admin?crudAction=index&crudControllerFqcn=App%5CController%5CAdmin%5CAffiliate%5CRequisitesCrudController&menuIndex=23&signature=q1OoPTRqK7eg13X2Rj5Otv_6m_McWPKf-gX1eWuYFtk&submenuIndex=-1";

export const AffiliateRequisitesCreated = ({ partner }: Props) => (
  <CommonLayout
    preview={t("affiliateRequesitesCreated.preview")}
    titleText={t("affiliateRequesitesCreated.title")}
    buttonLink={link}
    buttonText={t("affiliateRequesitesCreated.buttonText")}
  >
    <Text style={text}>{t("common.partner") + " " + partner.user.email}</Text>
  </CommonLayout>
);

const text: React.CSSProperties = {
  textAlign: "center",
};

AffiliateRequisitesCreated.PreviewProps = {
  partner,
} as Props;

export default AffiliateRequisitesCreated;
