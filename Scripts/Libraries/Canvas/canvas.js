
function Canvas(canvasElement) {
    var ctx = canvasElement.getContext("2d");

    return {
        getWidth: GetWidth,
        getHeight: GetHeight,

        fillCircle: FillCircle,

        drawLine: DrawLine,

        fillRectangle: FillRectangle,
        fillTriangle: FillTriangle,

        fillText: FillText,
        getTextWidth: GetTextWidth
    };

    function GetWidth() {
        return canvasElement.width;
    }

    function GetHeight() {
        return canvasElement.height;
    }


    function FillCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function DrawLine(p1, p2, options) {
        options = options || {};

        var lineWidth = ctx.lineWidth;
        ctx.lineWidth = options.lineWidth || lineWidth;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (options.color)
            ctx.strokeStyle = options.color;
        ctx.stroke();

        ctx.lineWidth = lineWidth;
    }

    function FillRectangle(p1, p2, color) {
        var fillStyle = ctx.fillStyle;
        var width = p2.x - p1.x;
        var height = p2.y - p1.y;
        width = width > 0 ? width : -width;
        height = height > 0 ? height : -height;

        ctx.fillStyle = color;
        ctx.fillRect(p1.x, p1.y, width, height);

        ctx.fillStyle = fillStyle;
    }

    function FillTriangle(p1, p2, p3) {
        var fillStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.fill();
    }

    function FillText(text, x, y, options) {
        options = options || {};

        var fontSize = options.fontSize || 20,
			fontFamily = options.fontFamily || 'serif',
            fontWeight = options.fontWeight || "normal",
            fontStyle = options.fontStyle || "normal";

        ctx.fillStyle = options.color || "#000000";

        ctx.textBaseline = options.textBaseline || ctx.textBaseline;

        ctx.font = FormatString('{0} normal {1} {2}px {3}', fontStyle, fontWeight, fontSize, fontFamily);

        ctx.fillText(text, x, y);
    }

    function GetTextWidth(text, options) {
        options = options || {};

        var fontSize = options.fontSize || 20,
			fontFamily = options.fontFamily || 'serif',
            fontWeight = options.fontWeight || "normal",
            fontStyle = options.fontStyle || "normal";

        ctx.font = FormatString('{0} normal {1} {2}px {3}', fontStyle, fontWeight, fontSize, fontFamily);
        var mesureText = ctx.measureText(text);

        return mesureText.width;
    }
}