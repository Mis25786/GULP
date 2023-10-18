import replace from "gulp-replace"; // Пошук і заміна
import plumber from "gulp-plumber"; // Обробка помилок
import notify from "gulp-notify"; // Повідомлення (підказки)
import browsersync from "browser-sync"; // Локальний сервер
import newer from "gulp-newer"; // Провірка оновлення
import ifPlugin from "gulp-if"; //  Умовне розгалудження

// Експортуемо об'єкти
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};
