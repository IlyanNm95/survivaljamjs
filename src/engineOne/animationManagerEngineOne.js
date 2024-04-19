const animationIdleSprite = (positionX, positionY, size, direction, id = 0) => {
    let idleSpriteAnimation;
    
    switch(direction.toString()){
        case "1,0":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut,spriteSizeCut,spriteSizeCut)
            break;
        case "-1,0":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut*2,spriteSizeCut,spriteSizeCut)
            break;
        case "0,-1":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut*3,spriteSizeCut,spriteSizeCut)
            break;
        case "0,1":
            idleSpriteAnimation = spritesData[id].image.get(0,0,spriteSizeCut,spriteSizeCut)
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the lastDirection var, id of sprites : " +  id);
    }

    image(idleSpriteAnimation, positionX, positionY, size, size)
}




const animationMooveSprite = (positionX, positionY, size, direction, id = 0) => {
    
    if(direction.length > 2)
    {
        throw new Error("Direction isn't an array that contains x, y. It contains other elements. id of sprite failed to animate : " + id)
    }
    switch(direction[0]){
        case 1 :
            setEntityLastDirection([1, 0], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case -1 :
            setEntityLastDirection([-1, 0], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the X direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for X direction

    switch(direction[1]){
        case -1 :
            setEntityLastDirection([0,-1], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case 1 :
            setEntityLastDirection([0, 1], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
         default :
            throw new Error("failed to animate the sprite, there is an error in the Y direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for Y direction

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}



const setEntityLastDirection = (direction, entityId) => {
    /**
     * This function set the last direction of an entity
     */
    if(entityId === 0)
    {
        playerLastDirection = direction;
    }else{
        // TODO : Set the entity (other than the player) last direction here
    }
}


const animationFightSprite = (positionX, positionY, size, attackType = 0, id = 0) => {

    if(attackType < 0 || attackType > 3)
    {
        throw new Error("Tried to animate an attack that didn't exist on the sprite sheet");
    }

    const fightAmount = 4 + attackType; // FightAmount is the postion of the row

    xStartCut = spriteSizeCut*Math.floor(playerFightAnimationIndex);
    
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* fightAmount,spriteSizeCut,spriteSizeCut);

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    return updateFightAnimationIndex();
}



const animationDeadSprite = (positionX, positionY, size, id = 0) => {

    let offsetAnimAmount = 8;
    xStartCut = 0;
    // Dead animation just have one direction
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}




const runSpecificAnimationFromASprite = (positionX, positionY, size, countOfFrame, speedFrame, indexAnimation = 0, id = 0) => {

    let offsetAnimAmount = 8+indexAnimation;
    xStartCut = 0+spriteSizeCut*Math.floor(specificAnimationIndex);
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);
    if(speedFrame === 0)
    {
        spritePlayerAnimationMoove = spritesData[id].image.get(30*(countOfFrame-1),spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);
        image(spritePlayerAnimationMoove, positionX, positionY, size, size)
        return;
    }
    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    return updateSpecialAnimationIndex(countOfFrame, speedFrame/1.5);
}


const updateFightAnimationIndex = () => {

    playerFightAnimationIndex += 0.1;

    if(indexIsOutOfLength(playerFightAnimationIndex)) 
    {
        playerFightAnimationIndex = 0;
        return false;
    }
    return true;
}



const updateSpecialAnimationIndex = (maxAnimationCount, speed = 0.1) => {
    specificAnimationIndex += speed;

    if(indexIsOutOfLength(specificAnimationIndex, maxAnimationCount)) 
    {
        specificAnimationIndex = 0;
        return false;
    }
    return true;
}



const updateAnimationIndex = () => {

    playerAnimationIndex += 0.1;

    if(indexIsOutOfLength(playerAnimationIndex)) 
    {
        playerAnimationIndex = 0;
    }
}

const indexIsOutOfLength = (animationIndex, max = playerAnimationLength) => animationIndex >= (max -1) 
