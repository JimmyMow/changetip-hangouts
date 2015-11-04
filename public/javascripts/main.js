function showParticipants() {
  var participants = gapi.hangout.getParticipants();
  console.log("participants: ", participants);

  $( "<ul></ul>", {
    "id": "participantsList"
  }).appendTo($("#participantsDiv"));


  for (var index in participants) {
    var participant = participants[index];
    console.log("participant: ", participant);

    $( "<li></li>" {
      "id": "participant-"+participant.person.id
    }).appendTo($("#participantsList"));

    $( "<a href='#'>" + participant.person.displayName + "</a>" {
      on: {
        click: function(e) {
          clickedPerson(participant);
        }
      }
    }).appendTo($("person-"+participant.person.id));
  }
}

function init() {
  // When API is ready...
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
          document.getElementById('showParticipants')
            .style.visibility = 'visible';
        }
      });
}

function clickedPerson(participant) {
   console.log("here from clickedPerson with participant: ", participant);
}
