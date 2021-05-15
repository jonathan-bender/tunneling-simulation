
function RectangularBarrierExperiment(p, s) {
    var a = 1,
        b = 0.5,
        v0 = 1 / 600,
        E = 0.5 / 600,
        m = 1,
        hbar = 1,
        dx = 1 / 100,
        k = Math.sqrt(2 * m * E) / hbar,
        dt = 0.2,
        survivalProbability = s || [],
        survivalProbabilitySampling = 1000,
        survivalProbabilityCounter = 0,
        survivalProbabilitySamplingStepCount = GetStepCount(survivalProbabilitySampling),
        schrodinger = new SchrodingerEquation(-a, b + 2, InitialPsiNorm, E, V, hbar, m, dx, dt,p);

    return {
        psiRe: PsiRe,
        psiIm: PsiIm,
        psiDensity: PsiDensity,
        survivalProbability: GetSurvivalProbability,

        v: V,
        a: a,

        advance: Advance,

        getPsi: function () { return schrodinger.getPsi() },
        getSurvivalProb: function () { return survivalProbability },
    };

    // Private

    function InitialPsi() {
        return {
            re: function (x) { return InitialPsiNorm(x) * Math.cos(k * x) },
            im: function (x) { return InitialPsiNorm(x) * Math.sin(k * x) }
        }
    }

    function InitialPsiNorm(x) {
        if (x > -a && x < 0)
            return Math.sqrt(2 / a) * Math.sin(Math.PI * (x + a) / a);

        return 0;
    }

    function V(x) {
        if (x > 0 && x < b) return v0;

        if (x < -a) return 1000;

        return 0;
    }

    function Step() {
        schrodinger.step();

        survivalProbabilityCounter++;

        if (survivalProbabilityCounter % survivalProbabilitySamplingStepCount == 0)
            survivalProbability.push(SurvivalProbability(schrodinger, InitialPsi(), -a, 0, 100));
    }

    function GetStepCount(tau) {
        var t = 2 * m * Math.pow(a, 2) * tau / hbar;
        return Math.round(t / dt);
    }

    // Public

    function PsiRe(x) {
        return schrodinger.re(x);
    }

    function PsiIm(x) {
        return schrodinger.im(x);
    }

    function PsiDensity(x) {
        return Math.pow(PsiRe(x), 2) + Math.pow(PsiIm(x), 2);
    }

    function GetSurvivalProbability(tau) {
        return survivalProbability[Math.round(tau / survivalProbabilitySampling)];
    }


    // WARNING: if 'tau' does not produce an integer 'stepCount' (before rounding), it will cause inaccuracies in the time.
    function Advance(tau) {
        var stepCount = GetStepCount(tau);

        for (var i = 0; i < stepCount; i++)
            Step();
    }
}