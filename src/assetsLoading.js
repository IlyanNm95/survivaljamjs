const loadAssets = (indexOfAssetsToLoad = totalLoadCounter) => {

    fetch(ressourceToLoad[indexOfAssetsToLoad].path)
        .then(rep => rep.json())
        .then(rep => { 
                loadRessource(
                    rep.data,
                    ressourceToLoad[indexOfAssetsToLoad].typeOfRessource
                )
                        
        })
        .catch(error => { 
            // error handling
            throw new Error("there is an issue with a ressource : " + error + " // On the id of asset : " + indexOfAssetsToLoad);

        })
  }

const loadRessource = (ressource, typeOfRessource) => {

    switch(typeOfRessource){
        case "sprite" :
            spritesData = ressource;
            loadImageFromData(spritesData, typeOfRessource);
            break;
        
        case "item" :
            itemsData = ressource;
            loadImageFromData(itemsData, typeOfRessource);
            break;

        case "map" :
            mapData = ressource;
            for(let i = 0; i < mapData.length; i++){
                loadJsonForMap(mapData[i])
            }
            break;
            // TODO : Update the map loading ressource logics
        case "ui" :
            uiData = ressource;
            loadImageFromData(uiData, typeOfRessource);
            break;

        case "planets" :
            planetsData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "npc" :
            npcData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "quest" :
            questData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "tactical" :
            tacticalMapData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        default :
            throw new Error("this is not an accepted type of ressource : " + typeOfRessource);
        
    }
}

const loadImageFromData = (data, typeOfRessource) => {
    /**
     * * Load the image from the data and send the type of ressource in case of success or in case of failure, it just throw an error
     */
    for(let i = 0; i < data.length; i++)
        {
            data[i].image = loadImage(
                data[i].path, 
                () => successfullLoadingRessource(typeOfRessource),
                () => failureLoadingRessource(data[i], typeOfRessource)
            );
    }
}

const loadJsonForMap = (map) => {

    fetch(map.tileRessource)
        .then(res => res.json())
        .then(res => res.data)
        .then(res => { 
            map.tileRessource = res;
            loadImageFromData(map.tileRessource, "map"); 
        })
        .catch(err => console.log(err))
}

const failureLoadingRessource = (ressource, typeOfRessource) => {
    /** 
     * * Throw the error in case that the load failed :(
     */
    throw new Error("failed to load a " + typeOfRessource + " from the " + ressource.id + " (path : " + ressource.path + ") case, check the following json to fix that or check if the image exists");
}

const successfullLoadingRessource = (typeOfRessource) => {

    switch(typeOfRessource){
        case "sprite" :
            loadingCounterSpritesData ++;
            if(loadingCounterSpritesData === spritesData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "item" :
            loadingCounterItemsData ++;
            if(loadingCounterItemsData === itemsData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "map" :
            loadingCounterMapData ++;
            if(loadingCounterMapData === mapData[0].tileRessource.length){ // If we spawn on the map 0 then we just need to load the map 0 and the rest will load
                totalLoadCounter ++;
                loadAssets();
            }
            // TODO : This method is still unstable (like if a player change the map that he didn't already load)
            break;
        case "spriteFight" :
            loadingCounterSpritesFightData ++;
            if(loadingCounterSpritesFightData === spritesFightData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "planets" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "npc" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "quest" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "ui" :
            loadingCounterUIData ++;
            if(loadingCounterUIData === uiData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case 'tactical' :
            totalLoadCounter ++;
            break;
        default :
            throw new Error("this cannot load that type of ressource : " + typeOfRessource);
    }

    checkAllRessource()
    
}

const checkAllRessource = () => {

    if(totalLoadCounter === totalLoad && ressourceIsLoaded != true)
    {
        loadAllRessource()
    }
    
    if(totalLoadCounter > totalLoad)
    {
        throw new Error("code loaded too much data, there is a problem in the 'successfullLoadingRessource' function");
    }
}

const loadAllRessource = () => {
    setLanguageOnStart();
    setEngineVariableAfterLoadingAllAssets();
    ressourceIsLoaded = true;

    setTimeout(() => {
        startMenuState =  StartMenuStateEnum.Normal;
    }, 200); // set the menu normally if we have load all assets
}

const setEngineVariableAfterLoadingAllAssets = () => {
    if(mapData.length < 1)
    {
        throw new Error("mapData isn't set for map creation");
    }


    playerOnMap = mapData[0];
    actualPlayerMap = playerOnMap.map;

    playerVector = getCoordWithTileCoord(playerOnMap.start[0], playerOnMap.start[1]);
    cameraVector = createVector(windowWidth/2, windowHeight/2);
    mapVector = createVector(0,0);
    vector2ExploringMenu = createVector(-500, 0); // For the transition in menu exploring
    vectorCameraEngineTwo = createVector(0, 0);
}
