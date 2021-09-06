const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let player = {
    speed: 5, score: 0
};
let keys = {
      ArrowUp: false
    , ArrowDown: false
    , ArrowRight: false
    , ArrowLeft: false
    , KeyX: false
};
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moveLines() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

function moveEnemy(car) {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log("HIT");
            endGame();
        }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            // item.style.backgroundColor = randomColor();
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame() {
  
    let car = document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road = gameArea.getBoundingClientRect();
    console.log(player.y);
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y < 447) {
            player.y += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed
        }
        if (keys.x){
        player.speed++;
        }else{
       player.speed;
        }
    
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score:" + player.score;
    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}
function endGame() {
    player.start = false;
    score.innerHTML = "Game Over<br>Score was " + player.score
    startScreen.classList.remove("hide");
    player.speed=5;
}

function start() {
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (x * 150) + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    //car.innerText = "Car";
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // for 3 randome cars..

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        let enemy = ["y.png", "carr.png", "r.png"];
        console.log(enemy[x]);
        // document.getElementsByClassName('enemy').style.backgroundColor="";
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = (enemyCar.y) + "px";
        enemyCar.style.backgroundImage = `url(${enemy[x]})`;
        // enemyCar.style.backgroundColor = randomColor(); 
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar).src = enemy[x];
    }


}
// function randomColor() {
//     function c() {
//         let hex = Math.floor(Math.random() * 256).toString(16);
//         return ("0" + String(hex)).substr(-2)
//     }
//     return "#" + c() + c() + c();
// }

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return (("0" + String(hex)).substr(-2));
    }
    return "#" + c() + c() + c();
}
