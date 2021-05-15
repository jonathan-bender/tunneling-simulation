
// return the square of the survival probability amplitude
function SurvivalProbability(psi1, psi2, from, to, runs) {
    var re = Integral(GetIntegrandRe, from, to, runs),
        im = Integral(GetIntegrandIm, from, to, runs);

    return Math.pow(re, 2) + Math.pow(im, 2);

    function GetIntegrandRe(x) {
        return psi1.re(x) * psi2.re(x) + psi1.im(x) * psi2.im(x);
    }

    function GetIntegrandIm(x) {
        return psi1.re(x) * psi2.im(x) - psi1.im(x) * psi2.re(x);
    }
}