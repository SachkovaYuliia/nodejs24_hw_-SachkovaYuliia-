// реалізовуємо три методи, та експортуємо три ключа об'єктом, для того, щоб вони були доступні для використання ззовні цього модуля.
// function info(msg){
//     console.log("[INFO]", msg);
// };
// function warn(msg){
//     console.error("[WARN]", msg);
// };
// function error(msg){
//     console.error("[ERROR]", msg);
// };
// module.exports = {
//     info,
//     warn,
//     error
// }

// або можемо відразу повертати ключі:
// function getlLogger(){
//     console.log('one more way to get logger');
    
//     return {
//         info,
//         warn,
//         error
//     };
// }


function getLogger(prefix) {
    return {
        info: function(msg) {
            console.log(`[${prefix}] INFO: ${msg}`);
        },
        warn: function(msg) {
            console.error(`[${prefix}] WARN: ${msg}`);
        },
        error: function(msg) {
            console.error(`[${prefix}] ERROR: ${msg}`);
        }
    };
}

module.exports = getLogger;