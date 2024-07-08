import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Row,
  Column,
  Link,
  Heading,
  Section,
} from "@react-email/components";
import * as React from "react";
import { t } from "@lang";
import { CommonButton } from "./common-button";

type Props = {
  preview: string;
  children: React.ReactNode;
  titleText?: string;
  buttonText?: string;
  buttonLink?: string;
};

const telegram =
  process.env.TELEGRAM_USER_SUPPORT_BOT || "SkufspacespaceSupportBot";

export const CommonLayout: React.FC<Props> = ({
  children,
  preview,
  titleText,
  buttonLink,
  buttonText,
}) => (
  <Html>
    <Head>
      <Preview>{preview}</Preview>
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
    <Body style={main}>
      <Container style={container}>
        <>
          {titleText && (
            <Heading style={title} as="h1">
              {titleText}
            </Heading>
          )}
          {children}
          {buttonLink && buttonText && (
            <Section style={buttonSection}>
              <Row>
                <Column align="center">
                  <CommonButton link={buttonLink} text={buttonText} />
                </Column>
              </Row>
            </Section>
          )}
        </>
      </Container>
      <Container>
        <Row>
          <Column align="center">
            <Link style={link} href={`https://t.me/${telegram}`}>
              {t("common.telegram", { tg: "@" + telegram })}
            </Link>
          </Column>
        </Row>
      </Container>
    </Body>
  </Html>
);

const main: React.CSSProperties = {
  paddingTop: "30px",
  paddingBottom: "35px",

  backgroundColor: "#f0f0f0",
  fontWeight: "normal",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  marginBottom: "30px",
  paddingTop: "35px",
  paddingBottom: "50px",
  paddingLeft: "30px",
  paddingRight: "30px",

  backgroundColor: "#ffffff",
  fontFamily: "Roboto, sans-serif",
  borderRadius: "8px",
  color: "#4d5766",
};

const buttonSection: React.CSSProperties = {
  marginTop: "30px",
};

const title: React.CSSProperties = {
  textAlign: "center",
  fontSize: "26px",
  fontWeight: "normal",
  lineHeight: "1.3",
  color: "#4d5766",
};

const link: React.CSSProperties = {
  margin: "0 auto",

  color: "#7E858F",
};
