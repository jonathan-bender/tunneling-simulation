
(function Start() {
    var indexPageService = new IndexPageService(),
        experiment,
        tau = 0,
        fps = 20,
        tauPerSecond = 800,
        deltaTau = tauPerSecond / fps,
        timer,
        rectangularBarrierSimulation,
        rectangularBarrierSurvivalProbability,
        data = WaveFunctionData();

    Init();

    function Init() {
        experiment = new RectangularBarrierExperiment();
        timer = new Timer({ fps: fps });
        timer.addToCallback(AdvanceExperiment);
        timer.stop();
        rectangularBarrierSimulation = new RectangularBarrierSimulation(indexPageService.rectangularBarrierSimulation, experiment, GetTau);
        rectangularBarrierSurvivalProbability = new RectangularBarrierSurvivalProbability(indexPageService.survivalProbability, experiment);
        indexPageService.togglePlayPause(true);
        indexPageService.setTau(tau);
        indexPageService.toggleSurvivalProbability(false);
        indexPageService.toggleSurvivalProbabilityBtn(true);
        SetControls();
    }

    function SetControls() {
        indexPageService.restart(Restart);
        indexPageService.pause(Stop);
        indexPageService.play(Play);
        indexPageService.showSurvivalProbability(function () { ShowSurvivalProbability(true) });
        indexPageService.showSimulation(function () { ShowSurvivalProbability(false) });
        indexPageService.fowardStep(FowardStep);
        indexPageService.backStep(BackStep);
    }

    function Stop() {
        timer.stop();
        indexPageService.togglePlayPause(true);
    }

    function Play() {
        timer.start();
        rectangularBarrierSimulation.start();
        rectangularBarrierSurvivalProbability.start();
        indexPageService.togglePlayPause(false);
    }

    function Restart() {
        rectangularBarrierSimulation.stop();
        rectangularBarrierSurvivalProbability.stop();
        timer.stop();
        tau = 0;
        experiment = new RectangularBarrierExperiment();
        timer = new Timer({ fps: fps });
        timer.addToCallback(AdvanceExperiment);
        indexPageService.togglePlayPause(false);
        rectangularBarrierSimulation = new RectangularBarrierSimulation(indexPageService.rectangularBarrierSimulation, experiment, GetTau);
        rectangularBarrierSurvivalProbability = new RectangularBarrierSurvivalProbability(indexPageService.survivalProbability, experiment);
    }

    function AdvanceExperiment() {
        tau += deltaTau;
        experiment.advance(deltaTau);

        indexPageService.setTau(Math.round(tau / 100) * 100);
    }

    function GetTau() {
        return Math.round(tau / 100) * 100;
    }

    function ShowSurvivalProbability(show) {
        indexPageService.toggleSurvivalProbability(show);
        indexPageService.toggleSurvivalProbabilityBtn(!show);
    }

    function FowardStep() {
        var i = Math.floor(tau / 300000);
        if (i < 0 || i > 10) return;
        var psi = data[i].psi;
        var survivalProbablity = data[i].survivalProbability;

        rectangularBarrierSimulation.stop();
        rectangularBarrierSurvivalProbability.stop();
        timer.stop();
        tau = data[i].tau + 300000;
        experiment = new RectangularBarrierExperiment(psi, survivalProbablity);
        timer = new Timer({ fps: fps });
        timer.addToCallback(AdvanceExperiment);
        indexPageService.togglePlayPause(false);
        rectangularBarrierSimulation = new RectangularBarrierSimulation(indexPageService.rectangularBarrierSimulation, experiment, GetTau);
        rectangularBarrierSurvivalProbability = new RectangularBarrierSurvivalProbability(indexPageService.survivalProbability, experiment);
    }

    function BackStep() {
        var i = Math.floor(tau / 300000) - 2;
        if (i == -1) Restart();

        if (i < 0 || i > 10) return;
        var psi = data[i].psi;
        var survivalProbablity = data[i].survivalProbability;

        rectangularBarrierSimulation.stop();
        rectangularBarrierSurvivalProbability.stop();
        timer.stop();
        tau = data[i].tau + 300000;
        experiment = new RectangularBarrierExperiment(psi, survivalProbablity);
        timer = new Timer({ fps: fps });
        timer.addToCallback(AdvanceExperiment);
        indexPageService.togglePlayPause(false);
        rectangularBarrierSimulation = new RectangularBarrierSimulation(indexPageService.rectangularBarrierSimulation, experiment, GetTau);
        rectangularBarrierSurvivalProbability = new RectangularBarrierSurvivalProbability(indexPageService.survivalProbability, experiment);
    }
})();