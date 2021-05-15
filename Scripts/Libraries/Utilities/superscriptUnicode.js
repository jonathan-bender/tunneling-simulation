
function GetNumberSuperscript(number) {
    var numberString = number.toString();
    var result = "";

    for (var i = 0; i < numberString.length; i++)
        result += GetDigitSuperscript(numberString.charAt(i));

    return result;

    function GetDigitSuperscript(digit) {
        if (digit == ".") return String.fromCharCode(183);

        if (digit == "-") return String.fromCharCode(8315)

        if (digit == 0)
            return String.fromCharCode(8304);

        if (digit == 1)
            return String.fromCharCode(185);

        if (digit == 2)
            return String.fromCharCode(178);

        if (digit == 3)
            return String.fromCharCode(179);

        return String.fromCharCode(8308 + Number(digit) - 4);
    }
}