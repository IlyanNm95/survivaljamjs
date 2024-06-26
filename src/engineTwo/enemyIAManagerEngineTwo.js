function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const runIaTurn = () => {

    if(actualMapEngineTwo.entityOnTactical[whichEntityTurn].state === "dead")
    {
        endTurn();
        return;
    }

    let entityIa = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
    return runIaPattern(entityIa)
    
}

 const runIaPattern = (entityIa) => {
    
    switch(entityIa.pattern)
    {
        case 'normal' : 
            return runStandardIaPattern(entityIa, 65); // 65 % to go on the player else moove randomly
        case 'aggressive' : 
            return runStandardIaPattern(entityIa, 100); // Agressive just run on the player
        case 'aggro-passive' : 
            return runStandardIaPattern(entityIa, 0); // Moove randomly
        default :
            throw new Error("Entity Ia Pattern isn't defined or doesnt exist : " + entityIa.pattern)
    }
}


const runStandardIaPattern = (entityIa, chance) => {

    if(attackIA(entityIa) === false)
    {
        return mooveOneCaseIA(entityIa, chance)
    } 
    return true
}


const mooveOneCaseIA = (entityIa , chance) => {
    if(entityIa.pm <= 0)
    {
        return false;
    }
    entityIa.pm -= 1;
    entityIa.pos = [Math.round(entityIa.pos[0]), Math.round(entityIa.pos[1])]; 
    // I'm rounding it cause i don't want to have bug like "Entity pos isn't an int"
    let movableIaCase = getMovableCase(entityIa.pos[0], entityIa.pos[1], 1)
    let casePlayer = actualMapEngineTwo.entityOnTactical[0].pos;
    let nextCase;
    let chosedPath = 0;

    let pathLuck = getRandomInt(100)

    if(pathLuck > (100 - chance)){
        for(let i = 0; i < movableIaCase.length; i ++)
        {
            let caseX = Math.abs(movableIaCase[i][0] - casePlayer[0]);
            let caseY = Math.abs(movableIaCase[i][1] - casePlayer[1]);
            let sumCase = caseX + caseY;
            if((Math.abs(movableIaCase[chosedPath][0] - casePlayer[0]) + Math.abs(movableIaCase[chosedPath][1] - casePlayer[1])) > sumCase){
                chosedPath = i;
            }
        } // ? Pattern Path finding
    }else{
        chosedPath = getRandomInt(movableIaCase.length -1)+1; // Random Path
    }

    // 65 % To get the perfect path

    nextCase = movableIaCase[chosedPath];
    resetMovableCase()
    setEntityNextCase(entityIa, nextCase)
    return true;
}

const attackIA = (entityIa, indexAbilityUsed = 0) => {

    let selectAbilityIa = indexAbilityUsed;
    let attackableCase = getAttackableCase(entityIa.pos[0], entityIa.pos[1], entityIa.abilities[selectAbilityIa].range);
    let target = null;
    for(let i = 0; i < attackableCase.length; i++)
    {
        if(getSpriteTactical(attackableCase[i][0], attackableCase[i][1]) !== null)
        {
            if(getSpriteTactical(attackableCase[i][0], attackableCase[i][1]).id === 0)
            {
                target = getSpriteTactical(attackableCase[i][0], attackableCase[i][1]); // Select the target 
            }
        }
    }
    if(target !== null){
        resetAttackableCase() // Reset the variable of attack
        return launchAttack(entityIa, actualMapEngineTwo.entityOnTactical[0], selectAbilityIa); 
        // I don't need to verify if the PA is > 0 cause it already does in the launch attack function 
    }
    resetAttackableCase()  // Reset the variable of attack
    return false; // Return if a target has been selected or not
    
    
}
