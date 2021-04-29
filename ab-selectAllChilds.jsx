/***************************************************************************
 * Select all child layers of a selected parent layer **********************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.2 ************************************************************
 ***************************************************************************/

selectAllChilds(this);

/* select all child layers of the selected parent layer in the current composition
*/
function selectAllChilds(thisObj) {

  app.beginUndoGroup("Select all parents");

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    for(var j = 1; j <= myComp.selectedLayers.length-1; j++){
      myComp.selectedLayers[j].selected = false;
    }

    var myParent = myComp.selectedLayers[0];

    if(myParent != null){
      for (var i = 1; i <= myComp.layers.length; i++) {
        if (myComp.layer(i).parent == myParent) {
          // layer is a child = select
          myComp.layer(i).selected = true;
        } else {
          // layer has no parent = select
          myComp.layer(i).selected = false;
        }
      }

      // execution successfull
      if (myComp.selectedLayers.length > 1) {
        myParent.selected = false;
      } else {
        myParent.selected = true;
        alert(myParent.name + " had no child layers.");
      }

    } else {
      alert("Please select a layer first.");
    }

  } else {
    alert("Please select a composition first.");
  }

  app.endUndoGroup();

};
