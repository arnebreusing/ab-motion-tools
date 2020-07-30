/***************************************************************************
 * Cretae control layer ****************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

createControlLayer(this);

/* Create control layers for each selected layer and parent them to the controllers
*/
function createControlLayer(thisObj) {

  var myConColor = [128,128,128,255]/255;

  var myComp = app.project.activeItem;

  if (myComp && myComp instanceof CompItem) {

    var mySelection = myComp.selectedLayers;
    var myNumLayers = mySelection.length;
    var myLayernames = [];

    app.beginUndoGroup("Create control layer")

    if (mySelection.length >= 1) {

      for (var i = 0; i < mySelection.length; i++) {
        var myCon = createHandle("con_" + mySelection[i].name, mySelection[i].position.value, myConColor, mySelection[i]);
        myCon.startTime = mySelection[i].startTime;
        myCon.inPoint = mySelection[i].inPoint;
        myCon.outPoint = mySelection[i].outPoint;
        myCon.label = mySelection[i].label;
        mySelection[i].parent = myCon;
        myLayernames.push(mySelection[i].name);
      }

    //  alert("The following layers got a seperate control layer '" + mySelection[mySelection.length-1].name + "':\n\n" + myLayernames.join("\n"));

    } else {
      createHandle("Null", [myComp.width*.5, myComp.height*.5], myConColor);
    }

    app.endUndoGroup();

  } else {
    alert("Please select a composition first.")
  }
};

/* create handle
  @parem {handleName} - string - name of the handle
  @parem {handlePosition} - array - x and y position coordinates of the handle
  @parem {handleColor} - array - RGBA value for the handle stroke color
  @parem {moveBefore} - layer - layer you want the handle to be above - OPTIONAL
*/
function createHandle(handleName, handlePosition, handleColor, moveBefore){
  var myComp = app.project.activeItem;
  if (!myComp || !(myComp instanceof CompItem)) {
    myComp = app.project.items.addComp("My Comp", 1920, 1080, 1, 10, 24);
    myComp.openInViewer();
  }
  //create shape layer
  var handle = myComp.layers.addShape();
  handle.name = handleName;
  handle.guideLayer = true;
  // handle.dimensionsSeparated = true; !!!
  handle.comment = "|Controllers|";
  handle.label = 9;
  //build vector shape
  var handleGroup = handle.property("Contents").addProperty("ADBE Vector Group");
  var handleShape = handleGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
  handleShape.property("ADBE Vector Rect Size").setValue([50,50]);
  //apply stroke
  var handleStroke = handleGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
  handleStroke.property("ADBE Vector Stroke Color").setValue(handleColor);
  handleStroke.property("ADBE Vector Stroke Width").setValue(8);
  var handleStrokeDash = handleStroke.property("ADBE Vector Stroke Dashes").addProperty("ADBE Vector Stroke Dash 1");
  handleStrokeDash.setValue(30);
  var handleStrokeGap = handleStroke.property("ADBE Vector Stroke Dashes").addProperty("ADBE Vector Stroke Gap 1");
  handleStrokeGap.setValue(20);
  var handleStrokeOffset = handleStroke.property("ADBE Vector Stroke Dashes").addProperty("ADBE Vector Stroke Offset");
  handleStrokeOffset.setValue(15);
  handleGroup.property("ADBE Vector Transform Group").property("ADBE Vector Rotation").setValue(45);
  //prevent anoying scaling of handle in viewport
  handle.property("ADBE Transform Group").property("ADBE Scale").expression = "[100,100]";
  //position handle
  handle.property("ADBE Transform Group").property("ADBE Position").setValue(handlePosition);
  //colaps layer content in timeline
  handle.selected = true;
  if(app.settings.getSetting('RigtRect', 'SeparateDimensions') == 'true'){
    handle.transform.position.dimensionsSeparated = true;
  }
  app.executeCommand(2771);
  app.executeCommand(2771);
  if(moveBefore){
    handle.moveBefore(moveBefore);
  }
  handle.selected = false;

  return handle;
}
