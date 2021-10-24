/***************************************************************************
 * Apply Textname **********************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

applyTextname(this);

/* apply thisLayer.name() expression to selected text layers
*/
function applyTextname(thisObj) {

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var mySelection = myComp.selectedLayers;
    var myNumLayers = mySelection.length;
    var myLayernames = [];

    app.beginUndoGroup("Apply Textname Expression")

    if (mySelection.length > 0) {

      for (var i = 0; i < mySelection.length; i++) {
        if (mySelection[i].sourceText != null) {
          mySelection[i].sourceText.expression = "thisLayer.name;";
          myLayernames.push(mySelection[i].name);
        }
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
