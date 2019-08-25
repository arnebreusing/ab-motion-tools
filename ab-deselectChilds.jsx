/***************************************************************************
 * Deselects selected layers that have a parent ****************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.3 ************************************************************
 ***************************************************************************/

deselectChilds(this);

/* deselect all selected layers with no parent in the current composition
*/
function deselectChilds(thisObj) {

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var mySelection = myComp.selectedLayers;
    var myNumLayers = mySelection.length;

    if (myNumLayers > 0) {

      for (var i = 0; i < myNumLayers; i++) {
        if (mySelection[i].parent != null) {
          // layer is already a child = don't select
          mySelection[i].selected = false;
        } else {
          // layer has no parent = select
          mySelection[i].selected = true;
        }
      }

    } else {
      alert("Please select a layer first.");
    }
  } else {
    alert("Please select a composition first.")
  }

};
