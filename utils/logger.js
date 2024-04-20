// реалізовуємо три методи, та експортуємо три ключа об'єктом, для того, щоб вони були доступні для використання ззовні цього модуля.
function info(msg){
    console.log("[INFO]", msg);
};
function warn(msg){
    console.log("[WARN]", msg);
};
function error(msg){
    console.log("[ERROR]", msg);
};
// module.exports = {
//     info,
//     warn,
//     error
// }

// або можемо відразу повертати ключі:
function getlogger(){
    console.log('one more way to get logger');
    return {
        info,
        warn,
        error
    };
}

module.exports = getlogger;