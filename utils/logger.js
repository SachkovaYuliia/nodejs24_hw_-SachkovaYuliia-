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