const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const controlButtons = document.querySelectorAll(".button");
let start = false // start
;
diff_easy = false, diff_medium = false, diff_hard = false, screen_mode = 0, spawnHeartInt = 20000, menuThemeSwitch = false; // переключатедь музыки в меню, по умолч. вкл.             
let width = 800, height = 800, timer = 0; // timer 
// loading game resurse 
let asteroImg = new Image(); // create asteroid img
asteroImg.src = "./sprites/astero.png"; // asteroid img (астероид)
let playerShipImg = new Image(); // create player ship img
playerShipImg.src = "./sprites/player-ship.png"; // player ship img (астероид)
let bulletImg = new Image(); // create bullet img
bulletImg.src = "./sprites/bullet.png"; // bullet img (астероид)
let explImg = new Image(); // create collision sprites img
explImg.src = "./sprites/exp-sprites.png"; // collision sprites img (астероид)
let healthImg = new Image(); // create health img
healthImg.src = "./sprites/health.png"; // health img (астероид)
let spaceBackdround = new Image(); // create img for background
screen_mode === 0 // back images (фон)                 
 ? spaceBackdround.src = "./sprites/space-background.png" : spaceBackdround.src = "./sprites/space-background-16_9.png";
// loading all audio files
let menuTheme = loadAudio([
    "./audio/menu/menu-sound.mp3",
    "./audio/menu/menu-sound.wav",
    "./audio/menu/menu-sound.ogg"
], 0.2, true, false);
let battleTheme = loadAudio([
    "./audio/battle/battle-sound.mp3",
    "./audio/battle/battle-sound.wav",
    "./audio/battle/battle-sound.ogg"
], 0.1, true);
let shotSound = loadAudio([
    "./audio/shot/shot-sound.mp3",
    "./audio/shot/shot-sound.wav",
    "./audio/shot/shot-sound.ogg"
], 0.2);
let explSound = loadAudio([
    "./audio/expl/expl-sound.mp3",
    "./audio/expl/expl-sound.wav",
    "./audio/expl/expl-sound.ogg"
], 0.2);
let removeHealthSound = loadAudio([
    "./audio/health/remove-health.mp3",
    "./audio/health/remove-health.wav",
    "./audio/health/remove-health.ogg"
], 0.2);
let addHealthSound = loadAudio([
    "./audio/health/add-health.mp3",
    "./audio/health/add-health.wav",
    "./audio/health/add-health.ogg"
], 0.4);
let selectSound = loadAudio([
    "./audio/select/select-sound.mp3",
    "./audio/select/select-sound.wav",
    "./audio/select/select-sound.ogg"
], 0.2);
let gameOverSound = loadAudio([
    "./audio/menu/game-over.mp3",
    "./audio/menu/game-over.wav",
    "./audio/menu/game-over.ogg"
], 0.4);
// load audio (загрузка звуков)
function loadAudio(audArr, vol, loop, autoplay) {
    const audio = document.createElement("audio");
    for(let i = 0; i < audArr.length; i++){
        const source = document.createElement("source");
        source.src = audArr[i];
        audio.append(source);
    }
    audio.volume = vol || 1;
    audio.loop = loop;
    audio.autoplay = autoplay;
    let objMethod = {
        dom: false,
        state: "stop",
        play: function() {
            // this.dom.currentTime = 0;
            this.dom.play();
            this.state = "play";
        },
        pause: function() {
            this.dom.pause();
            this.state = "pause";
        },
        stop: function() {
            this.dom.pause();
            this.dom.currentTime = 0;
            this.state = "stop";
        }
    };
    objMethod.dom = audio;
    return objMethod;
}
// return all requestAnimationFrame (google, moz. webkit, opera, ms)
let animationGameLoop = function() {
    return requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame || function(callback) {
        window.setInterval(callback, 1000 / 60);
    };
}();
// main game loop call 
spaceBackdround.addEventListener("load", ()=>{
    canvas.width = width;
    canvas.height = height;
    // all control buttons
    controlButtons.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            // easy dif
            if (btn.classList.contains("_easy")) {
                selectSound.stop();
                selectSound.play();
                console.log("difficult easy");
                document.querySelector(".game__menu").classList.add("_hidden");
                menuTheme.stop();
                battleTheme.play();
                diff_easy = true;
            }
            // medium dif
            if (btn.classList.contains("_medium")) {
                selectSound.stop();
                selectSound.play();
                console.log("difficult medium");
                document.querySelector(".game__menu").classList.add("_hidden");
                menuTheme.stop();
                battleTheme.play();
                diff_medium = true;
            }
            // hard dif
            if (btn.classList.contains("_hard")) {
                selectSound.stop();
                selectSound.play();
                console.log("difficult hard");
                document.querySelector(".game__menu").classList.add("_hidden");
                menuTheme.stop();
                battleTheme.play();
                diff_hard = true;
            }
            // menu switch music
            if (btn.classList.contains("music-switch")) {
                if (!menuThemeSwitch) {
                    selectSound.stop();
                    selectSound.play();
                    menuTheme.play();
                    btn.classList.add("_active");
                    btn.textContent = "mute";
                    menuThemeSwitch = !menuThemeSwitch;
                } else {
                    selectSound.stop();
                    selectSound.play();
                    menuTheme.stop();
                    btn.classList.remove("_active");
                    btn.textContent = "menu music";
                    menuThemeSwitch = !menuThemeSwitch;
                }
            }
            // menu screen switch 
            if (btn.classList.contains("win-mode")) {
                document.querySelector(".game__box").classList.toggle("_fullscreen");
                if (document.querySelector(".game__box").classList.contains("_fullscreen")) {
                    document.querySelector(".wrapper").style.display = "block";
                    screen_mode = 1;
                } else {
                    document.querySelector(".wrapper").style.display = "flex";
                    screen_mode = 0;
                }
                // back images(фон)  
                screen_mode === 0 ? spaceBackdround.src = "./sprites/space-background.png" : spaceBackdround.src = "./sprites/space-background-16_9.png";
            }
            // back to menu
            if (btn.classList.contains("_back")) {
                console.log("back to menu ");
                document.querySelector(".game__lose").classList.add("_hidden");
                selectSound.play();
                setTimeout(()=>{
                    window.location.reload(); // reload page (перезагружаем страницу)
                }, 300);
            }
        });
    });
    gameLoop();
});
// game loop
function gameLoop() {
    update();
    render();
    animationGameLoop(gameLoop);
}
// game update 
function update() {
    timer++;
    if (dead == false) {
        if (diff_easy) {
            // easy
            start = true;
            moveAstero(-2, 2, 1, 2, 10); // min speed X = -2, max speed X = 2; min speed Y = 1, max speed X = 2; freq(частота - 10)
        } else if (diff_medium) {
            // medium
            start = true;
            spawnHeartInt = randomValue(10000, 20000);
            moveAstero(-3, 3, 2, 4, 6); // min speed X = 2, max speed X = 4; min speed Y = 2, max speed X = 6; freq(частота - 6)
        } else if (diff_hard) {
            //  hard
            start = true;
            spawnHeartInt = randomValue(10000, 20000);
            moveAstero(-4, 4, 4, 6, 3); // min speed X = 4, max speed X = 6; min speed Y = 4, max speed X = 6; freq(частота - 3)
        }
        mouseMovePlayer();
        moveHearts();
        createFire();
        moveFire();
        animCollision();
    }
}
// check health (проверка столкновения корабля с астероидом)
let checkHealthInterval = setInterval(()=>{
    checkCollision();
}, 250);
// spawn hearth
let spawnHearth = setInterval(()=>{
    if (start) {
        spawnHeartInt = Math.round(randomValue(1000, 5000));
        createHearts(-1, 1, 1, 1);
    }
}, spawnHeartInt);
// game render
function render() {
    if (screen_mode === 1) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    } else {
        width = 800;
        height = 800;
        canvas.width = width;
        canvas.height = height;
    }
    //  draw background
    ctx.drawImage(spaceBackdround, 0, 0, width, height);
    //  create fire
    for(i in fire)ctx.drawImage(bulletImg, fire[i].x, fire[i].y, fire[i].width, fire[i].height);
    // draw player ship
    ctx.drawImage(playerShipImg, playerShip.x, playerShip.y, playerShip.width, playerShip.height);
    //  create asteroid
    for(i in astero)ctx.drawImage(asteroImg, astero[i].x, astero[i].y, astero[i].width, astero[i].height);
    //  create heart
    for(i in hearts)ctx.drawImage(healthImg, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
    // draw expl
    for(i in expl)ctx.drawImage(explImg, 170 * Math.floor(expl[i].animX), 170 * Math.floor(expl[i].animY), 170, 170, expl[i].x, expl[i].y, expl[i].width, expl[i].height);
    // draw health
    for(i in health)ctx.drawImage(healthImg, health[i].x, health[i].y, health[i].width, health[i].height);
    // score
    drawText(`Score: ${score}`, 20, 35, "18px", "#fff");
    // record
    drawText(`Record: ${record}`, 20, 45, "18px", "#fff");
}
// ---------------------------  Settings  ---------------------------
let dead = false; // dead or life
let collision = false; // collisions (столкновения)
let isMouseDown = false; // mouse is down (зажата ли лкм)
let score = 0; // score (очки)
let record = localStorage.getItem("record_score") // record (рекордные очки)
 ? localStorage.getItem("record_score") : 0;
