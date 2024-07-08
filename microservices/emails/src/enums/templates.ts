import AffiliateJoined from "templates/target/affiliate-joined";
import AffiliateRequisitesCreated from "templates/target/affiliate-requisites-created";
import AffiliateWithdraw from "templates/target/affiliate-withdraw";
import CourseBought from "templates/target/course-bought";
import CourseFinished from "templates/target/course-finished";
import CourseInviteSingle from "templates/target/course-invite-single";
import CoursePurchased from "templates/target/course-purchased";
import CourseSuspended from "templates/target/course-suspended";
import HomeworkAnswerSent from "templates/target/homework-answer-sent";
import HomeworkReviewed from "templates/target/homework-reviewed";
import MessagesUnread from "templates/target/messages-unread";
import SchoolGotAccess from "templates/target/school-got-access";
import SchoolRegistered from "templates/target/school-registered";
import SchoolRequesitesAppended from "templates/target/school-requesites-appended";
import SchoolWithdrawRequest from "templates/target/school-withdraw-request";
import TariffBeforeChange from "templates/target/tariff-before-change";
import TariffExpires from "templates/target/tariff-expires";
import TariffPuchased from "templates/target/tariff-purchased";
import UserEmailChange from "templates/target/user-email-change";
import UserEmailChanged from "templates/target/user-email-changed";
import UserPasswordChanged from "templates/target/user-password-changed";
import UserPasswordRecovered from "templates/target/user-password-recovered";
import UserRegistered from "templates/target/user-registered";
import WebinarComing from "templates/target/webinar-coming";
import { Emails } from "./emails";

export const emailsToTemplatesMap: Record<Emails, any> = {
  [Emails.AFFILIATE_JOINED]: AffiliateJoined,
  [Emails.AFFILIATE_REQUISITES_CREATED]: AffiliateRequisitesCreated,
  [Emails.AFFILIATE_WITHDRAW]: AffiliateWithdraw,

  [Emails.COURSE_BOUGHT]: CourseBought,
  [Emails.COURSE_FINISHED]: CourseFinished,
  [Emails.COURSE_INVITE_SINGLE]: CourseInviteSingle,
  [Emails.COURSE_PURCHASED]: CoursePurchased,
  [Emails.COURSE_SUSPENDED]: CourseSuspended,

  [Emails.HOMEWORK_ANSWER_SENT]: HomeworkAnswerSent,
  [Emails.HOMEWORK_REVIEWED]: HomeworkReviewed,

  [Emails.MESSAGES_UNREAD]: MessagesUnread,

  [Emails.SCHOOL_GOT_ACCESS]: SchoolGotAccess,
  [Emails.SCHOOL_REGISTERED]: SchoolRegistered,
  [Emails.SCHOOL_REQUISITES_APPENDED]: SchoolRequesitesAppended,
  [Emails.SCHOOL_WITHDRAW_REQUEST]: SchoolWithdrawRequest,

  [Emails.TARIFF_BEFORE_CHANGE]: TariffBeforeChange,
  [Emails.TARIFF_EXPIRES]: TariffExpires,
  [Emails.TARIFF_PURCHASED]: TariffPuchased,

  [Emails.USER_EMAIL_CHANGE]: UserEmailChange,
  [Emails.USER_EMAIL_CHANGED]: UserEmailChanged,
  [Emails.USER_PASSWORD_CHANGED]: UserPasswordChanged,
  [Emails.USER_PASSWORD_RECOVERED]: UserPasswordRecovered,
  [Emails.USER_REGISTERED]: UserRegistered,

  [Emails.WEBINAR_COMING]: WebinarComing,
};
