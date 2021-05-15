
function RectangularBarrierSimulation(componentService, schrodinger, getTau) {
    var a = schrodinger.a,
        options = {
            scale: 258,
            shiftX: a,
            shiftY: 1.156,
            fps: 20,
            drawTicks: true,
            drawYTicks: true,
            drawXTicks: false,
            ticksYDiff: (2 * a) / 5,
            drawNumbers: false,
            drawTickLines: true,
        },
        timeCoordinateSystem = new TimeDependentCoordinateSystem(componentService, options, Repaint);

    timeCoordinateSystem.addToCallback(function () { options.YAxisName = "|ψ(x," + String.fromCharCode(964) + "=" + getTau() + ")|" + GetNumberSuperscript(2); });
    return timeCoordinateSystem;

    function Repaint(canvasCoordinates) {
        canvasCoordinates.drawYAxis(options);
        canvasCoordinates.drawFunction(Density, { lineWidth: 3, color: "blue" });

        canvasCoordinates.drawFunction(V, { lineWidth: 3 });
    }

    function Density(x) {
        var density = schrodinger.psiDensity(x - a);
        if (density == 0) return NaN;

        return density;
    }

    function V(x) {
        return schrodinger.v(x - a) * 100;
    }
}