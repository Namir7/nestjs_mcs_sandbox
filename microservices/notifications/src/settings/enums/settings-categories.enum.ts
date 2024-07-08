import { NotificationActions } from 'src/notifications/enums/notification-actions.enum';

export enum SettingsCategories {
  BILLLING = 0,
  WEBINARS = 1,
  AFFILIATE = 2,

  /* ... */

  // BILLLING = 'BILLLING',
  // WEBINARS = 'STUDENT_WEBINARS',
  // AFFILIATE = 'STUDENT_AFFILIATE',
  // HOMEWORK_REVIEW_RECIEVED = 'HOMEWORK_REVIEW_RECIEVED',
  // STUDENT_WAITING_FOR_FEEDBACK = 'STUDENT_WAITING_FOR_FEEDBACK',
  // STUDENT_COMPLETED_COURSE = 'STUDENT_COMPLETED_COURSE',
  // GROUPS = 'GROUPS',
  // PROMO_EXPIRED = 'PROMO_EXPIRED',
  // HOMEWORK_FEEDBACK = 'HOMEWORK_FEEDBACK',
  // COURSE_UPDATE = 'COURSE_UPDATE',
}

export const SettingsCategoriesToActionsMap: Record<
  number,
  NotificationActions[]
> = {
  [SettingsCategories.BILLLING]: [
    NotificationActions.BILLING_STUDENT_PAID_FOR_COURSE,
    NotificationActions.BILLING_VERIFIED,
    NotificationActions.BILLING_NOT_VERIFIED,
    NotificationActions.BILLING_WITHDRAWAL_ACCEPTED,
    NotificationActions.BILLING_WITHDRAWAL_REJECTED,
    NotificationActions.BILLING_PAYMENT_FAILURE,
  ],
  [SettingsCategories.WEBINARS]: [
    NotificationActions.COURSES_WEBINAR_COMING,
    NotificationActions.COURSES_WEBINAR_STARTED,
  ],
  [SettingsCategories.AFFILIATE]: [
    NotificationActions.AFFIILIATE_VERIFIED,
    NotificationActions.AFFIILIATE_NOT_VERIFIED,
    NotificationActions.AFFIILIATE_WITHDRAWAL_ACCEPTED,
    NotificationActions.AFFIILIATE_WITHDRAWAL_REJECTED,
    NotificationActions.AFFIILIATE_GOT_PAYMENT_BY_LINK,
    NotificationActions.AFFIILIATE_GOLD_STATUS_REACHED,
  ],

  /* ... */
};

export const getSettingsCategoryByAction = (
  action: NotificationActions,
): SettingsCategories => {
  for (const [category, actions] of Object.entries(
    SettingsCategoriesToActionsMap,
  )) {
    if (actions.includes(action)) {
      return Number(category);
    }
  }

  throw new Error(`notification action has no defined category: ${action}`);
};
