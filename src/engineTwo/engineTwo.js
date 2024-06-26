let engineTwoState = "Playing";

const runEngineTwo = () => {
    switch(engineTwoState){
        case "startFight" :
            displayEngineTwoUI();
            break;
        case "Playing" :
            engineTwoPlaying();
            break;
        case "Tutorial" :
            engineTwoPlayingTutorial();
            break;
        case "endFight" :
            engineTwoEndFight();
            break;
        default :
            throw new Error("Engine Two State isn't defined : " + engineTwoState)
    }
    showTutorial();
}

const engineTwoPlaying = () => {
    background(actualMapEngineTwo.backgroundColor)
    setAllHealth();
    displayTopDownMapEngineTwo();
    setSelectedEntity();
    setCameraEngineTwo();
    displayEngineTwoUI();
    runCinematicFightView()
    setGameState();
}

const engineTwoPlayingTutorial = () => {
    background(actualMapEngineTwo.backgroundColor)
    setAllHealth();
    displayTopDownMapEngineTwo();
    setSelectedEntity();
    setCameraEngineTwo();
    displayEngineTwoUI();
    runCinematicFightView()
    setGameState();
}

const engineTwoEndFight = () => {
    background('rgba(20,20,20, 0.1)');
    displayEngineTwoUI();
}

//#endregion



const setGameState = () => {
    if(checkAllEnemiesDead() === true){
        fightWinner = "allies";
        engineTwoState = "endFight";
        addQuestProgressionOnEndFight(actualMapEngineTwo.entityOnTactical);
    }
    if(checkAllAlliesDead() === true){
        looseFight();
        fightWinner = "enemies";
        engineTwoState = "endFight";
    }
}

const looseFight = () => {
    loadNewMap(mapData[0], [-10, -7]);
    if(npcFighted != null)
    {
        npcFighted.actualDialogIndex = 0;
        actualDialog = 0;
        npcFighted = null;
        npcDialoged = null;
        playerState = PlayerStateEnum.Normal;
        playerTeam[0].health.actualHealth = playerTeam[0].health.maxHealth + 0;
    }
    // ! Here its loose fight event
}

const setSelectedEntity = () =>{
    selectedEntity = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
}

const setCameraEngineTwo = () => {
    let vectorMoove;
    if(selectedEntity !== null)
    {   
        vectorEntity = createVector((selectedEntity.pos[0] + 0.5)*tileSize, (selectedEntity.pos[1] + 0.5)*tileSize) // 0.5 is the margin for centering the center of a tile
        vectorToCover = createVector(-vectorEntity.x + (window.innerWidth/2), -vectorEntity.y  + (window.innerHeight/2));
        vectorMoove = p5.Vector.lerp(vectorToCover, vectorCameraEngineTwo, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5
    }else{
        throw new Error("selectedEntity is null, which is not possible normally");
    }
    vectorCameraEngineTwo = vectorMoove;
    
}

// * BASE CODE

const displayTopDownMapEngineTwo = () => {
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.groundLayer);
    displayTacticalTopDownMapEngineTwo();
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.objectLayer, 'object');
}

const displayAestheticTopDownMapEngineTwo = (map, layer = 'ground') => {
    for(let y = 0; y < map.length; y++)
    {
        for(let x = 0; x < map[y].length; x++)
        {
            if(layer !== 'ground') showSpecificSpriteWithPositionOnTactical(x, y);
            createImageWithIdOn2dArrayEngineTwo(x, y, map[y][x],tileSize);
        }
    }
}

const displayTacticalTopDownMapEngineTwo = () => {
    for(let y = 0; y < actualMapEngineTwo.tacticalMap.length; y++)
    {
        for(let x = 0; x < actualMapEngineTwo.tacticalMap[y].length; x++)
        {   
            showRectOnTactical(x, y, actualMapEngineTwo.tacticalMap[y][x])
        }
    }
}

const getSpriteTactical = (x, y) => {
    for(let i = 0; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        if(x === actualMapEngineTwo.entityOnTactical[i].pos[0] && y ===actualMapEngineTwo.entityOnTactical[i].pos[1]){
            return actualMapEngineTwo.entityOnTactical[i];
        }
    }
    return null;
}// Return an entity object or null

const showRectOnTactical = (x, y, id) => {
    switch(id){
        case -1 :
            noStroke()
            if(isAMovableCase(x, y) === true)
            {
                fill(155,155,255,100)
                rect(x*tileSize+vectorCameraEngineTwo.x, y*tileSize+vectorCameraEngineTwo.y, tileSize, tileSize);
            }
            if(isAnAttackableCase(x, y) === true)
            {
                fill(255,150,150,175)
                rect(x*tileSize+vectorCameraEngineTwo.x, y*tileSize+vectorCameraEngineTwo.y, tileSize, tileSize);
            }
            break;
    }
}// ! DEPRECATED BUT : Usefull for debug

