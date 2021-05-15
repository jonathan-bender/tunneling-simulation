
function Integral(fn, from, to, runs) {
    var diff = (to - from) / runs;

    var sum = 0;
    for (var x = from; x < to; x += diff)
        sum += fn(x);

    return sum * diff;
}