/***************************************************************************
 * Parent to last selected *************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

parentToLastSelected(this);

/* mask the selected layers to the last selected
*/
function parentToLastSelected(thisObj) {

  var mySelection = app.project.activeItem.selectedLayers;
  var myNumLayers = mySelection.length;
  var myLayernames = [];

  app.beginUndoGroup("Parent to last selected layer")

  if (mySelection.length > 1) {

    for (var i = 0; i < mySelection.length - 1; i++) {
      mySelection[i].parent = mySelection[mySelection.length-1];
      myLayernames.push(mySelection[i].name);
    }

  //  alert("The following layers has been parented by the layer '" + mySelection[mySelection.length-1].name + "':\n\n" + myLayernames.join("\n"));

  } else {
    alert("Please select at least two layers first.");
  }

  app.endUndoGroup();
};
