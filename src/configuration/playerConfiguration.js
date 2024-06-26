let playerState = PlayerStateEnum.Normal;

//#region // * Engine One Player configuration

let playerSpriteSize = 100;

let playerCanMove = true;
let playerSpeed = 5;

let playerCanInteract = true;
let playerIsExploringMap = false;



// Player anim
let playerIsMooving = false;
let playerDirection = [0, 0]; // stock the direction of the player in a array
let playerLastDirection = [0, -1]; // orientation naturally down
// Player anim

let playerTeam = [
    {
        name : "You",
        level : 1,
        health : {
            actualHealth : 50,
            maxHealth : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                abilityLevel : 2,
                baseAmount : 10,
                id : 1,
                range : 2,
                isLocked : false
            },
            {
                name : "Heal",
                type : "heal",
                abilityLevel : 1,
                baseAmount : 8,
                id : 4,
                range : 5,
                isLocked : true
            },
            {
                name : "SuperAttack",
                type : "superAttack",
                abilityLevel : 2,
                baseAmount : 50,
                id : 5,
                range : 1,
                isLocked : true
            }
        ],
        isAlive : true,
        state : "idle"
    }
]

//#endregion
