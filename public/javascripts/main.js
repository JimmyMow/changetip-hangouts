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
      "id": "participant-" + participant.person.id,
      "class": "participant"
    }).appendTo($("#participantsList"));

    $( "<img>", {
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
      "text": participant.person.displayName,
      "class": "person-label"
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
          window.setTimeout(function() {
                                  gapi.auth.setToken(generateToken());
                                  showParticipants();
                                }, 1);
        }
      });
}

function clickedPerson(participant) {
   console.log("here from clickedPerson with participant: ", participant);
}


// Auth 2.0 Token Code
function generateToken() {
  var theToken = new Object();
  theToken.access_token = getParameter('token');

  return theToken;
}

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
  i, val, params = searchString.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] == paramName) {
      return unescape(val[1]);
    }
  }
  return null;
}

