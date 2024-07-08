import { Emails } from '@skufspace/lib';
import { NotificationActions } from 'src/notifications/enums/notification-actions.enum';

export const NotificationsActionsToEmailsMap = {
  [NotificationActions.AFFIILIATE_GOLD_STATUS_REACHED]: Emails.AFFILIATE_JOINED,

  [NotificationActions.COURSES_WEBINAR_COMING]: Emails.WEBINAR_COMING,

  [NotificationActions.HOMEWORKS_STUDENT_SENT]: Emails.HOMEWORK_ANSWER_SENT,
  [NotificationActions.HOMEWORKS_TUTOR_SENT]: Emails.HOMEWORK_REVIEWED,

  /* ... */
};
