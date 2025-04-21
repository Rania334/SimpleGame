let run = ["1", "2", "3", "4", "5", "6", "7", "8"];
let jump = ["1", "2", "3", "4", "5", "6", "7", "8"];
let fight = ["1", "2", "3", "4", "5", "6", "7", "8"];
let crystalPic = ["1", "2", "3", "4", "5", "6"];
let runfile = "./Char/Split_document/run/";
let jumpfile = "./Char/Split_document/jump/";
let fightfile = "./Char/Split_document/fight/";
let crystalfile = "./Char/Split_document/potions/crystal/"
let CharDie = "./Char/Split_document/dk/"
let doorFiles = "./Tiles/Door/"
let keyFiles = "./Char/Split_document/key/"
let monestorsfile = "./Char/Split_document/monsters/Slimes/SlimeOrange/"
let platforms = document.querySelectorAll(".platform");
let progress = document.querySelectorAll("progress");
let CountCry = document.getElementById("CountCry");
let Key = document.querySelectorAll(".key");
let monestors = document.querySelectorAll(".monestor")
let Game = document.getElementById("Game")
let Door = document.querySelectorAll(".Door")
let Char = document.getElementById("Char");
let Char2 = document.getElementById("Char2");
let crystal = document.querySelectorAll(".crystal")
let n = 0;
let k = 0;
let pic1 = 1;
let HealthBar = 1000
let keyNum = 0;
let moveInterval;
let isMoving = false;
let dirc = "Right"
let fighting = false
let plat;

function StartGame(){
    window.location.href = "./level1.html";
}
function preloadImages() {
    crystalPic.forEach((pic) => {
        const img = new Image();
        img.src = crystalfile + pic + ".png";
    });
}



function Dying() {
    let lastTime = 0;
    const delay = 500;
 

    function Dying(timestamp) {

        if (!lastTime) lastTime = timestamp;

        const elapsed = timestamp - lastTime;

        if (elapsed > delay) {
            if (HealthBar <= 0) {
                let death = setInterval(function () {
                    if (pic1 <= 8) {
                        Char.src = CharDie + pic1 + ".png";
                        console.log(Char.src);
                        pic1++;
                    }
                    if (pic1 > 8) {
                        Char.style.display = 'none';
                        clearInterval(death)
                    }
                }, 1000);
            }


            lastTime = timestamp;
        }
        requestAnimationFrame(Dying);


    }

    requestAnimationFrame(Dying);
}
Dying();



function crystalfun() {
    let index = 0;
    let lastTime = 0;
    const delay = 100;
    num = 1
    numDoor = 1
    numKey = 1
    numCry = 0
    HealthBar = 1000

    function updateCrystal(timestamp) {
        crystal.forEach(element => {
            if (isColliding(Char, element)) {
                element.style.display = 'none'
                numCry++
                CountCry.innerHTML = "crystal: " + numCry

            }
        });
        Door.forEach(element => {
            if (isColliding(Char, element) && keyNum == 1) {
                if (window.location.pathname.includes("level2.html")) {
                    alert("You won!");
                } else {
                    document.getElementById("ins").innerHTML="Loading ....."


                    window.location.href = "./level2.html";
                }
            }
            else if(isColliding(Char, element) && keyNum==0){
                document.getElementById("ins").innerHTML="Please pick up the Key"
                document.getElementById("ins").style.color="red"
            }
        });

        Key.forEach(element => {
            if (isColliding(Char, element)) {
                console.log(Key)
                element.style.display = 'none'
                keyNum = 1;

            }
        });

        monestors.forEach(element => {
            if (isColliding(Char, element)) {
                console.log(HealthBar)
                progress[0].value = HealthBar / 10
                HealthBar = HealthBar - .20


            }
        });

        if (!lastTime) lastTime = timestamp;

        const elapsed = timestamp - lastTime;

        if (elapsed > delay) {

            monestors.forEach(monestor => {

                monestor.src = monestorsfile + `${num}` + ".png";
                if (num < 30) {
                    num++;
                }
                else { num = 1 }

            });
            Key.forEach(element => {

                element.src = keyFiles + `${numKey}` + ".png";
                if (numKey < 33) {
                    numKey++;
                }
                else { numKey = 1 }

            });
            Door.forEach(element => {

                element.src = doorFiles + `${numDoor}` + ".png";
                if (numDoor < 8) {
                    numDoor++;
                }
                else { numDoor = 1 }

            });
            crystal.forEach(element => {

                element.src = crystalfile + crystalPic[index] + ".png";
                index = (index + 1) % crystalPic.length; 
                lastTime = timestamp; 

            });

        }

        requestAnimationFrame(updateCrystal);
    }

    requestAnimationFrame(updateCrystal);
}
preloadImages();
crystalfun();
function animateCharacter() {
    const gameRect = Game.getBoundingClientRect();
    const charRect = Char.getBoundingClientRect();

    if (!jumping) {
        Char.src = runfile + run[n] + ".png";
        n++;
        if (n == 8) {
            n = 0;
        }
    }
    if (dirc == "Right" && charRect.right < gameRect.right) {
        Char.style.left = k + 'px';
        k += 10;
    }
    else if (dirc == "Left" && charRect.left > gameRect.left) {
        Char.style.left = k + 'px';
        k -= 10;
    }
    Array.from(platforms).forEach(platform => {

        isBottom(platform, Char);

    });


}

