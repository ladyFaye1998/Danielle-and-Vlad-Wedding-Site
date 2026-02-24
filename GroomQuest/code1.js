gdjs.GameOverSceneCode = {};
gdjs.GameOverSceneCode.localVariables = [];
gdjs.GameOverSceneCode.GDbackgroundObjects1= [];
gdjs.GameOverSceneCode.GDbackgroundObjects2= [];
gdjs.GameOverSceneCode.GDHouseObjects1= [];
gdjs.GameOverSceneCode.GDHouseObjects2= [];
gdjs.GameOverSceneCode.GDPlayerObjects1= [];
gdjs.GameOverSceneCode.GDPlayerObjects2= [];
gdjs.GameOverSceneCode.GDBackgroundObjects1= [];
gdjs.GameOverSceneCode.GDBackgroundObjects2= [];
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects1= [];
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects2= [];
gdjs.GameOverSceneCode.GDJump6Objects1= [];
gdjs.GameOverSceneCode.GDJump6Objects2= [];
gdjs.GameOverSceneCode.GDgoblinObjects1= [];
gdjs.GameOverSceneCode.GDgoblinObjects2= [];
gdjs.GameOverSceneCode.GDSmallTowerObjects1= [];
gdjs.GameOverSceneCode.GDSmallTowerObjects2= [];


gdjs.GameOverSceneCode.mapOfGDgdjs_9546GameOverSceneCode_9546GDJump6Objects1Objects = Hashtable.newFrom({"Jump6": gdjs.GameOverSceneCode.GDJump6Objects1});
gdjs.GameOverSceneCode.mapOfGDgdjs_9546GameOverSceneCode_9546GDgoblinObjects1Objects = Hashtable.newFrom({"goblin": gdjs.GameOverSceneCode.GDgoblinObjects1});
gdjs.GameOverSceneCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Jump6"), gdjs.GameOverSceneCode.GDJump6Objects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.GameOverSceneCode.mapOfGDgdjs_9546GameOverSceneCode_9546GDJump6Objects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game Scene", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("goblin"), gdjs.GameOverSceneCode.GDgoblinObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.GameOverSceneCode.mapOfGDgdjs_9546GameOverSceneCode_9546GDgoblinObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.stopGame(runtimeScene);
}}

}


};

gdjs.GameOverSceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameOverSceneCode.GDbackgroundObjects1.length = 0;
gdjs.GameOverSceneCode.GDbackgroundObjects2.length = 0;
gdjs.GameOverSceneCode.GDHouseObjects1.length = 0;
gdjs.GameOverSceneCode.GDHouseObjects2.length = 0;
gdjs.GameOverSceneCode.GDPlayerObjects1.length = 0;
gdjs.GameOverSceneCode.GDPlayerObjects2.length = 0;
gdjs.GameOverSceneCode.GDBackgroundObjects1.length = 0;
gdjs.GameOverSceneCode.GDBackgroundObjects2.length = 0;
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.GameOverSceneCode.GDJump6Objects1.length = 0;
gdjs.GameOverSceneCode.GDJump6Objects2.length = 0;
gdjs.GameOverSceneCode.GDgoblinObjects1.length = 0;
gdjs.GameOverSceneCode.GDgoblinObjects2.length = 0;
gdjs.GameOverSceneCode.GDSmallTowerObjects1.length = 0;
gdjs.GameOverSceneCode.GDSmallTowerObjects2.length = 0;

gdjs.GameOverSceneCode.eventsList0(runtimeScene);
gdjs.GameOverSceneCode.GDbackgroundObjects1.length = 0;
gdjs.GameOverSceneCode.GDbackgroundObjects2.length = 0;
gdjs.GameOverSceneCode.GDHouseObjects1.length = 0;
gdjs.GameOverSceneCode.GDHouseObjects2.length = 0;
gdjs.GameOverSceneCode.GDPlayerObjects1.length = 0;
gdjs.GameOverSceneCode.GDPlayerObjects2.length = 0;
gdjs.GameOverSceneCode.GDBackgroundObjects1.length = 0;
gdjs.GameOverSceneCode.GDBackgroundObjects2.length = 0;
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects1.length = 0;
gdjs.GameOverSceneCode.GDTilemap_9595LevelObjects2.length = 0;
gdjs.GameOverSceneCode.GDJump6Objects1.length = 0;
gdjs.GameOverSceneCode.GDJump6Objects2.length = 0;
gdjs.GameOverSceneCode.GDgoblinObjects1.length = 0;
gdjs.GameOverSceneCode.GDgoblinObjects2.length = 0;
gdjs.GameOverSceneCode.GDSmallTowerObjects1.length = 0;
gdjs.GameOverSceneCode.GDSmallTowerObjects2.length = 0;


return;

}

gdjs['GameOverSceneCode'] = gdjs.GameOverSceneCode;
