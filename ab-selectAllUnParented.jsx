/***************************************************************************
 * Select all layers without a parent **************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

selectAllUnParented(this);

/* select all layers with no parent in the current composition
*/
function selectAllUnParented(thisObj) {

  var myComp = app.project.activeItem;

  if (myComp != null) {

    for (var i = 1; i <= myComp.layers.length; i++) {
      if (myComp.layer(i).parent != null) {
        // layer is allready a child = don't select
        myComp.layer(i).selected = false;
      } else {
        // layer has no parent = select
        myComp.layer(i).selected = true;
      }
    }

  } else {
    alert("Please select a composition first.");
  }

};
