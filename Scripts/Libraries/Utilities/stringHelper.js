
function FormatString(string) {
    var args = Array.prototype.slice.call(arguments, 1);

    return string.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
}