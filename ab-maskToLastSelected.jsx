/***************************************************************************
 * Mask to last selected ***************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

maskToLastSelected(this);

/* mask the selected layers to the last selected
*/
function maskToLastSelected(thisObj) {

  var mySelection = app.project.activeItem.selectedLayers;
  var myNumLayers = mySelection.length;
  var myLayernames = [];

  app.beginUndoGroup("Mask to last selected layer")

  if (mySelection.length > 1) {

    for (var i = 0; i < mySelection.length - 1; i++) {
      var myEffect = mySelection[i].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
      myEffect.property("ADBE Set Matte3-0001").setValue(mySelection[mySelection.length-1].index);
      myLayernames.push(mySelection[i].name);
    }

  //  alert("The following layers has been masked by the layer '" + mySelection[mySelection.length-1].name + "':\n\n" + myLayernames.join("\n"));

  } else {
    alert("Please select at least two layers first.");
  }

  app.endUndoGroup();
};
