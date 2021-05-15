
// simulating a wave function that solves the one dimentional shcrodinger equation.
// this simulation uses a leap-frog algorithm.

function SchrodingerEquation(from, to, initialPsiNorm, energy, potential, hbar, m, dx, dt, p) {
    var length = TranslateToDescrete(to),
        k = Math.sqrt(2 * m * energy) / hbar,
        descrete = DescreteSchrodingerEquation(length, initialPsi(), v, hbar, m, dt, p);

    return {
        re: function (x) { return descrete.re[TranslateToDescrete(x)] },
        im: function (x) { return descrete.im[TranslateToDescrete(x)] },
        step: descrete.step,
        getPsi: function () { return { re: descrete.re, im: descrete.im } }
    };

    function initialPsi() {
        return {
            re: function (x) { var y = TranslateFromDescrete(x); return initialPsiNorm(y) * Math.cos(k * y) },
            im: function (x) { var y = TranslateFromDescrete(x); return initialPsiNorm(y) * Math.sin(k * y) },
        };
    };

    function v(x) {
        return potential(TranslateFromDescrete(x));
    };

    function TranslateFromDescrete(x) {
        return x * dx + from;
    }

    function TranslateToDescrete(x) {
        return Math.round((x - from) / dx);
    }

    // one dimentional schrodinger equation with descrete x values
    function DescreteSchrodingerEquation(length, initialPsi, potential, hbar, m, dt, p) {
        var prevRe = [],
            prevIm = [],
            re = [],
            im = [],
            v = [];

        Init();

        return {
            re: re,
            im: im,
            step: Step
        };

        function Init() {
            if (p)
                for (var x = 0; x <= length; x++) {
                    re[x] = p.re[x];
                    im[x] = p.im[x];
                    v[x] = potential(x);
                }
            else
                for (var x = 0; x <= length; x++) {
                    re[x] = initialPsi.re(x);
                    im[x] = initialPsi.im(x);
                    v[x] = potential(x);
                }

            for (var x = 1; x < length; x++) {
                prevRe[x] = re[x] - Hamltonian(im, x) * dt;
                prevIm[x] = im[x] + Hamltonian(re, x) * dt;
            }
        }

        function Step() {
            var nextRe = [],
                nextIm = [];

            for (var x = 1; x < length; x++) {
                nextRe[x] = prevRe[x] + Hamltonian(im, x) * dt / hbar;
                nextIm[x] = prevIm[x] - Hamltonian(re, x) * dt / hbar;
            }

            for (var x = 1; x < length; x++) {
                prevRe[x] = re[x];
                prevIm[x] = im[x];

                re[x] = nextRe[x];
                im[x] = nextIm[x];

                // eliminate the wave function for large x values.
                // only compatiable with the rectangular barrier & only in some cases.
                // remove this code in any other experiment
                if (x > 200) {
                    re[x] /= 1.0001;
                    im[x] /= 1.0001;
                }
            }
        }

        function Hamltonian(psi, x) {
            return -Math.pow(hbar, 2) / 2 / m * (psi[x + 1] - 2 * psi[x] + psi[x - 1]) + v[x] * psi[x];
        }
    }
}