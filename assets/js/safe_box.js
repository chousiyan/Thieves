let closeButton = document.getElementById("close-button");
let safeBox = document.getElementById("safe-box-popup");

// 3rd display
let inputNumber03 = document.getElementById("input-number-03");

// All keyboards
let keyboard01 = document.getElementById("keyboard-01");
let keyboard02 = document.getElementById("keyboard-02");
let keyboard03 = document.getElementById("keyboard-03");
let keyboard04 = document.getElementById("keyboard-04");
let keyboard05 = document.getElementById("keyboard-05");
let keyboard06 = document.getElementById("keyboard-06");
let keyboard07 = document.getElementById("keyboard-07");
let keyboard08 = document.getElementById("keyboard-08");
let keyboard09 = document.getElementById("keyboard-09");
let keyboard10 = document.getElementById("keyboard-10");
let keyboard11 = document.getElementById("keyboard-11");
let keyboard12 = document.getElementById("keyboard-12");

let handle = document.getElementById("handle");

// input numbers vs. correct numbers
let inputArray = [];
let correctArray = [keyboard03, keyboard06, keyboard02, keyboard08, keyboard06];


let firstStepComplete = false;
let wrongAttempts = 0;

// Close Safe Box
closeButton.addEventListener("click", function () {
    safeBox.style.display = "none";
    inputArray = [];
    inputNumber03 = "-";
    firstStepComplete = false;
})

// Pressing keys
keyboard01.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard01)
    }
});
keyboard02.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard02)
    }
});
keyboard03.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard03)
    }
});
keyboard04.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard04)
    }
});
keyboard05.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard05)
    }
});
keyboard06.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard06)
    }
});
keyboard07.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard07)
    }
});
keyboard08.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard08)
    }
});
keyboard09.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard09)
    }
});
keyboard10.addEventListener("click", function () {
    firstStepComplete = false;
    inputNumber03.innerHTML = "-";
    inputArray = [];
});
keyboard11.addEventListener("click", function () {
    if (firstStepComplete) {
        inputArray.push(keyboard11)
    }
});
keyboard12.addEventListener("click", function () {
    if (inputArray === []) {
        return true;
    } else {
        inputArray.pop();
    }
});


// Rotating handle
handle.addEventListener("click", checkResult);

function checkResult() {
    let allIdentical = true;

    if (inputArray.length === correctArray.length) {
        for (i = 0; i < inputArray.length; i++) {
            if (inputArray[i] === correctArray[i]) {} else {
                allIdentical = false;
            }
        }
        if (allIdentical === true) {
            isGameWin = true;
        } else {
            if (wrongAttempts === 2) {
                isGameOver = true;
            } else {
                wrongAttempts += 1;
                inputArray = [];
                firstStepComplete = false;
                inputNumber03.innerHTML = "-";
            }
        }
    } else {
        if (wrongAttempts === 2) {
            isGameOver = true;
        } else {
            wrongAttempts += 1;
            inputArray = [];
            firstStepComplete = false;
            inputNumber03.innerHTML = "-";
        }
    }
}



// hold 1 for 5 seconds

("keyboard-03");
$("#keyboard-03").on({
    mousedown: function () {
        $(this).data('timer', setTimeout(function () {
            hackInitiate();
        }, 5000));
    },
    mouseup: function () {
        clearTimeout($(this).data('timer'));
    }
});

function hackInitiate() {
    inputNumber03.innerHTML = "3";
    firstStepComplete = true;
}
