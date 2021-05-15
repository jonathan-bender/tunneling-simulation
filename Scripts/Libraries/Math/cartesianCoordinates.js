
function CartesianCoordinates() {
    return {
        getIntersection: GetIntersection,
        getPointFromPointAndPath: GetPointFromPointAndPath,

        getLine: GetLine,

        add: Add
    };

    function GetIntersection(line1, line2) {
        var cartLine1 = GetLine(line1.p1, line1.p2);
        var cartLine2 = GetLine(line2.p1, line2.p2);


        if (cartLine1 == null && cartLine2 == null)
            return null;

        var x = 0;

        if (cartLine1 == null)
            x = line1.p1.x;
        else if (cartLine2 == null)
            x = line2.p1.x;
        else {
            if (cartLine1.m == cartLine2.m)
                return null;

            x =
				(cartLine1.m * cartLine1.x0 - cartLine2.m * cartLine2.x0
				+ cartLine1.y0 - cartLine2.y0)
				/ (cartLine2.m - cartLine1.m);
        }

        var line = cartLine1 || cartLine2;
        var y = line.m * (x - line.x0) + line.y0;

        return { x: x, y: y };
    }

    function GetPointFromPointAndPath(point, slope, length) {
        var x, y;
        if (slope == null) {
            x = point.x;
            y = point.y + length;
        }
        else {
            var Dx = length / Math.sqrt(1 + Math.pow(slope, 2));
            x = point.x + Dx;

            y = point.y + slope * Dx;
        }

        return { x: x, y: y };
    }

    function GetLine(p1, p2) {
        if (p1.x == p2.x)
            return null;

        var m = (p2.y - p1.y) / (p2.x - p1.x);

        var x0 = p1.x;
        var y0 = p1.y;

        return { m: m, x0: x0, y0: y0 };
    }


    function Add(p1, p2) {
        return { x: p1.x + p2.x, y: p1.y + p2.y };
    }
}