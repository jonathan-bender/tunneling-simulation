
function Timer(options) {
    var fps = 1,
        intervalId = 0,
        time = 0,
        callbacks = [],
        isOn = false;

    Init();

    return {
        start: Start,
        stop: Stop,

        getTime: GetTime,

        addToCallback: AddToCallback
    };


    // Private

    function Init() {
        fps = options.fps || fps;

        Start();
    }

    function CallbackWithTime() {
        time += 1 / fps;

        Callback(time);
    }

    function Callback(t) {
        callbacks.forEach(function (callback) {
            callback(t);
        });
    }

    // Public

    function Start() {
        if (isOn) return;

        intervalId = setInterval(CallbackWithTime, 1000 / fps);
        isOn = true;
    }


    function Stop() {
        clearInterval(intervalId);
        isOn = false;
    }

    function GetTime() {
        return time;
    }

    function AddToCallback(c) {
        callbacks.push(c);
    }
}