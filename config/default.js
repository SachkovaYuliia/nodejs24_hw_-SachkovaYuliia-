// модуль 'config' нам потрібен як центральна точка доступа для всього нашого енвайронмент-залежного сетапа
// тут у нас ЄДИНЕ МІСЦЕ в нашому коді де ми будемо лазити напряму в process.env
// module.exports = {
//   colorsEnabled: +process.env.COLORS_ENABLED || 1, // або значення із енва, або дефолтне якщо в енві не задано
//   logLevel: process.env.LOG_LEVEL || 'info',
//   port: 3003
// };
module.exports = {
  "server": {
    "port": 3000
  },
  "logger": {
    "colorsEnabled": true,
    "logLevel": "info"
  }
};
