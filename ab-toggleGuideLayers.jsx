/***************************************************************************
 * Toggle Guide Layers *****************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

if(ScriptUI.environment.keyboardState.altKey == true){
    toggleGuideLayers(this, 'disable');
} else {
    toggleGuideLayers(this, 'enable');
}

/* find and toggle visibility of guide layers in the active comp
*/
function toggleGuideLayers(thisObj, myState) {

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var myLayers = myComp.layer;
    var myNumLayers = myComp.numLayers;
    var myLayernames = [];
    if(myState == 'disable'){
        var myMode = 'Hide Guide Layers';
    } else {
        var myMode = 'Show Guide Layers'
    }

    app.beginUndoGroup(myMode)

    for (var i = 1; i <= myNumLayers; i++) {
      if (myComp.layer(i).guideLayer === true) {
          if(myState == 'disable'){
              myComp.layer(i).enabled = false;
          } else {
              myComp.layer(i).enabled = true;
          }
        myLayernames.push(myComp.layer(i).name);
      }
    }

    app.endUndoGroup();

  } else {
    alert("Please select a composition first.")
  }
};