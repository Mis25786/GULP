// Основний модуль
import gulp from "gulp";

// Імпорт путів
import { path } from "./gulp/config/path.js";
// Імпорт спільних плагінів
import { plugins } from "./gulp/config/plugins.js";

// Передаємо значення в глобальну змінну
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Імпорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Спостерігач за змінами в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); // Якщо хочемо щоб все автоматично диплоїлося при змінах то заміняємо html на gulp.series(html, ftp)
  gulp.watch(path.watch.scss, scss); // Якщо хочемо щоб все автоматично диплоїлося при змінах то заміняємо scss на gulp.series(scss, ftp)
  gulp.watch(path.watch.js, js); // Якщо хочемо щоб все автоматично диплоїлося при змінах то заміняємо js на gulp.series(js, ftp)
  gulp.watch(path.watch.images, images); // Якщо хочемо щоб все автоматично диплоїлося при змінах то заміняємо images на gulp.series(images, ftp)
}

export { svgSprive };

// Послідовна обробка шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основні задачі
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// Побудова сценарія виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Експорт сценаріїв
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Виконання сценарія за замовчуванням
gulp.task("default", dev);
