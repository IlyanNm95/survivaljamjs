const EngineStateEnum = {
    EngineOne : "engineOne", 
    EngineTwo : "engineTwo"
}

const PlayerStateEnum = {
    Normal : "normal",
    Dialog : "dialog"
}

const EngineOneStateEnum = {
    Playing : 'playing',
    Cinematic : 'cinematic',
    StoryBoard : 'storyBoard',
    EndGame : 'endGame'
}

const TransitionStateEnum = {
    EnterIn : "enterIn",
    GoOut : "goOut"
}

const SceneManagerStateEnum = {
    Engine : "engine",
    StartMenu : "startMenu"
}

const StartMenuStateEnum = {
    Loading : "loading",
    Normal : "normal"
}

const FightCinematicViewStateEnum = {
    NoAnim : "noAnim",
    Animation : "animate"
}

const UiEngineOneStateEnum = {
    Normal : 'normal',
    IsExploring : 'isExploring',
    Tutorial : 'tutorial',
    Dialoging : 'dialog'
}

const TutorialManagerStateEnum = {
    Normal : 'normal',
    KeyBoardTuto : 'kbtuto',
    EngineTwoTutorial :'engine2tuto'
}

const verifyValueIsInEnum = (enumeration, value) => Object.values(enumeration).includes(value);