function showParticipants() {
  var participants = gapi.hangout.getParticipants();
  console.log("participants: ", participants);

  $( "<ul></ul>", {
    "id": "participantsList"
  }).appendTo($("#participantsDiv"));


  for (var index in participants) {
    var participant = participants[index];
    console.log("participant: ", participant);
    console.log("image: ", participant.person.image);
    console.log("image url: ", participant.person.image.url);

    $( "<li></li>", {
      "id": "participant-" + participant.person.id
    }).appendTo($("#participantsList"));

    // <img src="smiley.gif" alt="Smiley face" height="42" width="42">
    $( "<img>" {
      "src": participant.person.image.url
    }).appendTo($("#participant-" + participant.person.id));

    $( "<input>", {
      "type": "checkbox",
      "name": "tip[receiver]",
      "value": participant.person.id,
      "id": "receiver-" + participant.person.id
    }).appendTo($("#participant-" + participant.person.id));

    $( "<label></label>", {
      "for": "receiver-" + participant.person.id,
      "text": participant.person.displayName
    }).appendTo($("#participant-"+participant.person.id));
  }

  $( "<input />", {
    "type": "hidden",
    "name": "tip[sender]",
    "val": gapi.hangout.getLocalParticipant().person.id
  }).appendTo($("#sendTipForm"));
}

function init() {
  // When API is ready...
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
          showParticipants();
        }
      });
}

function clickedPerson(participant) {
   console.log("here from clickedPerson with participant: ", participant);
}