let astero = []; // asteroids (астероиды)
let fire = []; // fire (выстрели)
let expl = []; // expl (взрывы)
let health = []; // health (жизни)
let hearts = []; // hearts (сердечки)
// bullet (пуля)
let fireDX = 0, fireDY = -5, fireWidth = 10, fireHeight = 45, freqSFire = 20; // freq speed bullet (чвстота доп. выстрелов)
// asteroid
let asteroY = -100, asteroDX = 1, asteroDY = 1, asteroWidth = 65, asteroHeight = 65; // height asteroid (высота пули) - st. 85
// health info
let healthX = 20, healthY = 75, healthWidth = 25, healthHeight = 22, quanituHealth = 3; // quanity health (количество жизней) - st. 3
// heart
let heartY = -100, heartWidth = 25, heartHeight = 22, heartDX = 1, heartDY = 1; // change heart y (изменение положение пули по y)
// player (игрок)
let playerShip = {
    x: width / 2 - 50,
    y: height / 2 - 30,
    width: 100,
    height: 60 // payer ship height (standart - 50)
};
// if mouse down (проверка на зажатую лкм)
canvas.onmousedown = function() {
    isMouseDown = true;
};
// if mouse up (проверка на отпущенную лкм)
canvas.onmouseup = function() {
    isMouseDown = !isMouseDown;
};
// draw text function (рисуем счет на поле)
let drawText = (text, posX, posY, fSize, color)=>{
    ctx.fillStyle = color;
    ctx.font = `${fSize} Joystix Monospace`;
    ctx.fillText(text, posX, posY);
    ctx.textBaseline = "top";
};
// createHealth (создание полоски жизней на поле)
function createHealth() {
    for(let i = 0; i < quanituHealth; i++){
        health.push({
            x: healthX,
            y: healthY,
            width: healthWidth,
            height: healthHeight // health height (standart - 22px)
        });
        healthX += 35;
    }
}
createHealth();
// player move (движение игрока)
function mouseMovePlayer() {
    canvas.addEventListener("mousemove", (e)=>{
        playerShip.x = e.offsetX - playerShip.width / 2;
        playerShip.y = e.offsetY - playerShip.height / 2;
    });
}
// create hearts (создание падающих хилок)
function createHearts(minSX, maxSX, minSY, maxSY) {
    hearts.push({
        x: Math.random() * (width - heartWidth - 1) + 1,
        y: heartY,
        dx: heartDX,
        dy: heartDY,
        speedX: Math.random() * (maxSX - minSX + 1) + minSX,
        speedY: Math.random() * (maxSY - minSY + 1) + minSY,
        width: heartWidth,
        height: heartHeight,
        add: false
    });
}
// move hearts (движение падающих хилок)
function moveHearts() {
    if (hearts != 0) for(i in hearts){
        hearts[i].y += hearts[i].dy * hearts[i].speedY;
        hearts[i].x += hearts[i].dx * hearts[i].speedX;
        //borders
        if (hearts[i].x >= width - hearts[i].width || hearts[i].x <= 0) hearts[i].dx = -hearts[i].dx;
        //  del heart
        if (hearts[i].y > height + hearts[i].height) hearts.splice(i, 1);
    }
}
// create fire bullet (создание выстрелов)
function createFire() {
    if (isMouseDown && timer % freqSFire === 0) {
        shotSound.stop(); // stop shot sound 
        shotSound.play(); // start shot sound
        // bullet 1
        fire.push({
            x: playerShip.x + playerShip.width / 2 - 5,
            y: playerShip.y,
            dx: fireDX,
            dy: fireDY,
            width: fireWidth,
            height: fireHeight
        });
    }
}
// move fire bullet (движение выстрелов)
function moveFire() {
    for(i in fire)if (fire != 0) {
        fire[i].y += fire[i].dy;
        fire[i].x += fire[i].dx;
        //  del bullet
        if (fire[i].y < -fire[i].h) fire.splice(i, 1);
    }
}
// check collision with player (проверка на столкновение астероида с игроком)
function checkCollision() {
    // collision with astero
    for(i in astero)if (astero[i].x + astero[i].width / 1.4 >= playerShip.x && astero[i].x <= playerShip.x + playerShip.width / 1.4 && astero[i].y + astero[i].height / 1.4 >= playerShip.y && astero[i].y <= playerShip.y + playerShip.height / 1.4) {
        collision = true; // столкновение
        astero[i].del = true;
        // add collision (добовляем взрыв астероида при столкновении с player)
        expl.push({
            x: astero[i].x,
            y: astero[i].y,
            width: 110,
            height: 110,
            animX: 0,
            animY: 0
        });
        // del astero (удаляем асероид при столкновении с player)
        if (astero[i].del) {
            astero.splice(i, 1);
            explSound.stop();
            explSound.play();
        }
        //  отнимаем жизнь при столкновении
        if (collision && health.length > 0) {
            removeHealthSound.stop();
            removeHealthSound.play();
            quanituHealth--;
            health.pop();
        }
        // dead (смерть)
        if (collision && health.length == 0) {
            start = false;
            dead = true;
            battleTheme.stop();
            gameOverSound.play();
            document.querySelector(".game__lose").classList.remove("_hidden");
            document.querySelector(".score").textContent = score;
            console.log("Oops!It seems you lost^-^");
            // Save current score
            if (score >= record) localStorageProcessing("set", "record_score", score);
        }
    }
    // collision with hearts
    for(i in hearts){
        if (hearts[i].x + hearts[i].width >= playerShip.x && hearts[i].x <= playerShip.x + playerShip.width / 1.4 && hearts[i].y + hearts[i].height >= playerShip.y && hearts[i].y <= playerShip.y + playerShip.height / 1.4) {
            if (health.length < 3) {
                hearts.splice(i, 1);
                quanituHealth++;
                health = [];
                healthX = 20;
                addHealthSound.play();
                createHealth();
            }
        }
    }
}
// localStorage
function localStorageProcessing(action, nameStorge, data) {
    if (action === "set") localStorage.setItem(nameStorge, JSON.stringify(data));
    else localStorage.getItem(nameStorge, JSON.parse(data));
}
// collision (анимация столкновения)
function animCollision() {
    for(i in expl){
        expl[i].animX = expl[i].animX + 0.3;
        if (expl[i].animX > 6) {
            expl[i].animY++;
            expl[i].animX = 0;
        }
        if (expl[i].animY > 6) expl.splice(i, 1);
    }
}
// move asteroid (движение астероидов)
function moveAstero(minSX, maxSX, minSY, maxSY, freq) {
    if (timer % freq == 0) astero.push({
        x: Math.random() * (width - asteroWidth - 1) + 1,
        y: asteroY,
        dx: asteroDX,
        dy: asteroDY,
        width: asteroWidth,
        height: asteroHeight,
        speedX: Math.random() * (maxSX - minSX + 1) + minSX,
        speedY: Math.random() * (maxSY - minSY + 1) + minSY,
        angle: 0,
        del: false
    });
    for(i in astero){
        astero[i].x += astero[i].dx * astero[i].speedX; // move astero x
        astero[i].y += astero[i].dy * astero[i].speedY; // move astero y
        // borders
        if (astero[i].x >= width - astero[i].width || astero[i].x <= 0) astero[i].dx = -astero[i].dx;
        if (astero[i].y >= height + astero[i].height) astero.splice(i, 1);
        // collision asteroid with bullet
        for(j in fire)if (Math.abs(astero[i].x + astero[i].width / 2 - fire[j].x - fire[j].width / 2) < astero[i].width && Math.abs(astero[i].y - fire[j].y) < astero[i].height) {
            explSound.stop(); // останавливаем звук предыдущего взрыва
            // add collision
            expl.push({
                x: astero[i].x,
                y: astero[i].y,
                width: 110,
                height: 110,
                animX: 0,
                animY: 0
            });
            astero[i].del = true;
            fire.splice(j, 1);
            explSound.play(); // звук взрыва 
            score++;
            break;
        }
        if (astero[i].del) astero.splice(i, 1); // del astero
    }
}
// generate random values
function randomValue(min, max) {
    return Math.random() * (max - min + 1) + min;
}
// custom cursor function
let customCursor = function() {
    const cursorPoint = document.querySelector(".cursor-point");
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e)=>{
        let mouseX = e.pageX, mouseY = e.pageY, target = e.target;
        if (target == document.getElementById("canvas")) {
            cursorPoint.style.display = "none";
            cursor.style.display = "none";
        } else {
            cursorPoint.style.display = "block";
            cursor.style.display = "block";
        }
        cursorPoint.style.left = mouseX + "px";
        cursorPoint.style.top = mouseY + "px";
        setTimeout(()=>{
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        }, 50);
        if (target.closest(".button")) {
            cursor.classList.add("cursor_active");
            cursorPoint.classList.add("cursor-point_active");
        } else {
            cursor.classList.remove("cursor_active");
            cursorPoint.classList.remove("cursor-point_active");
        }
    });
}();

//# sourceMappingURL=index.24b8d12c.js.map
