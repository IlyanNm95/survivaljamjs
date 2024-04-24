
const runEngineOne = () => {
  /** 
   * * runEngine function run the engine depending on the current state of the engine
   */
  switch(engineOneState)
  {
    case EngineOneStateEnum.Playing :
      runPlayingStateEngineOne()
      break;
    case EngineOneStateEnum.Cinematic :
      runCinematicStateEngineOne()
      break;
    case EngineOneStateEnum.StoryBoard :
      runSBEngineOne()
      break;
    case EngineOneStateEnum.EndGame :
      runEndStateEngineOne()
      break;
    default :
      throw new Error("engine one state isn't set : " + engineOneState)
  }
}



const runCinematicStateEngineOne = () => {
  playerCanMove = false;
  playCameraCinematic();
  
  displayTopDown2D();
  setVectorLerpEaseOutExploringMenu();
  showBorderCinematic();
}

const runPlayingStateEngineOne = () => {
  setPlayerCamera();
  displayTopDown2D();
  displayUserInterfaceEngineOne();
  if(npcDialoged !== null)
  {
    displayDialogNpc(npcDialoged)
  }
  showTutorial();
  runTips();
}

const runSBEngineOne = () => {
  playerCanMove = false;
  endSB();
}

const runEndStateEngineOne = () => {
  playerCanMove = false;
  displayTopDown2D();
  setVectorLerpEaseOutExploringMenu();
  showBorderCinematic();
  showCredits();
}


const displayTopDown2D = () => {
    createMapTopDown("not", actualPlayerMap.groundLayer); // create the layer ground in back of the player
    createMapTopDown("back", actualPlayerMap.objectLayer); // create the layer object in back of the player

    showPlayerSprite(cameraVector.x, cameraVector.y, playerSpriteSize);

    createMapTopDown("front", actualPlayerMap.objectLayer); // create the layer object in front of the player
    
    // the double createmap function is used to simulate a 2D perspective
}

const setPlayerCamera = (xSizeCam = windowWidth/2, yHeightCam = windowHeight/2) => {
    if(cameraVector !== playerVector){
        background(20)
        let vectorMoove;
        vectorMoove = p5.Vector.lerp(createVector(xSizeCam, yHeightCam), cameraVector, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5
        cameraVector = vectorMoove;
    }
}



const createMapTopDown = (orientation, mapLayer, mapInfo = playerOnMap, offsetPositionOnScreen = [cameraVector.x + playerVector.x, cameraVector.y + playerVector.y]) => {
    
    noTint(); noStroke();
    for(let y = 0;y < mapLayer.length; y++)
    {
      for(let x = 0;x < mapLayer[0].length; x++)
      {
          switch(orientation){
            case "back" :
              if(actualPlayerTile()[1] >= y)
              {
                showSpecificNpcOnMap(x, y)
                if(!tileIsEmpty(x, y, mapLayer)){
                  createImageWithIdOn2dArray(x, y, mapLayer[y][x], tileSize, false, mapInfo, offsetPositionOnScreen);
                }    
              }
              break;
            case "front":
              if(actualPlayerTile()[1] < y)
              {
                showSpecificNpcOnMap(x, y)
                if(!tileIsEmpty(x, y, mapLayer)){
                    
                  
                  createImageWithIdOn2dArray(x, y, mapLayer[y][x], tileSize, false, mapInfo, offsetPositionOnScreen);
                }
              }
              break;
            default :
              if(!tileIsEmpty(x, y, mapLayer)){
                createImageWithIdOn2dArray(x, y, mapLayer[y][x], tileSize, false, mapInfo, offsetPositionOnScreen);
              }
              break;
          }
        }
      
    }

}

const createImageWithIdOn2dArray = (x, y, id, currentTileSize, isUi = false, mapInfo = playerOnMap, offsetPositionOnScreen = [cameraVector.x + playerVector.x, cameraVector.y + playerVector.y]) => {
  imageMode(CORNER)
  let normalYPositionTiles = currentTileSize*y + offsetPositionOnScreen[1] -45; // normal position of a tiles (usefull when you need to instantiate a normal tile behind a special tile)
  if(isUi === true){
    let xPositionTiles = currentTileSize*x + offsetPositionOnScreen[0] -45;
    let yPositionTiles = (currentTileSize*y + offsetPositionOnScreen[1] -45);
    yPositionTiles = (currentTileSize*y + offsetPositionOnScreen[1] -45);
    image(uiData[id].image, xPositionTiles , yPositionTiles, currentTileSize, currentTileSize);
  }else{
    // size of the current tile according to the data
    let xTileWidth = 1;
    let yTileHeight = mapInfo.tileRessource[id].yWidth;
    let xPositionTiles = currentTileSize*x + offsetPositionOnScreen[0] -45;
    let yPositionTiles = (currentTileSize*(y+1-yTileHeight) + offsetPositionOnScreen[1] -45);
    image(mapInfo.tileRessource[id].image, xPositionTiles , yPositionTiles, currentTileSize * xTileWidth, currentTileSize * yTileHeight); 
  }
}

const tileIsEmpty = (x, y, map) => {
  if(y >= map.length || y < 0){
    return -1;
  }
  return map[y][x]<=-1 || map[y][x] >= playerOnMap.tileRessource.length// In this case, a tile with a value <= to -1 is an empty case or if the value is >= to the length of the playerOnMap.tileRessource
}

const tileIsConstructibleAndWeCanConstruct = (id) => playerOnMap.tileRessource[id].canConstruct === "true" && constructionMode === true && destructionMode === false

const tileIsDestructibleAndWeCanDestruct = (id) => playerOnMap.tileRessource[id].destructible === "true" && constructionMode === true && destructionMode === true

const tileIsAnObject = (id) => playerOnMap.tileRessource[id].isAnObject === true

const getTileData = (x, y, map) => {

  if(y >= 0 && y < map.length && map[y][x] < playerOnMap.tileRessource.length)
  {
    return playerOnMap.tileRessource[map[y][x]]
  }else{
    return playerOnMap.tileRessource[1];
  }

}

//#endregion

/**
 * * Launching the end game with credits
 */
const launchEndGame = () => {
  engineOneState = EngineOneStateEnum.EndGame;
}