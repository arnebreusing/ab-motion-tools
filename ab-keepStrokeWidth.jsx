/***************************************************************************
 * Keep stroke width *******************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.2 ************************************************************
 ***************************************************************************/

keepStrokeWidth(this);

/* apply the maintain stroke width expression to all strokes of the selected shape layers on the first level and ask for a new stroke width
*/
function keepStrokeWidth(thisObj) {

  var myExpression = "// Maintain stroke width\nvalue / length(toComp([0,0]), toComp([0.7071,0.7071])) || 0.001;"
  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var mySelection = myComp.selectedLayers;
    var myNumLayers = mySelection.length;
    var myLayernames = [];
    var newStrokeWidth;

    app.beginUndoGroup("Keep stroke width")

    if (mySelection.length > 0) { // check if you have a layer selected

      var newStrokeWidth = prompt('Adjusted stroke width? Leave blank for default', '') // prompt for new stroke width

      for (var i = 0; i < mySelection.length; i++) {
        if (mySelection[i] instanceof ShapeLayer) { // check if layer is shape layer

          var myContents = mySelection[i].property('ADBE Root Vectors Group');
          for (var j = 1; j <= myContents.numProperties; j++) { // loop through first level of subgroups of the shape layer

            if (myContents.property(j).matchName == 'ADBE Vector Group') { // check if property is group
              if (myContents.property(j).property('ADBE Vectors Group').property('ADBE Vector Graphic - Stroke') != null) {
                var myStrokeWidth = myContents.property(j).property('ADBE Vectors Group').property('ADBE Vector Graphic - Stroke').property('ADBE Vector Stroke Width');
                if (newStrokeWidth != null) { // set stroke width to new stroke width if user has put in a new value
                  myStrokeWidth.setValue(newStrokeWidth);
                }
                myStrokeWidth.expression = myExpression;
              }
            } else if (myContents.property(j).property('ADBE Vector Stroke Width') != null) {
              var myStrokeWidth = myContents.property(j).property('ADBE Vector Stroke Width');
              if (newStrokeWidth != null) { // set stroke width to new stroke width if user has put in a new value
                myStrokeWidth.setValue(newStrokeWidth);
              }
              myStrokeWidth.expression = myExpression;
            }

          }

        }
        myLayernames.push(mySelection[i].name);
      }

    alert("The stroke of the following layers has been adjusted:\n\n" + myLayernames.join("\n"));

    } else {
      alert("Please select a layer first first.");
    }

    app.endUndoGroup();

  } else {
    alert("Please select a composition first.");
  }
};
