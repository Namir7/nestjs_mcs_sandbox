import { Text } from "@react-email/components";
import { t } from "@lang";
import * as React from "react";
import { CommonLayout } from "templates/common/common-layout";
import { Partner } from "common/types";
import { partner } from "@preview";

/*
   email_affiliate_request_withdraw.html.twig
*/

type Props = {
  partner: Partner;
};

const link =
  "https://example.com/admin?crudAction=index&crudControllerFqcn=App%5CController%5CAdmin%5CAffiliate%5CRequisitesCrudController&menuIndex=23&signature=q1OoPTRqK7eg13X2Rj5Otv_6m_McWPKf-gX1eWuYFtk&submenuIndex=-1";

export const AffiliateWithdraw = ({ partner }: Props) => (
  <CommonLayout
    preview={t("affiliateWithdraw.preview")}
    titleText={t("affiliateWithdraw.title")}
    buttonLink={link}
    buttonText={t("affiliateWithdraw.buttonText")}
  >
    <Text style={text}>{`${t("affiliateWithdraw.text")} id: ${
      partner.user.id
    } email: ${partner.user.email}`}</Text>
  </CommonLayout>
);

const text: React.CSSProperties = {
  textAlign: "center",
};

AffiliateWithdraw.PreviewProps = {
  partner,
} as Props;

export default AffiliateWithdraw;
