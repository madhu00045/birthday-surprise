/* ================================================= */
/* SCREEN CONTROL */
/* ================================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }

    window.scrollTo(0, 0);
}


/* ================================================= */
/* PASSWORD */
/* ================================================= */

const SECRET_PASSWORD = "3006";

const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordError = document.getElementById("passwordError");


function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        passwordError.textContent = "";

        document.body.classList.remove("locked");

        showScreen("questionScreen");

    } else {

        passwordError.textContent =
            "That's not it... try again 👀";

        passwordInput.value = "";

        passwordInput.focus();
    }
}


passwordBtn.addEventListener("click", checkPassword);


passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


/* ================================================= */
/* YES / NO QUESTION */
/* ================================================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answerArea = document.querySelector(".answer-area");
const noMessage = document.getElementById("noMessage");

let noAttempts = 0;

const funnyMessages = [
    "Nice try 😂",
    "Nope... that button is shy 😏",
    "Are you really trying to click NO? 👀",
    "I don't think NO is available today 😂",
    "Just press YES ❤️"
];


function moveNoButton() {

    noAttempts++;

    noBtn.style.position = "absolute";

    const areaWidth = answerArea.clientWidth;
    const areaHeight = answerArea.clientHeight;

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = Math.max(
        0,
        areaWidth - buttonWidth
    );

    const maxY = Math.max(
        0,
        areaHeight - buttonHeight
    );

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    const messageIndex = Math.min(
        noAttempts - 1,
        funnyMessages.length - 1
    );

    noMessage.textContent =
        funnyMessages[messageIndex];
}


/* Desktop */

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


/* Mobile */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/* Extra backup */

noBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


/* YES */

yesBtn.addEventListener(
    "click",
    function () {

        showScreen("kissHugScreen");

    }
);


/* ================================================= */
/* KISS / HUG */
/* ================================================= */

const kissBtn = document.getElementById("kissBtn");
const hugBtn = document.getElementById("hugBtn");

const rewardEmoji = document.getElementById("rewardEmoji");
const rewardTitle = document.getElementById("rewardTitle");
const rewardText = document.getElementById("rewardText");


/* KISS */

kissBtn.addEventListener(
    "click",
    function () {

        rewardEmoji.textContent = "💋";

        rewardTitle.textContent =
            "One kiss reserved. ❤️";

        rewardText.textContent =
            "No expiry date. No cancellation. 😌";

        showScreen("rewardScreen");

    }
);


/* HUG */

hugBtn.addEventListener(
    "click",
    function () {

        rewardEmoji.textContent = "🫂";

        rewardTitle.textContent =
            "One long hug reserved. ❤️";

        rewardText.textContent =
            "And yes... I decide how long it lasts. 😂";

        showScreen("rewardScreen");

    }
);


/* ================================================= */
/* START REAL SURPRISE */
/* ================================================= */

const realStartBtn =
    document.getElementById("realStartBtn");


realStartBtn.addEventListener(
    "click",
    function () {

        startMusic();

        showScreen("intro");

    }
);


/* ================================================= */
/* INTRO */
/* ================================================= */

const startBtn =
    document.getElementById("startBtn");


startBtn.addEventListener(
    "click",
    function () {

        startMusic();

        showScreen("countdownScreen");

    }
);


/* ================================================= */
/* REAL BIRTHDAY COUNTDOWN */
/* ================================================= */

/*
    Birthday:
    September 6, 2026

    Unlock:
    September 6, 2026 at 12:00 AM
*/

const birthdayDate =
    new Date(
        "September 6, 2026 00:00:00"
    ).getTime();



const continueBtn =
    document.getElementById("continueBtn");


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        birthdayDate - now;


    /* ========================================= */
    /* BIRTHDAY HAS ARRIVED */
    /* ========================================= */

    if (distance <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";


        /* Unlock button */

        continueBtn.disabled = false;

        continueBtn.classList.remove(
            "countdown-locked"
        );


        continueBtn.innerHTML =
            'THE WAIT IS OVER ❤️ <span>→</span>';


        return;
    }


    /* ========================================= */
    /* CALCULATE DAYS */
    /* ========================================= */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    /* ========================================= */
    /* CALCULATE HOURS */
    /* ========================================= */

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    /* ========================================= */
    /* CALCULATE MINUTES */
    /* ========================================= */

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    /* ========================================= */
    /* CALCULATE SECONDS */
    /* ========================================= */

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    /* ========================================= */
    /* SHOW COUNTDOWN */
    /* ========================================= */

    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");


    /* Keep button locked */

    continueBtn.disabled = true;

    continueBtn.classList.add(
        "countdown-locked"
    );

}


