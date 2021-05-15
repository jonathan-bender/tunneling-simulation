
function CoordinateSystem(canvasCoordinateSystem, componentService, options, repaint) {
    var canvas = new Canvas(componentService.getCanvas()),
        canvasCoordinates = new CanvasCoordinates(canvas, options);

    Init();

    function Init() {
        canvasCoordinates.repaint(options, Repaint);
        SetControls();
    }

    function Repaint() {
        repaint(canvasCoordinates);
    }

    function SetControls() {
        componentService.scaleUp(function () {
            options.scale *= 1.3;
            canvasCoordinates.repaint(options, Repaint);
        });

        componentService.scaleDown(function () {
            options.scale /= 1.3;
            canvasCoordinates.repaint(options, Repaint);
        });

        componentService.shiftXUp(function () {
            options.shiftX += canvasCoordinates.toCanvasLength(20);
            canvasCoordinates.repaint(options, Repaint);
        });

        componentService.shiftXDown(function () {
            options.shiftX -= canvasCoordinates.toCanvasLength(20);
            canvasCoordinates.repaint(options, Repaint);
        });

        componentService.shiftYUp(function () {
            options.shiftY += canvasCoordinates.toCanvasLength(20);
            canvasCoordinates.repaint(options, Repaint);
        });

        componentService.shiftYDown(function () {
            options.shiftY -= canvasCoordinates.toCanvasLength(20);
            canvasCoordinates.repaint(options, Repaint);
        });
    }
}