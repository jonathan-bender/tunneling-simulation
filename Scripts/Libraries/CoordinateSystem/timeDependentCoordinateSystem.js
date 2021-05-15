
function TimeCanvasCoordinates(canvas, options) {
    var timer = new Timer(options),
        canvasCoordinates = new CanvasCoordinates(canvas),
        callbacks = [];

    Init();

    return {
        toHtmlLength: canvasCoordinates.toHtmlLength,
        toCanvasLength: canvasCoordinates.toCanvasLength,

        clearCanvas: canvasCoordinates.clearCanvas,

        drawPoint: function (p, options) { callbacks.push(function () { canvasCoordinates.drawPoint(p, options) }); },
        drawSegment: function (p1, p2) { callbacks.push(function () { canvasCoordinates.drawSegment(p1, p2) }); },
        drawLine: function (p1, p2) { callbacks.push(function () { canvasCoordinates.drawLine(p1, p2) }); },
        drawRay: function (p1, p2) { callbacks.push(function () { canvasCoordinates.drawRay(p1, p2) }); },
        drawTick: function (l1, l2, p) { callbacks.push(function () { canvasCoordinates.drawTick(l1, l2, p) }); },

        drawFunction: function (func, options) { callbacks.push(function (t) { canvasCoordinates.drawFunction(function (x) { return func(x, t); }, options) }); },

        drawXAxis: function (options) { callbacks.push(function () { canvasCoordinates.drawXAxis(options) }); },
        drawYAxis: function (options) { callbacks.push(function () { canvasCoordinates.drawYAxis(options) }); },
        drawAxis: function (options) { callbacks.push(function () { canvasCoordinates.drawAxis(options) }); },

        fillText: function (text, p, options) { callbacks.push(function () { canvasCoordinates.fillText(text, p) }) },

        getTimer: GetTimer
    };

    // Private

    function Init() {
        timer.addToCallback(function (t) { canvasCoordinates.repaint(options, function () { callbacks.forEach(function (c) { c(t) }) }) });
    }

    // Public

    function GetTimer() {
        return timer;
    }
}