
let actualPlayerXP = 0;
let maxPlayerXP = 100;
// * XP VALUE, if actual is > to max, then LEVEL UP
const updatePlayerLevel = (char) => {
    if(actualPlayerXP >= maxPlayerXP){
        let valueMultiplier = 1.2;
        actualPlayerXP -= maxPlayerXP;
        char.level ++;
        char.health.maxHealth = Math.floor(char.health.maxHealth * valueMultiplier);
        char.health.actualHealth = Math.floor(char.health.actualHealth * valueMultiplier);
        maxPlayerXP = Math.floor(maxPlayerXP * valueMultiplier);
    }
}


let playerSpeed = 5;
let playerCanInteract = true;
