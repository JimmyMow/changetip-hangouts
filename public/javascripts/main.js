function showParticipants() {
  var participants = gapi.hangout.getParticipants();
  console.log("participants: ", participants);

  $( "<ul></ul>", {
    "id": "participantsList"
  }).appendTo($("#participantsDiv"));


  for (var index in participants) {
    var participant = participants[index];
    console.log("participant: ", participant);

    $( "<li></li>", {
      "id": "participant-" + participant.person.id
    }).appendTo($("#participantsList"));

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
    "val": "108104158228107899864"
  }).appendTo($("#sendTipForm"));
}

function init() {
  // When API is ready...
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
          showParticipants();
          var me = gapi.hangout.getLocalParticipant();
          console.log("me: ", me);
        }
      });
}

function clickedPerson(participant) {
   console.log("here from clickedPerson with participant: ", participant);
}

