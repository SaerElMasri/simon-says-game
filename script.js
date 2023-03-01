const color_arr = ["red", "blue", "yellow", "green"];
let game_pattern = [];
let user_pattern = [];
let level = 0;
let gameStatus = false;
document.querySelector("#level-title").textContent = "Welcome To Simon Says, press any key to start";
document.addEventListener("keypress", () => {
    if(!gameStatus){
        document.querySelector("#level-title").textContent =`Level ${level}`;
        nextSequence();
        gameStatus = true;
    }
});
const nextSequence =() => {
    user_pattern = [];
    level++;
    document.querySelector("#level-title").textContent =`Level ${level}`;
    const random_index = Math.floor(Math.random() * 4);
    const random_color = color_arr[random_index];
    game_pattern.push(random_color);
    console.log(game_pattern);
    document.querySelector(`.${random_color}`).classList.add("clicked");
    setTimeout(() =>{
        document.querySelector(`.${random_color}`).classList.remove("clicked");
    }, 100);    
};
const buttons_user = document.querySelectorAll(".btn");
buttons_user.forEach((btn) => {
    btn.addEventListener("click", () => {
        //Get color clicked
        const colorClicked = btn.getAttribute("id");
        //Push the color clicked to the user array
        user_pattern.push(colorClicked);
        //Animated click
        soundEffect(colorClicked);
        colorPressedAnimation(colorClicked);
        //Check game_arr and user_arr. From last index
        checkAnswer(user_pattern.length - 1);
    });
});
const checkAnswer = (currentLevel) => {
    //Check if the color in the current index is equal in both arrays
    if(game_pattern[currentLevel] == user_pattern[currentLevel]){
        //Check if the game array and user array are equal in lenghts
        if(game_pattern.length == user_pattern.length){
            setTimeout(() =>{
                //Create a new level if both arrays are equal
                nextSequence();
            }, 1000)
        }
    }else{
        //Error background
        soundEffect('wrong');
        document.querySelector(".container").classList.add("game-over");
        //reset background
        setTimeout(()=>{
            document.querySelector(".container").classList.remove("game-over");
        },1000);
        //title error
        document.querySelector("#level-title").textContent = "Game Over, press any key to restart";
        //restart game
        restartGame();
    }
};
const restartGame = () => {
    gameStatus = false;
    game_pattern = [];
    level = 0;
};
const colorPressedAnimation = (button) => {
    document.querySelector(`#${button}`).classList.add("clicked");
    setTimeout(() => {
        document.querySelector(`#${button}`).classList.remove("clicked");
    }, 100);
};
const soundEffect = (sound) => {
    const audio = new Audio(`sounds/${sound}.mp3`);
    audio.play();
};
