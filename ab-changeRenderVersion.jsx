/***************************************************************************
 * Change Render Version ***************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.2 ************************************************************
 * adapted from Change Render Locations.jsx ********************************
 ***************************************************************************/

changeRenderVersion(this);

// This script prompts the user for a appendix to use for queued items in the Render Queue.
function changeRenderVersion(thisObj)	{
  var scriptName = "Change Render Version";

  var myProject = app.project.file.toString();
  var myProjectname = myProject.substr(myProject.lastIndexOf('/') + 1, myProject.length).split('.')[0];
  var myVersion = myProjectname.split(/_v/gi)[1];

  if(myVersion == null){
    var myAppendix = '_v' + prompt("What's your current Version?", "01").toString();
  } else {
    var myAppendix = myVersion;
  }

  if (myAppendix != null) {
    app.beginUndoGroup(scriptName);

    // Process all render queue items whose status is set to Queued.
    for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
      var curItem = app.project.renderQueue.item(i);
      if (curItem.status == RQItemStatus.QUEUED) {

        // Change all output modules for the current render queue item.
        for (j = 1; j <= curItem.numOutputModules; ++j) {

          var curOM = curItem.outputModule(j);
          var oldLocation = curOM.file;
          curOM.file = new File(oldLocation.toString().substr(0, oldLocation.toString().lastIndexOf("/") + 1) + "/" + oldLocation.name.split('.')[0] + myAppendix );

        }
      }
    }
    app.endUndoGroup();
  }
}
