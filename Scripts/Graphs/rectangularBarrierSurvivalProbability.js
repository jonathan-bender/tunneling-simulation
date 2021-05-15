
function RectangularBarrierSurvivalProbability(componentService, schrodinger) {
    var functionScale = 3000000,
        options = {
            scale: 500,
            shiftX: 0.5,
            shiftY: 0.51,
            fps: 20,
            functionPointDiff: 0.3,
            drawTicks: true,
            drawNumbers: true,
            drawXTicks: true,
            fontStyle: "",
            XAxisName: String.fromCharCode(964),
            YAxisName: "|C" + String.fromCharCode(7522) + String.fromCharCode(8345) + "(" + String.fromCharCode(964) + ")|" + GetNumberSuperscript(2),
            drawAxisArrowHead: true,
            ticksXDiff: 0.2,
            fillXTextFn: function (x) {
                if (x < 0 || x > 1) return "";

                var number = Math.round(functionScale * x);

                return FormatString("{0}{1}10{2}", number / Math.pow(10, 5), String.fromCharCode(8901), GetNumberSuperscript(5));
            },
            fillYTextFn: function (y) {
                if (y < 0 || y > 1) return "";

                y = Math.round(Number(y) * 1000) / 1000;

                return Number(y);
            },
            ticksYDiff: 0.2
        },
        timeCoordinateSystem = new TimeDependentCoordinateSystem(componentService, options, Repaint);

    return timeCoordinateSystem;

    function Repaint(canvasCoordinates) {
        canvasCoordinates.drawAxis(options);
        canvasCoordinates.drawFunction(function (t) { return schrodinger.survivalProbability(t * functionScale); }, { color: "black" });
    }
}