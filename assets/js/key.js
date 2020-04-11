class Key {
    _pressed = {};

    LEFT = 65;
    UP = 87;
    RIGHT = 68;
    DOWN = 83;

    isDown(keyCode) {
        return this._pressed[keyCode];
    }

    onKeydown(event) {
        this._pressed[event.keyCode] = true;
    }

    onKeyup(event) {
        delete this._pressed[event.keyCode];
    }
};

const key = new Key();

window.addEventListener('keyup', function (event) {
    key.onKeyup(event);
}, false);

window.addEventListener('keydown', function (event) {
    key.onKeydown(event);
}, false);
