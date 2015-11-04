var ChangeTip = require('changetip');
var change_tip = new ChangeTip({api_key: process.env.CHANGETIP_API_KEY});

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

    $( "<a></a>", {
      "href": "#",
      "text": participant.person.displayName,
      on: {
        click: function(e) {
          clickedPerson(participant);
        }
      }
    }).appendTo($("#participant-"+participant.person.id));
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
   console.log("key: ", process.env.CHANGETIP_API_KEY);
   // {'receiver': '111750880711215438532', 'message': '/changetip @change here is a cent', 'sender': '108104158228107899864', 'meta': {'sender_display': 'Jack', 'receiver_display': 'Change'}, 'context_uid': 'b12dc3e8fd1a8626'}
    change_tip.send_tip('b12dc3e8fd1a8626', '108104158228107899864', '111750880711215438532', 'googleplus', '@change here is a cent', {'sender_display': 'Jack', 'receiver_display': 'Change'}).then(function(result) {
        console.log("results: ", results);
    });
}
