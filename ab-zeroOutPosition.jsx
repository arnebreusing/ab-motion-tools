/***************************************************************************
 * Zero out Position *******************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.2 ************************************************************
 ***************************************************************************/

zerooutPosition(this);

/* zero out the position of the selected layers
*/
function zerooutPosition(thisObj) {

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var mySelection = myComp.selectedLayers;
    var myNumLayers = mySelection.length;
    var myLayernames = [];

    app.beginUndoGroup("Zero out Position")

    if (mySelection.length > 0) {

      for (var i = 0; i < mySelection.length; i++) {
        if (mySelection[i].transform.position.numKeys > 0) {
          for (highestIndex = mySelection[i].transform.position.numKeys; highestIndex > 0; highestIndex--) {
            mySelection[i].transform.position.removeKey(highestIndex);
          }
        }
        mySelection[i].transform.position.setValue([0,0,0]);
        myLayernames.push(mySelection[i].name);
      }

    //  alert("The position of the following layers has been zeroed out:\n\n" + myLayernames.join("\n"));

    } else {
      alert("Please select at least one layer.")
    }

    app.endUndoGroup();

  } else {
    alert("Please select a composition first.")
  }
};