function animateCharacterFight() {
    if (fighting) return;
    fighting = true;

    let index = 0;
    let jumpInterval = setInterval(() => {
        Char.src = fightfile + fight[index] + ".png";
        index++;



        if (index === jump.length) {
            clearInterval(jumpInterval);
            fighting = false;
        }

    }, 90);
}
inTop = false
let jumping = false;
let pad = 340;
function animateCharacterJump() {
    if (jumping) return;
    jumping = true;

    let index = 0;
    let jumpInterval = setInterval(() => {
        if (index >= 4 && index <= 8) {
            Char.src = jumpfile + jump[index] + ".png";
            index++;
            Char2.style.top = pad + 'px';
            pad = pad + 18;
        }
        else if (index < 4) {
            Char.src = jumpfile + jump[index] + ".png";
            index++;
            Char2.style.top = pad + 'px';
            pad = pad - 18;
        }


        if (index === jump.length) {
            clearInterval(jumpInterval);
            Char2.style.top = pad + 'px';
            jumping = false;
        }

        Array.from(platforms).forEach(platform => {
            const obsRect = platform.getBoundingClientRect();

            if (isTop(Char, platform)) {
                if (!inTop) {
                    clearInterval(jumpInterval);
                    Char.src = jumpfile + jump[0] + ".png";
                    pad = parseFloat(obsRect.top) - 40;
                    jumping = false;
                    Char2.style.top = pad + 'px';
                    inTop = true;
                }
            }
        });
    }, 130);

}



document.addEventListener("keydown", (event) => {





    if ((event.key === "d" || event.key === "ArrowRight") && !isMoving) {
        dirc = "Right"

        isMoving = true;
        Char.style.transform = "scaleX(1)";
        moveInterval = setInterval(animateCharacter, 50);

    }
    else if ((event.key === "a" || event.key === "ArrowLeft") && !isMoving) {
        dirc = "Left"
        isMoving = true;
        // console.log("Key down")
        Char.style.transform = "scaleX(-1)";
        moveInterval = setInterval(animateCharacter, 50);
    }
    if ((event.key === " ")) {
        animateCharacterJump()
    }
    if ((event.key === "x")) {
        animateCharacterFight()
        monestors.forEach(element => {
            // if(isClose(Char, element)){
            //     console.log("Is Close")
            // }
            if (isColliding(Char, element)) {
                element.style.transition = "opacity 2s ease-out";
                element.style.opacity = "0";
                setTimeout(() => {
                    element.style.display = 'none';
                }, 2000); 
            }
        });
    }

});

document.addEventListener("keyup", (event) => {

    // console.log(event.key)

    if (event.key === "d" || event.key === "ArrowRight") {
        isMoving = false;
        Char.style.transform = "scaleX(1)";
        Char.src = runfile + run[0] + ".png";
        clearInterval(moveInterval);
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
        isMoving = false;
        Char.style.transform = "scaleX(-1)";
        Char.src = runfile + run[0] + ".png";
        clearInterval(moveInterval);
    }
});

function isColliding(character, obstacle) {
    const charRect = character.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    return !(
        charRect.top > obsRect.bottom ||
        charRect.bottom < obsRect.top ||
        charRect.right < obsRect.left ||
        charRect.left > obsRect.right
    );
}
// function isClose(character, obstacle) {
//     const charRect = character.getBoundingClientRect();
//     const obsRect = obstacle.getBoundingClientRect();
//     console.log(charRect.right-10)

//     return !(
//         charRect.top > obsRect.bottom ||
//         charRect.bottom < obsRect.top ||
//         charRect.right+20 < obsRect.left ||
//         charRect.left-20 > obsRect.right
//     );
// }

function isBottom(obsRect, charRect) {
    charRect = charRect.getBoundingClientRect();
    obsRectDir = obsRect.getBoundingClientRect();

    if (obsRectDir.right < charRect.right) {
    }
    if (obsRectDir.left > charRect.left) {

    }
    let fall; 

    if ((obsRectDir.right < charRect.right || obsRectDir.left > charRect.left) && obsRectDir.top === charRect.bottom) {
        if (obsRect === plat) {
            let x = 4; 
            fall = setInterval(() => {
                if (x >= 4 && x < 8) {
                    Char.src = jumpfile + jump[x] + ".png";
                    Char2.style.top = pad + 'px';
                    if (pad <= 340) { pad = pad + 10; }
                } else {
                    clearInterval(fall); 
                    pad = 340;
                    Char2.style.top = pad + 'px';
                    inTop = false;
                }
                x++;
            }, 100);    

        }
    }





}

function isTop(character, obstacle) {
    const charRect = character.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (charRect.bottom <= obsRect.top &&
        charRect.right >= obsRect.left &&
        charRect.left <= obsRect.right) {
        plat = obstacle;
    }


    return (
        charRect.bottom <= obsRect.top &&
        charRect.right >= obsRect.left &&
        charRect.left <= obsRect.right
    );
}


crystalfun()