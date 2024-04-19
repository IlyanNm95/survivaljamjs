const showStartMenu = () => {
    switch(startMenuState)
    {
        case StartMenuStateEnum.Loading : 
            runLoadingStartMenuState();
            break;
        case StartMenuStateEnum.Normal :
            runNormalStartMenuState();
            break;
    }
}


const runLoadingStartMenuState = () => {
    showBackgroundGalaxy();
    showLogo();
}



const runNormalStartMenuState = () => {
    updatePositionLogo([0, -270]);
    showBackgroundGalaxy();
    showChoiceStartMenu();
    showLanguageStartMenu();
    showLogo(logoOffSet);
}


const showLoadingBarState = () => {

    if(totalLoadCounter >= ressourceToLoad.length )
    {
        loadingBarOpacity -= 5;
    }
    
    let progression = totalLoadCounter / ressourceToLoad.length 
    let xWidth = window.innerWidth /1.25;
    let yHeight = xWidth / 40;
    let xStart = window.innerWidth / 2 - xWidth / 2
    let yStart = window.innerHeight - yHeight * 1.5

    tint(255,loadingBarOpacity);
    image(uiData[28].image, xStart, yStart, xWidth, yHeight)
    image(uiData[30].image, xStart, yStart, xWidth*progression, yHeight)
    image(uiData[29].image, xStart, yStart, xWidth, yHeight)
    textAlign(CENTER, CENTER)
    noTint();
    fill(255,loadingBarOpacity)
    text(totalLoadCounter + " / " + ressourceToLoad.length + " // Actually loading : " + ressourceToLoad[totalLoadCounter-1].typeOfRessource, xStart, yStart, xWidth, yHeight )
    fill(255)
}



const showLanguageStartMenu = () => {
    let width = 70;
    let height = width;
    let xStart = 25;
    let yStart = window.innerHeight - height - 25;
    for(let i = 0; i < LangMenuChoices.length; i++)
    {
        let xPosition =  xStart + (height+35) * i
        image(uiData[49].image, xPosition, yStart, width, height)
        if(mouseIsHover(xPosition, yStart, width, height) === true)
        {
            image(uiData[50].image, xPosition, yStart, width, height)
        }
        fill(255, 255, 255)
        textAlign(CENTER, CENTER);
        textSize(18);
        text(LangMenuChoices[i].text, xPosition, yStart, width, height)
        createInputButtonWithCallback(xPosition, yStart, width, height, LangMenuChoices[i].callback)
    }
    textAlign(TOP, LEFT);
}



const showChoiceStartMenu = () => {
    
    let width = 250*2;
    let height = width/5;
    let xStart = window.innerWidth /2  - width / 2;
    let yStart = window.innerHeight/2 - height+35;
    for(let i = 0; i < StartMenuChoices.length; i++)
    {
        let yPosition =  yStart + (height+35) * i
        image(uiData[18].image, xStart, yPosition, width, height)
        if(mouseIsHover(xStart, yPosition, width, height) === true)
        {
            image(uiData[27].image, xStart, yPosition, width, height)
        }
        fill(255, 255, 255)
        textAlign(CENTER, CENTER);
        textSize(28);
        text(StartMenuChoices[i].text, xStart, yPosition, width, height)
        createInputButtonWithCallback(xStart, yPosition, width, height, StartMenuChoices[i].callback)
    }
    textAlign(TOP, LEFT);
}


const showBackgroundGalaxy = (idBackground = 26) => {
    image(uiData[idBackground].image, 0, 0, windowWidth, windowHeight)
    // applyBrightnessTemp(uiData[idBackground].image)
}

const showLogo = (offset = [0, 0]) => {
    let xStart = windowWidth / 2 + offset[0];
    let yStart = windowHeight / 4 + offset[1];
    let size = windowHeight / 2; // Taille normale du logo

    // Afficher le logo à sa taille normale dès le début
    image(uiData[34].image, xStart - size / 2, yStart, size, size);
}

const updatePositionLogo = (positionToGo = [0, 0]) => {
    let vectorToGo;
    vectorToGo = p5.Vector.lerp(createVector(logoOffSet[0], logoOffSet[1]), createVector(positionToGo[0], positionToGo[1]), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    logoOffSet = [vectorToGo.x, vectorToGo.y];
}