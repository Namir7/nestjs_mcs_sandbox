import { t } from "@lang";
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
  Button,
  Column,
  Row,
} from "@react-email/components";
import * as React from "react";
import { getParam } from "services/config";

/*
   email_affiliate_partner_register.html.twig
*/

const link = getParam("SKUFSPACE_URL") + "/referral";
const withStatic = (path: string) => getParam("STATIC_URL") + path;

export const AffiliateJoined = () => (
  <Html>
    <Head>
      <Preview>{t("affiliateJoined.preview")}</Preview>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Tailwind>
      <Body className="bg-[#efefef] py-7">
        <Container className="max-w-[600px] bg-white rounded mb-[30px]">
          <Section>
            <Img
              className="rounded-t-md"
              src={"/static/images/affiliate.jpg"}
              width="600px"
              height="265px"
            />
          </Section>
          <Section className=" pt-7 px-7 text-center mb-8">
            <Text className="text-[#4d5766] font-bold text-2xl mb-7">
              {t("affiliateJoined.title1")}
            </Text>
            <Text className="text-[#444444] mb-11">
              {t("affiliateJoined.text")}
            </Text>
            <Button
              className="bg-[#17b198] text-white px-7 py-3.5 rounded-md font-bold"
              href={link}
            >
              {t("affiliateJoined.buttonText")}
            </Button>
          </Section>
          <Section className="px-8 mb-8">
            <Row>
              <Column>
                <Text className="text-[#4d5766] font-bold text-2xl mb-7 text-center">
                  {t("affiliateJoined.title2")}
                </Text>
              </Column>
            </Row>
            {[
              {
                image: "/static/icons/money-0.svg",
                imageWith: "50px",
                imageHeight: "45px",
                title: t("affiliateJoined.benefitsSection.text1"),
                text: t("affiliateJoined.benefitsSection.subtext1"),
              },
              {
                image: "/static/icons/money-1.svg",
                imageWith: "50px",
                imageHeight: "50px",
                title: t("affiliateJoined.benefitsSection.text2"),
                text: t("affiliateJoined.benefitsSection.subtext2"),
              },
              {
                image: "/static/icons/refresh.svg",
                imageWith: "50px",
                imageHeight: "50px",
                title: t("affiliateJoined.benefitsSection.text3"),
                text: t("affiliateJoined.benefitsSection.subtext3"),
              },
              {
                image: "/static/icons/wallet.svg",
                imageWith: "50px",
                imageHeight: "50px",
                title: t("affiliateJoined.benefitsSection.text4"),
                text: t("affiliateJoined.benefitsSection.subtext4"),
              },
            ].map(({ image, imageHeight, imageWith, title, text }, index) => (
              <Row className="flex items-center mb-8" key={index}>
                <Column className="mr-5">
                  <Img
                    className="mr-5"
                    src={withStatic(image)}
                    width={imageHeight}
                    height={imageWith}
                  />
                </Column>
                <Column>
                  <Row className="my-0">
                    <Column>
                      <Text className="my-0">{title}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Text className="my-0 text-[#717985]">{text}</Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            ))}
          </Section>
          <Section className="px-8 mb-8">
            <Row>
              <Column>
                <Text className="text-[#4d5766] font-bold text-2xl mb-7 text-center">
                  {t("affiliateJoined.title3")}
                </Text>
              </Column>
            </Row>
            {[
              {
                title: t("affiliateJoined.maximumSection.text1"),
                text: t("affiliateJoined.maximumSection.subtext1"),
              },
              {
                title: t("affiliateJoined.maximumSection.text2"),
                text: t("affiliateJoined.maximumSection.subtext2"),
              },
              {
                title: t("affiliateJoined.maximumSection.text3"),
                text: t("affiliateJoined.maximumSection.subtext3"),
              },
              {
                title: t("affiliateJoined.maximumSection.text4"),
                text: t("affiliateJoined.maximumSection.subtext4"),
              },
              {
                title: t("affiliateJoined.maximumSection.text5"),
                text: t("affiliateJoined.maximumSection.subtext5"),
              },
            ].map(({ title, text }, index) => (
              <Row className="flex items-center mb-8">
                <Column className="mr-5">
                  <Img
                    className="mr-5"
                    src={withStatic(`/static/icons/${index + 1}.svg`)}
                    width="50px"
                    height="50px"
                  />
                </Column>
                <Column>
                  <Row className="my-0">
                    <Column>
                      <Text className="my-0">{title}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Text className="my-0 text-[#717985]">{text}</Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            ))}
          </Section>
          <Section className="pb-[60px] px-7 text-center mb-8">
            <Button
              className="bg-[#17b198] text-white px-7 py-3.5 rounded-md font-bold"
              href={link}
            >
              {t("affiliateJoined.buttonText")}
            </Button>
          </Section>
        </Container>
        <Container className="max-w-[450px]">
          <Text className="text-center text-[#222222]">
            {t("affiliateJoined.footerText")}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default AffiliateJoined;
