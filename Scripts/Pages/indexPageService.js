
function IndexPageService() {
    var rectangularBarrierSimulation = document.getElementById("rectangular-barrier-simulation"),
        survivalProbability = document.getElementById("survival-probability"),
        showSurvivalProbabilityBtn = document.getElementById("show-survival-probability"),
        showSimulationBtn = document.getElementById("show-simulation"),
        tauValue = document.getElementById("tau-value"),
        restart = document.querySelectorAll(".restart")[0],
        backStep = document.querySelectorAll(".back-step")[0],
        play = document.querySelectorAll(".play")[0],
        pause = document.querySelectorAll(".pause")[0],
        fowardStep = document.querySelectorAll(".foward-step")[0];


    return {
        rectangularBarrierSimulation: new Graph(rectangularBarrierSimulation),
        survivalProbability: new Graph(survivalProbability),
        setTau: SetTau,
        restart: Restart,
        backStep: BackStep,
        play: Play,
        pause: Pause,
        showSurvivalProbability: ShowSurvivalProbability,
        showSimulation: ShowSimulation,
        togglePlayPause: TogglePlayPause,
        toggleSurvivalProbability: ToggleSurvivalProbability,
        toggleSurvivalProbabilityBtn: ToggleSurvivalProbabilityBtn,
        fowardStep: FowardStep
    };

    function SetTau(number) {
        tauValue.textContent = number;
    }

    function Restart(callback) {
        restart.onclick = callback;
    }

    function BackStep(callback) {
        backStep.onclick = callback;
    }

    function Play(callback) {
        play.onclick = callback;
    }

    function Pause(callback) {
        pause.onclick = callback;
    }

    function ShowSurvivalProbability(callback) {
        showSurvivalProbabilityBtn.onclick = callback;
    }

    function ShowSimulation(callback) {
        showSimulationBtn.onclick = callback;
    }


    function TogglePlayPause(showPlay) {
        var show = showPlay ? play : pause,
            hide = showPlay ? pause : play;
        hide.classList.add("hidden");
        show.classList.remove("hidden");
    }

    function ToggleSurvivalProbability(showSurvivalProbablity) {
        var show = showSurvivalProbablity ? survivalProbability : rectangularBarrierSimulation,
            hide = showSurvivalProbablity ? rectangularBarrierSimulation : survivalProbability;
        hide.classList.add("hidden");
        show.classList.remove("hidden");
    }

    function ToggleSurvivalProbabilityBtn(showSurvivalProbablity) {
        var show = showSurvivalProbablity ? showSurvivalProbabilityBtn : showSimulationBtn,
            hide = showSurvivalProbablity ? showSimulationBtn : showSurvivalProbabilityBtn;
        hide.classList.add("hidden");
        show.classList.remove("hidden");
    }

    function FowardStep(callback) {
        fowardStep.onclick = callback;
    }


    function Graph(elm) {
        var canvas = elm.querySelectorAll(".graph-canvas")[0],
            scaleUp = elm.querySelectorAll(".scale-up")[0],
            scaleDown = elm.querySelectorAll(".scale-down")[0],
            shiftXUp = elm.querySelectorAll(".shift-x-up")[0],
            shiftXDown = elm.querySelectorAll(".shift-x-down")[0],
            shiftYUp = elm.querySelectorAll(".shift-y-up")[0],
            shiftYDown = elm.querySelectorAll(".shift-y-down")[0];


        return {
            scaleUp: ScaleUp,
            scaleDown: ScaleDown,

            shiftXUp: ShiftXUp,
            shiftXDown: ShiftXDown,

            shiftYUp: ShiftYUp,
            shiftYDown: ShiftYDown,

            getCanvas: GetCanvasElement
        }

        function GetCanvasElement() {
            return canvas;
        }

        function ScaleUp(callback) {
            scaleUp.onclick = callback;
        }

        function ScaleDown(callback) {
            scaleDown.onclick = callback;
        }

        function ShiftXUp(callback) {
            shiftXUp.onclick = callback;
        }

        function ShiftXDown(callback) {
            shiftXDown.onclick = callback;
        }

        function ShiftYUp(callback) {
            shiftYUp.onclick = callback;
        }

        function ShiftYDown(callback) {
            shiftYDown.onclick = callback;
        }
    }
}