const endSB = () => {
    engineOneState = previousEngineOneState; 
    playerCanMove = true;
    TransitionSB();
}

const TransitionSB = () => {
    for(let i = 0; i < storyBoardOpacity.length; i++)
    {
        storyBoardOpacity[i] = 0
    }
}