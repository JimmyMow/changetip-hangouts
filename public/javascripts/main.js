function showParticipants() {
  var participants = gapi.hangout.getParticipants();
  console.log("participants: ", participants);

  $( "<ul></ul>", {
    "id": "participantsList"
  }).appendTo($("#participantsDiv"));


  for (var index in participants) {
    var participant = participants[index];
    console.log("participant: ", participant);

    $("<li></li>", {
      "id": "participant-"+participant.person.id
    }).appendTo($("#participantsList"));

    $( "<input />", {
      "type": "checkbox",
      "name": "receiver",
      "value": participant.person.id,
      "id": "receiver-" + participant.person.id
      }
    }).appendTo($("#participant-"+participant.person.id));

    $( "<label />", {
      "for": "receiver-" + participant.person.id,
      "text": participant.person.displayName
    }).appendTo($("#participant-"+participant.person.id));


  }
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

