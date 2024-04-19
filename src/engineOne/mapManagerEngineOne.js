const loadNewMap = (mapToLoad, start) => {

    if(mapToLoad.id >= 0)
    {
        playerOnMap = mapToLoad;
        actualPlayerMap = mapToLoad.map;
        playerVector = getCoordWithTileCoord(start[0], start[1]);
        cameraVector = createVector(windowWidth/2, windowHeight/2);
        mapVector = createVector(0,0);
        checkMapForCinematic(mapToLoad)

        if(mapToLoad.storyBoard !== undefined && mapToLoad.storyBoard !== undefined && mapToLoad.storyBoard.played === false)
        {
            launchStoryBoard(mapToLoad.storyBoard.id);
            mapToLoad.storyBoard.played = true;
        }
    }else{
        throw new Error("mapToLoad doesn't exist because the id of the map is inferior to 0")
    }
}

const getTileCoordWithCoord = (x, y) => [x / tileSize, y / tileSize] 

const getCoordWithTileCoord = (x, y) => createVector(x*tileSize, y*tileSize)



