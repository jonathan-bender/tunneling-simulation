
function TimeDependentCoordinateSystem(componentService, options, startCanvas) {
    var canvas = new Canvas(componentService.getCanvas()),
        canvasCoordinates = new TimeCanvasCoordinates(canvas, options);

    Init();

    return canvasCoordinates.getTimer()

    function Init() {
        startCanvas(canvasCoordinates);
        SetControls();
    }

    function SetControls() {
        componentService.scaleUp(function () {
            options.scale *= 1.3;
        });

        componentService.scaleDown(function () {
            options.scale /= 1.3;
        });

        componentService.shiftXUp(function () {
            options.shiftX += canvasCoordinates.toCanvasLength(20);
        });

        componentService.shiftXDown(function () {
            options.shiftX -= canvasCoordinates.toCanvasLength(20);
        });

        componentService.shiftYUp(function () {
            options.shiftY += canvasCoordinates.toCanvasLength(20);
        });

        componentService.shiftYDown(function () {
            options.shiftY -= canvasCoordinates.toCanvasLength(20);
        });
    }
}