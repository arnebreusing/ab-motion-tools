/***************************************************************************
 * Change Loop *************************************************************
 * by Arne Breusing @dezignphreak ******************************************
 * version: 0.1 ************************************************************
 ***************************************************************************/

changeLoop(this);

/* change the loop setting of the selected project items
*/
function changeLoop(thisObj) {
  var mySelection = app.project.selection;
  var mySourcenames = [];

  if (mySelection.length > 0) {

    var loopNum = prompt("How many times do you want to loop the selected items?", "1");

    for (var i = 0; i < mySelection.length; i++) {
      if ((mySelection[i] instanceof FootageItem) == true && mySelection[i].mainSource.isStill != true) {
        mySelection[i].mainSource.loop = parseInt(loopNum);
        mySourcenames.push(mySelection[i].name);
      }
    }

    if (mySourcenames.length > 0) {
      alert("The following sources has been looped " + loopNum + " times:\n\n" + mySourcenames.join("\n") + "\n\nEverthing else is not loopable.");
    } else {
      alert("Nothing loopable selected.");
    }

  } else {
    alert("Please select at least one source first.");
  }
};