/* Start countdown */

updateCountdown();


/* Update every second */

setInterval(
    updateCountdown,
    1000
);


/* ================================================= */
/* CONTINUE AFTER COUNTDOWN */
/* ================================================= */

continueBtn.addEventListener(
    "click",
    function () {

        const now =
            new Date().getTime();


        /*
            Extra protection.
            Don't allow the next screen
            before September 6 midnight.
        */

        if (now < birthdayDate) {
            return;
        }


        showScreen("nameReveal");

    }
);


/* ================================================= */
/* NAME REVEAL */
/* ================================================= */

const memoriesBtn =
    document.getElementById("memoriesBtn");


memoriesBtn.addEventListener(
    "click",
    function () {

        showScreen("memories");

    }
);


/* ================================================= */
/* MEMORIES */
/* ================================================= */

const thingsBtn =
    document.getElementById("thingsBtn");


thingsBtn.addEventListener(
    "click",
    function () {

        showScreen("things");

    }
);


/* ================================================= */
/* FLIP CARDS */
/* ================================================= */

document.querySelectorAll(".flip-card")
    .forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                card.classList.toggle("flipped");

            }
        );

    });


/* ================================================= */
/* FAKE ENDING */
/* ================================================= */

const almostBtn =
    document.getElementById("almostBtn");


almostBtn.addEventListener(
    "click",
    function () {

        showScreen("fakeEnding");

    }
);


/* ================================================= */
/* FINAL SCREEN */
/* ================================================= */

const closeBtn =
    document.getElementById("closeBtn");


closeBtn.addEventListener(
    "click",
    function () {

        showScreen("final");

    }
);


/* ================================================= */
/* FINAL BIRTHDAY REVEAL */
/* ================================================= */

const revealBtn =
    document.getElementById("revealBtn");


revealBtn.addEventListener(
    "click",
    function () {

        showScreen("birthday");

        launchConfetti();

    }
);


/* ================================================= */
/* MUSIC */
/* ================================================= */

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


function startMusic() {

    music.play()
        .then(function () {

            musicPlaying = true;

            musicBtn.textContent = "🔊";

        })
        .catch(function () {

            console.log(
                "Music will start after user interaction."
            );

        });

}


musicBtn.addEventListener(
    "click",
    function () {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicBtn.textContent = "🔇";

        } else {

            music.play();

            musicPlaying = true;

            musicBtn.textContent = "🔊";

        }

    }
);


/* ================================================= */
/* FLOATING HEARTS */
/* ================================================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";


    heart.textContent =
        Math.random() > 0.5
            ? "❤️"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 5
        ) + "s";


    heart.style.fontSize =
        (
            12 +
            Math.random() * 18
        ) + "px";


    document.body.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        10000
    );

}


setInterval(
    createHeart,
    900
);


/* ================================================= */
/* CONFETTI */
/* ================================================= */

const canvas =
    document.getElementById("confetti");

const ctx =
    canvas.getContext("2d");

let confettiPieces = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function launchConfetti() {

    confettiPieces = [];


    for (let i = 0; i < 250; i++) {

        confettiPieces.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height -
                canvas.height,

            size:
                Math.random() *
                8 +
                4,

            speed:
                Math.random() *
                5 +
                3,

            rotation:
                Math.random() *
                360,

            rotationSpeed:
                Math.random() *
                10 -
                5,

            color:
                `hsl(${Math.random() * 360}, 80%, 65%)`

        });

    }


    animateConfetti();

}


function animateConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    confettiPieces.forEach(
        function (piece) {

            piece.y += piece.speed;

            piece.rotation +=
                piece.rotationSpeed;


            ctx.save();


            ctx.translate(
                piece.x,
                piece.y
            );


            ctx.rotate(
                piece.rotation *
                Math.PI /
                180
            );


            ctx.fillStyle =
                piece.color;


            ctx.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size
            );


            ctx.restore();

        }
    );


    confettiPieces =
        confettiPieces.filter(
            function (piece) {

                return (
                    piece.y <
                    canvas.height + 20
                );

            }
        );


    if (confettiPieces.length > 0) {

        requestAnimationFrame(
            animateConfetti
        );

    }

}