const showSpriteOnTactical = (entity) => {
    let positionOnMap = 
    [
        entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.x,
        entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.y
    ]

    if(entity.nextCase !== null ) // If entity has a next case to moove
    {
        entity.state = "moove";
    }

    switch(entity.state)
    {
        case "heal" :
            if(isCinematicFightIsRunning() === true)
            {
                animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                showHealthSpriteTactical(positionOnMap, entity)
                return;
            }
            if(animationFightSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, 1, entity.id) === false)
            {
                entity.state = "idle";
                checkIaTurn()
            }
            showHealthSpriteTactical(positionOnMap, entity)
            break;
        case "fight":
            if(isCinematicFightIsRunning() === true)
            {
                animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                showHealthSpriteTactical(positionOnMap, entity)
                return;
            }
            if(animationFightSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, 0, entity.id) === false)
            {
                entity.state = "idle";
                checkIaTurn()
            }
            showHealthSpriteTactical(positionOnMap, entity)
            break;
        case "moove" :
            if(mooveEntityToNextCase(entity) === false)
            {
                entity.state = "idle";
                checkIaTurn();
                animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                showHealthSpriteTactical(positionOnMap, entity)
                return;
            }
            animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, entity.dir, entity.id)
            showHealthSpriteTactical(positionOnMap, entity)
            break;
        case "dead" :
            animationDeadSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, entity.id)
            break;
        default :
            animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
            showHealthSpriteTactical(positionOnMap, entity)
            break;
    }
    
}

const showSpecificSpriteWithPositionOnTactical = (xPosition, yPosition) => {
    let npcOnMap = actualMapEngineTwo.entityOnTactical.filter(npc => Math.floor(npc.pos[0]) === xPosition && Math.floor(npc.pos[1]+1) === yPosition )
    if(npcOnMap.length > 0)
    {
        showSpriteOnTactical(npcOnMap[0])
    }
}


const showHealthSpriteTactical = (position, entity) => {

    if(entity.health === undefined){
        throw new Error("Entity doesn't have health which is impossible, check the entity with the id : " + entity.id)
    }

    let health = entity.health
    let sizeHealth = playerSpriteSize;
    image(uiData[3].image, position[0], position[1]-playerSpriteSize, sizeHealth, sizeHealth) // Background HP
    let actualHealthPercent = health.actualHealth / health.maxHealth * 100 + 0.0001; 
    
    tint(255, 35, 35)
    image(uiData[0].image, position[0], position[1]-playerSpriteSize, actualHealthPercent, sizeHealth) // Bar HP
    noTint();
    image(uiData[2].image, position[0], position[1]-playerSpriteSize, sizeHealth, sizeHealth) // Border HP
}



/**
 * * This function check every player health to set this to 0 if it is inferior to 0 
 */
const setAllHealth = () => {
    for(let i = 0; i < actualMapEngineTwo.entityOnTactical.length; i ++)
    {
        if(actualMapEngineTwo.entityOnTactical[i].health.actualHealth < 0)
        {
            actualMapEngineTwo.entityOnTactical[i].health.actualHealth = 0;
        }
    }
}



const createImageWithIdOn2dArrayEngineTwo = (x, y, id, currentTileSize, mapInfo = actualMapEngineTwoRessource) => {
    if(id < 0)
    {
        return // If there is no tile, just return and doesn't write a tile on map
    } 
    // size of the current tile according to the data
    let yTileHeight = mapInfo.tileRessource[id].yWidth;
    // position of the current tile in the array and the size
    let xPositionTiles = currentTileSize*x+vectorCameraEngineTwo.x;
    let yPositionTiles = (currentTileSize*(y+1-yTileHeight))+vectorCameraEngineTwo.y;
    image(mapInfo.tileRessource[id].image, xPositionTiles , yPositionTiles, currentTileSize, currentTileSize * yTileHeight); 
  
}



const endEventFight = (event) => {
    switch(event)
    {
        case "darkWoafEnd" :
            let npcIndexBob = addNpcToMap(7, [19, 18], 'dialog', [1, 0], 'idle', true, 3)
            let npcIndexSalato = addNpcToMap(8, [21, 18], 'dialog', [1, 0], 'idle', true, 3)
            playerCanMove = false;
            mapData[3].npcOnMap[npcIndexBob-1].nextCase = searchPath(mapData[3].npcOnMap[npcIndexBob-1].pos, [19, 12], mapData[3].map.objectLayer);
            mapData[3].npcOnMap[npcIndexSalato-1].nextCase = searchPath(mapData[3].npcOnMap[npcIndexBob-1].pos, [21, 12], mapData[3].map.objectLayer);
            // ! Dark woaf specific event when you kill dark woaf !
            break;
        case undefined :
            break;
        default: throw new Error("end event isn't defined for the end of the fight if the allies wins");
    }
}


const getSpriteWithCoord = (x, y) => {
    if(getSpriteTactical(x, y) === undefined)
    {
        return null; // Just return null if there is no sprite at this case
    }
    return getSpriteTactical(x, y);
}


const getTacticalTileOnMouseClick = () => {
    return actualMapEngineTwo.tacticalMap[Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)][Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize)];
}


const getCoordTileWithMouseClickEngineTwo = () => [Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize), Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)] // Return coord on map


const mouseIsInArrayEngineTwo = () => {
    return Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) >= 0 
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) >= 0
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) < actualMapEngineTwo.tacticalMap.length
    && Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) < actualMapEngineTwo.tacticalMap[0].length
} // Return true or false


const resetEveryEntityValue = (tacticalMap) => {
    for(let i = 0; i <tacticalMap.entityOnTactical.length; i++)
    {
        tacticalMap.entityOnTactical[i].pm = 2;
        tacticalMap.entityOnTactical[i].pa = 2;
    }
}
