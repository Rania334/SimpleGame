const spriteFrames = {
    run: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    jump: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    fight: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    crystal: Array.from({ length: 6 }, (_, i) => `${i + 1}`)
};

const spritePaths = {
    run: "./Char/Split_document/run/",
    jump: "./Char/Split_document/jump/",
    fight: "./Char/Split_document/fight/",
    crystal: "./Char/Split_document/potions/crystal/"
};

const platform = document.getElementById("platform");
const char = document.getElementById("Char");
const char2 = document.getElementById("Char2");
const crystals = document.querySelectorAll(".crystal");

let frameIndex = 0, charPosition = 0, isMoving = false, direction = "Right", fighting = false, jumping = false, pad = 340;
let moveInterval;

function preloadImages() {
    Object.keys(spriteFrames).forEach(action => {
        spriteFrames[action].forEach(frame => {
            const img = new Image();
            img.src = `${spritePaths[action]}${frame}.png`;
        });
    });
}

function updateCrystalAnimation() {
    let index = 0;
    const delay = 100;

    function animateCrystal(timestamp) {
        crystals.forEach(crystal => {
            crystal.src = `${spritePaths.crystal}${spriteFrames.crystal[index]}.png`;
        });
        index = (index + 1) % spriteFrames.crystal.length;
        setTimeout(() => requestAnimationFrame(animateCrystal), delay);
    }
    requestAnimationFrame(animateCrystal);
}

function animateCharacter() {
    if (jumping) return;

    char.src = `${spritePaths.run}${spriteFrames.run[frameIndex]}.png`;
    frameIndex = (frameIndex + 1) % spriteFrames.run.length;
    charPosition += direction === "Right" ? 10 : -10;
    char.style.left = `${charPosition}px`;
}

function animateFight() {
    if (fighting) return;
    fighting = true;

    let index = 0;
    const fightInterval = setInterval(() => {
        char.src = `${spritePaths.fight}${spriteFrames.fight[index++]}.png`;
        if (index === spriteFrames.fight.length) {
            clearInterval(fightInterval);
            fighting = false;
        }
    }, 150);
}

function animateJump() {
    if (jumping) return;
    jumping = true;

    let index = 0;
    const jumpInterval = setInterval(() => {
        char.src = `${spritePaths.jump}${spriteFrames.jump[index]}.png`;
        char2.style.top = `${pad}px`;
        pad += index < 4 ? -12 : 12;
        index++;

        if (index === spriteFrames.jump.length) {
            clearInterval(jumpInterval);
            jumping = false;
        }
    }, 120);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "d" || event.key === "ArrowRight") {
        direction = "Right";
        char.style.transform = "scaleX(1)";
        if (!isMoving) {
            isMoving = true;
            moveInterval = setInterval(animateCharacter, 50);
        }
    }

    if (event.key === "a" || event.key === "ArrowLeft") {
        direction = "Left";
        char.style.transform = "scaleX(-1)";
        if (!isMoving) {
            isMoving = true;
            moveInterval = setInterval(animateCharacter, 50);
        }
    }

    if (event.key === " ") animateJump();
    if (event.key === "x") animateFight();
});

document.addEventListener("keyup", (event) => {
    if (["d", "ArrowRight", "a", "ArrowLeft"].includes(event.key)) {
        isMoving = false;
        clearInterval(moveInterval);
        char.src = `${spritePaths.run}${spriteFrames.run[0]}.png`;
    }
});

preloadImages();
updateCrystalAnimation();
