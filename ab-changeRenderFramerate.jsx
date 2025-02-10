/***************************************************************************
 * Change Render Framerate *************************************************
 * by Arne Breusing @dezignphreak and ChatGPT 3.5 **************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

changeRenderFramerate(this);

function changeRenderFramerate(thisObj) {

  // Check if there are any items in the render queue
  if (app.project.renderQueue.items.length > 0) {

    // Prompt user for the new framerate
    var newFramerate = prompt("Enter the new framerate:", "50");
    var myRenderSettings = {
      "Frame Rate":1,
      "Use this frame rate":newFramerate
    };

    // Convert the input to a floating-point number
    newFramerate = parseFloat(newFramerate);

    // Check if the input is a valid number
    if (!isNaN(newFramerate)) {

        // Loop through all active items in the render queue
        for (var i = 1; i <= app.project.renderQueue.items.length; i++) {
            var renderQueueItem = app.project.renderQueue.item(i);

            // Check if the item is active
            if (renderQueueItem.status == RQItemStatus.QUEUED || renderQueueItem.status == RQItemStatus.RENDERING) {

              // DEBUG: get all settable settings
              // var rqItem1_spec_str = app.project.renderQueue.item(1).getSettings(GetSettingsFormat.SPEC);
              // var rqItem1_spec_str_json = rqItem1_spec_str.toSource();

              // Set the new framerate for the active render queue item
              app.project.renderQueue.item(i).setSetting( "Use this frame rate", newFramerate );
              // renderQueueItem.outputModule(1).applyTemplate("Animation MOV"); // Apply a template to avoid issues
            }
        }

        alert("Framerate updated successfully!");

    } else {
        alert("Invalid input. Please enter a valid number.");
    }

  } else {
    alert("No items in the render queue.");
  }


};
