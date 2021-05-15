
function CanvasCoordinates(canvas) {
    var cartesianCoordinates = new CartesianCoordinates();

    var minX = 0,
		maxX = 0,
		minY = 0,
		maxY = 0,
		scale = 1,
        shiftX = 0,
        shiftY = 0,
		functionPointDiff = 2,
		pointTextSpace = 20;

    return {
        toHtmlLength: ToHtmlLength,
        toCanvasLength: ToCanvasLength,

        repaint: Repaint,

        clearCanvas: ClearCanvas,

        drawPoint: DrawPoint,

        drawSegment: DrawSegment,
        drawLine: DrawLine,
        drawRay: DrawRay,

        drawTick: DrawTick,

        drawFunction: DrawFunction,

        drawXAxis: DrawXAxis,
        drawYAxis: DrawYAxis,
        drawAxis: DrawAxis,

        fillText: FillText
    };


    // Private

    function ToHtmlCoordinates(p) {
        return { x: ToHtmlLength(p.x - shiftX) + canvas.getWidth() / 2, y: canvas.getHeight() / 2 - ToHtmlLength(p.y - shiftY) };
    }

    function ToCanvasCoordinates(p) {
        return { x: ToCanvasLength(p.x - canvas.getWidth() / 2) + shiftX, y: ToCanvasLength(-p.y - canvas.getHeight() / 2) - shiftY };
    }

    function GetDistance(p1, p2) {
        var deltaXSqured = Math.pow(p1.x - p2.x, 2);
        var deltaYSqured = Math.pow(p1.y - p2.y, 2);
        return Math.sqrt(deltaXSqured + deltaYSqured);
    }

    function IsInRectangle(p, x1, x2, y1, y2) {
        var lowerX = x1 > x2 ? x2 : x1,
			upperX = x1 > x2 ? x1 : x2,
			lowerY = y1 > y2 ? y2 : y1,
			upperY = y1 > y2 ? y1 : y2;

        return p.x >= lowerX
			&& p.x <= upperX
			&& p.y >= lowerY
			&& p.y <= upperY;
    }

    function IsInCanvas(p) {
        return IsInRectangle(p, minX, maxX, minY, maxY);
    }

    function GetNumberOfDigits(num) {
        var abs = Math.abs(num),
			counter = 0;

        if (abs == 0)
            return 0;

        if (abs >= 1) {
            while (abs >= 1) {
                counter++;
                abs = abs / 10;
            }

            return counter;
        } else {
            while (abs < 1) {
                counter--;
                abs = abs * 10;
            }
        }

        return counter;
    }

    // gets a number and rounds it to the first significant digit of the scale
    // if the scale is grater than one, only rounds the number to the nearest integer
    function RoundToScale(num, scale) {
        var numberOfDigits = GetNumberOfDigits(scale);

        if (numberOfDigits >= 1)
            return Math.trunc(num);

        // numbers that are smaller than that,
        // displayed as floating point. for now, I don't want to deal with those numbers...
        if (Math.abs(num) < 0.000001)
            return 0;

        var currentNumberOfDigits = GetNumberOfDigits(num);
        return Number.parseFloat(num.toPrecision(currentNumberOfDigits - numberOfDigits + 2));
    }

    function GetXSpan() {
        return maxX - minX;
    }

    function GetYSpan() {
        return maxY - minY;
    }

    function DrawArrowHead(p, direction) {
        DrawIsosceletesTriangle(p, ToCanvasLength(30), ToCanvasLength(12), direction);
    }

    function DrawIsosceletesTriangle(p1, height, base, direction) {

        // the angle between the direction of the triangle and the x axis
        var directionAngle = Math.tan(direction.y / direction.x) || Math.PI / 2 * Math.sign(direction.y);
        // the angle between the side of the triangle and between it's height
        var triangleHeightAngle = Math.atan2(base / 2, height);
        var side = Math.sqrt(Math.pow(height, 2), Math.pow(base / 2), 2);

        var x2 = p1.x - side * Math.cos(directionAngle + triangleHeightAngle);
        var y2 = p1.y - side * Math.sin(directionAngle + triangleHeightAngle);

        var x3 = p1.x - side * Math.cos(directionAngle - triangleHeightAngle);
        var y3 = p1.y - side * Math.sin(directionAngle - triangleHeightAngle);

        var p1 = ToHtmlCoordinates(p1);
        var p2 = ToHtmlCoordinates({ x: x2, y: y2 });
        var p3 = ToHtmlCoordinates({ x: x3, y: y3 });

        canvas.fillTriangle(p1, p2, p3);
    }


    // Public

    function ToHtmlLength(length) {
        return length * scale;
    }

    function ToCanvasLength(length) {
        return length / scale;
    }


    function Repaint(options, callback) {
        options = options || {};

        if (!AreOptionsValid(options.shiftX, options.scale)
			|| !AreOptionsValid(options.shiftY, options.scale)) {
            options.shiftX = shiftX;
            options.shiftY = shiftY;
            options.scale = scale;
        } else {
            shiftX = options.shiftX || shiftX;
            shiftY = options.shiftY || shiftY;
            scale = options.scale || scale;
        }


        minX = -ToCanvasLength(canvas.getWidth() / 2) + shiftX;
        maxX = ToCanvasLength(canvas.getWidth() / 2) + shiftX;
        minY = -ToCanvasLength(canvas.getHeight() / 2) + shiftY;
        maxY = ToCanvasLength(canvas.getHeight() / 2) + shiftY;

        functionPointDiff = options.functionPointDiff || functionPointDiff;
        pointTextSpace = options.pointTextSpace || pointTextSpace;

        ClearCanvas();

        if (callback)
            callback();

        function AreOptionsValid(shift, scale) {
            return isFinite(shift) && isFinite(scale) && (GetNumberOfDigits(shift) + GetNumberOfDigits(scale) <= 15);
        }
    }


    function ClearCanvas() {
        var p1 = ToHtmlCoordinates({ x: minX, y: maxY });
        var p2 = ToHtmlCoordinates({ x: maxX, y: minY });

        canvas.fillRectangle(p1, p2, 'white');
    }


    function DrawPoint(p, radius) {
        radius = radius || 0.15;

        var htmlCoordinates = ToHtmlCoordinates(p),
			htmlRadius = ToHtmlLength(radius);

        canvas.fillCircle(htmlCoordinates.x, htmlCoordinates.y, htmlRadius, 0, 2 * Math.PI);
    }


    function DrawSegment(p1, p2, options) {
        var htmlP1 = ToHtmlCoordinates(p1),
			htmlP2 = ToHtmlCoordinates(p2);

        canvas.drawLine(htmlP1, htmlP2, options);
    }

    function DrawLine(p1, p2, options) {
        var leftIntersection = cartesianCoordinates
			.getIntersection(
				{ p1: p1, p2: p2 },
				{ p1: { x: minX, y: 0 }, p2: { x: minX, y: 1 } });

        var rightIntersection = cartesianCoordinates
			.getIntersection(
				{ p1: p1, p2: p2 },
				{ p1: { x: maxX, y: 0 }, p2: { x: maxX, y: 1 } });

        if (rightIntersection && leftIntersection)
            DrawSegment(leftIntersection, rightIntersection, options);
        else
            DrawSegment({ x: p1.x, y: minY }, { x: p1.x, y: maxY }, options);
    }

    function DrawRay(p1, p2) {
        var leftBorder = { p1: { x: minX, y: 0 }, p2: { x: minX, y: 1 } },
			rightBorder = { p1: { x: maxX, y: 0 }, p2: { x: maxX, y: 1 } },
			bottomBorder = { p1: { x: 0, y: minY }, p2: { x: 1, y: minY } },
			topBorder = { p1: { x: 0, y: maxY }, p2: { x: 1, y: maxY } };

        var intersections = [leftBorder, rightBorder, bottomBorder, topBorder]
			.map(function (border) {
			    return cartesianCoordinates.getIntersection({ p1: p1, p2: p2 }, border);
			});

        if (IsInCanvas(p1) && IsInCanvas(p2)) {
            var intersection = intersections.find(function (intersection) {
                return intersection && IsInCanvas(intersection)
					&& GetDistance(p1, intersection) > GetDistance(p2, intersection);
            });

            DrawSegment(p1, intersection);
        } else if (IsInCanvas(p1) && !IsInCanvas(p2)) {
            var intersection = intersections.find(function (intersection) {
                return intersection && IsInCanvas(intersection)
					&& IsInRectangle(intersection, p1.x, p2.x, p1.y, p2.y);
            });

            DrawSegment(p1, intersection);
        } else {
            var intersections = intersections.filter(function (intersection) {
                return intersection && IsInCanvas(intersection)
					&& GetDistance(p1, intersection) > GetDistance(p2, intersection);

            });

            if (intersections[0] && intersections[1])
                DrawSegment(intersections[0], intersections[1]);
        }
    }

    function DrawTick(linePoint1, linePoint2, point, options) {
        var line = cartesianCoordinates.getLine(linePoint1, linePoint2);

        var slope = line == null ? 0 : line.m == 0 ? null : -1 / line.m;
        var length = ToCanvasLength(options.length || 8);

        if (!options.drawBottom) {
            var point1 = cartesianCoordinates.getPointFromPointAndPath(point, slope, length);
            DrawSegment(point, point1);
        }

        if (options.drawBottom) {
            var point2 = cartesianCoordinates.getPointFromPointAndPath(point, slope, -length);
            DrawSegment(point, point2);
        }
    }


    function DrawFunction(func, options) {
        options = options || {};

        options.color = options.color || "#000000";

        htmlDiff = options.functionPointDiff || functionPointDiff;

        var diff = ToCanvasLength(htmlDiff);

        var points = [];
        for (var i = minX; i < maxX; i += diff) {
            points.push({ x: i, y: func(i) });
        }

        for (var i = 0; i < points.length; i++) {
            if (points[i] && points[i + 1] && isFinite(points[i].y) && isFinite(points[i + 1].y))
                DrawSegment(points[i], points[i + 1], options);
        }
    }


    function DrawAxis(options) {
        options = options || {};
        options.drawTicks = options.drawTicks != undefined ? options.drawTicks : true;
        options.drawNumbers = options.drawNumbers != undefined ? options.drawNumbers : true;
        options.drawTickLines = options.drawTickLines != undefined ? options.drawTickLines : false;

        DrawXAxis(options);
        DrawYAxis(options);
    }

    function DrawXAxis(options) {
        var axisY = minY > 0 ? minY + ToCanvasLength(6) : maxY < 0 ? maxY - ToCanvasLength(6) : 0;
        options = options || {};

        var tickXs = GetTickXs();
        var drawXTickLines = options.drawTickLines || options.drawXTickLines;

        if (options.drawTicks && !drawXTickLines || options.drawXTicks)
            DrawTicks();

        if (drawXTickLines)
            DrawTickLines();

        if (options.drawNumbers || options.drawXNumbers)
            DrawNumbers();

        DrawLine({ x: 0, y: axisY }, { x: 1, y: axisY }, { color: "#000000" });

        if (options.drawAxisArrowHead)
            DrawArrowHead({ x: maxX, y: axisY }, { x: 1, y: 0 });

        if (options.XAxisName)
            FillText(options.XAxisName, { x: maxX - ToCanvasLength(20), y: axisY }, { position: "top", fontFamily: options.fontFamily, fontWeight: options.fontWeight, fontStyle: options.fontStyle });

        function GetTickXs() {
            var result = [];

            if (options.ticksXDiff) {
                var currentX = minX - minX % options.ticksXDiff;

                while (currentX < maxX) {
                    var tickX = currentX
                    if (tickX !== 0)
                        result.push({ x: tickX, y: axisY });
                    currentX += options.ticksXDiff;
                }
            } else {
                var diff = GetXSpan() / 10;
                var digitsToRound = GetNumberOfDigits(diff / 10);
                diff = diff - diff % Math.pow(10, digitsToRound);
                diff = RoundToScale(diff, GetXSpan() / 10);

                var currentX = minX - minX % diff;

                while (currentX < maxX) {
                    var tickX = RoundToScale(currentX, GetXSpan() / 10);
                    if (tickX !== 0)
                        result.push({ x: tickX, y: axisY });
                    currentX += diff;
                }
            }

            return result;
        }

        function DrawTicks() {
            tickXs.forEach(function (p) {
                DrawTick({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: p.x, y: axisY }, { drawBottom: minY < 0, length: 5 });
            });
        }

        function DrawTickLines() {
            tickXs.forEach(function (p) {
                DrawLine(p, { x: p.x, y: 1 }, { color: "lightgray" });
            });
        }

        function DrawNumbers() {
            var textOptions = { position: minY < 0 ? "bottom" : "top", round: "x", fontFamily: options.fontFamily };

            tickXs.forEach(function (p) {
                if (options.fillXTextFn)
                    FillText(options.fillXTextFn(p.x), p, textOptions);
                else
                    RoundAndFillText(p.x, p, textOptions);
            });
        }
    }

    function DrawYAxis(options) {
        var axisX = minX > 0 ? minX + ToCanvasLength(6) : maxX < 0 ? maxX - ToCanvasLength(6) : 0;

        options = options || {};

        var tickYs = GetTickYs();
        var drawYTickLines = options.drawTickLines || options.drawYAxisLines;

        if (options.drawTicks && !drawYTickLines || options.drawYTicks)
            DrawTicks();

        if (drawYTickLines)
            DrawTickLines();

        if (options.drawNumbers || options.drawYNumbers)
            DrawNumbers();


        DrawLine({ x: axisX, y: 0 }, { x: axisX, y: 1 }, { color: "#000000" });

        if (options.drawAxisArrowHead)
            DrawArrowHead({ x: axisX, y: maxY }, { x: 0, y: 1 });

        if (options.YAxisName)
            FillText(options.YAxisName, { x: axisX, y: maxY - ToCanvasLength(20) }, { position: "right", fontFamily: options.fontFamily, fontWeight: options.fontWeight, fontStyle: options.fontStyle });

        function GetTickYs() {
            var result = [];

            if (options.ticksYDiff) {
                var currentY = minY - minY % options.ticksYDiff;

                while (currentY < maxY) {
                    var tickY = currentY
                    if (tickY !== 0)
                        result.push({ x: axisX, y: tickY });
                    currentY += options.ticksYDiff;
                }
            } else {
                var diff = GetYSpan() / 10;
                var digitsToRound = GetNumberOfDigits(diff / 10);
                diff = diff - diff % Math.pow(10, digitsToRound);
                diff = RoundToScale(diff, GetYSpan() / 10);

                var currentY = minY - minY % diff;

                while (currentY < maxY) {
                    var tickY = RoundToScale(currentY, GetYSpan() / 10);
                    if (tickY !== 0)
                        result.push({ x: axisX, y: tickY });
                    currentY += diff;
                }
            }

            return result;
        }

        function DrawTicks() {
            tickYs.forEach(function (p) {
                DrawTick({ x: axisX, y: 0 }, { x: axisX, y: 1 }, p, { drawBottom: minX < 0, length: 5 });
            });
        }

        function DrawTickLines() {
            tickYs.forEach(function (p) {
                DrawLine(p, { x: 1, y: p.y }, { color: "lightgray" });
            });
        }

        function DrawNumbers() {
            var textOptions = { position: minX < 0 ? "left" : "right", round: "y", fontFamily: options.fontFamily };

            tickYs.forEach(function (p) {
                if (options.fillYTextFn)
                    FillText(options.fillYTextFn(p.y), p, textOptions);
                else
                    RoundAndFillText(p.y, p, textOptions);
            });
        }
    }


    function FillText(text, p, options) {
        options = options || {};
        options.textBaseline = "middle";

        var position = options.position || { x: 0, y: 0 },
			fontSize = options.fontSize,
            fontWeight = options.fontWeight,
            fontStyle = options.fontStyle,
			textpointTextSpace = pointTextSpace || options.pointTextSpace,
			textWidth = canvas.getTextWidth(text, options);

        switch (position) {
            case "top": position = { x: 0, y: -textpointTextSpace }; break;
            case "left": position = { x: -textpointTextSpace - textWidth / 2, y: 0 }; break;
            case "bottom": position = { x: 0, y: textpointTextSpace }; break;
            case "right": position = { x: textpointTextSpace + textWidth / 2, y: 0 }; break;
        }

        var htmlCooridnates = cartesianCoordinates.add(ToHtmlCoordinates(p), position);

        htmlCooridnates = cartesianCoordinates.add(htmlCooridnates, { x: -textWidth / 2, y: 0 });

        canvas.fillText(text, htmlCooridnates.x, htmlCooridnates.y, options);
    }

    function RoundAndFillText(text, p, options) {
        var roundDigits = GetRoundDigits(options.round);

        if (options.textFormatArguments && options.textFormatArguments.length) {
            var arguments = options.textFormatArguments.map(function (formatArgument) {
                if (formatArgument.round) {
                    return Round(formatArgument.v, GetRoundDigits(formatArgument.round));
                }

                return Round(formatArgument.v, roundDigits);
            });

            text = FormatString.apply(null, arguments);
        }
        else {
            text = Round(text, roundDigits);
        }

        function Round(number, digits) {
            return RoundToScale(number, digits);
        }

        function GetRoundDigits(round) {
            if (round == "x")
                return GetXSpan() / 100;

            if (round == "y")
                return GetYSpan() / 100;
        }

        FillText(text, p, options);
    }
}