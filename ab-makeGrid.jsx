/***************************************************************************
 * Make Grid ***************************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.2 ************************************************************
 ***************************************************************************/

makeGrid(this);

function makeGrid(thisObj) {
  // select a comp
  var myComp = app.project.activeItem;
  if (myComp && myComp instanceof CompItem) {
    // select the selected layer
    var myLayer = myComp.selectedLayers[0];
    if (myLayer == null) {
      // fallback: if no layer is selected, select the first layer
      myLayer = myComp.layer(1);
    } else {
      myLayer = myLayer;
    }
    if (!myLayer instanceof AVLayer) {
      alert("No compatible layer type (video layer or composition) was found");
      return false;
    }
    if (myLayer.property("sourceText") !== null) {
      alert("Text layers are not compatible this script");
      return false;
    }
    if (!myLayer.hasVideo) {
     alert("The selected layer has no video");
     return false;
    }

    // count markers & create marker time array
    var numMarkers = myLayer.marker.numKeys;
    var markerTime = [];
    for (var i = 0; i < numMarkers; i++) {
      m = myLayer.marker.keyTime(i+1);
      markerTime.push(m);
    }

    // set variables
    if (numMarkers > 0) {
      var numTiles = numMarkers
    }else {
      var numTiles = prompt("How many tiles do you want to create?", 4, "Number of tiles")
    };
    var copies = 1;

    // create position array
    var scaleRoot = 100/Math.ceil(Math.sqrt(numTiles));
    var posRoot = Math.ceil(Math.sqrt(numTiles));
    var gridScale = [scaleRoot,scaleRoot];
    var layerPos = []
    for (var i = 0; i < numTiles; i++) {
      xi = i % posRoot;
      x = (myComp.width / posRoot * xi) + (myComp.width / (posRoot*2));
      yi = Math.floor(i / posRoot);
      y = (myComp.height / posRoot * yi) + (myComp.height / (posRoot*2));
      layerPos.push([x,y]);
    }

    // begin making the grid layout
    app.beginUndoGroup("Make Grid");
    myLayer.position.setValue(layerPos[0]);
    myLayer.scale.setValue(gridScale);
    // adding and removing keyframes and markers
    if (numMarkers != 0) {
      app.executeCommand(2153); // enable time remapping
      var myTimeProp = myLayer.property("ADBE Time Remapping");
      myTimeProp.removeKey(2);
    };
    // ---
    // duplicate and arrange layers
    while (copies < numTiles) {
      var dupLayer = myLayer.duplicate();
      dupLayer.position.setValue(layerPos[copies]);
      dupLayer.scale.setValue(gridScale);
      dupLayer.moveToEnd();
      // adding and removing keyframes and markers
      if (numMarkers != 0) {
        var dupTimeProp = dupLayer.property("ADBE Time Remapping");
        dupTimeProp.setValueAtTime(markerTime[copies], markerTime[copies])
        dupTimeProp.removeKey(1);
        for (var k = numMarkers; k > 1; k--) {
          if (k != copies+1) {
            dupLayer.property("Marker").removeKey(k);
          }
        };
        dupLayer.property("Marker").removeKey(1);
      };
      // ---
      copies++;
    }
    if (numMarkers != 0) {
      // removing all markers from myLayer except the first marker
      if (myTimeProp.keyTime(1) != markerTime[0]) {
        // Case: first marker is NOT at inpoint
        myTimeProp.setValueAtTime(markerTime[0], markerTime[0])
        myTimeProp.removeKey(1);
        for (var k = numMarkers; k > 1; k--) {
          if (k != copies+1) {
            myLayer.property("Marker").removeKey(k);
          }
        };
      } else {
        // Case: first marker is at inpoint
        for (var k = numMarkers; k > 1; k--) {
          if (k != copies+1) {
            myLayer.property("Marker").removeKey(k);
          }
        };
      };
    }
    app.endUndoGroup();

  } else {
    alert("Please select a composition first.");
    return false;
  }
};
