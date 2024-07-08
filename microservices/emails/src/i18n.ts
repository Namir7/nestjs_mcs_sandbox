import i18n from "i18next";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { getParam } from "services/config";

const lng = getParam("DEFAULT_LANG");

i18n.init({
  lng,

  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});

export const t = i18n.t;
