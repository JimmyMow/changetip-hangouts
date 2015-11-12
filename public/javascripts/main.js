$(document).ready(function() {
  $("#sendTipForm").on("submit", function(e) {
    e.preventDefault();
    console.log("form serialize: ", $(this).serialize());
    // var receiver = $('input[name=tip[receiver]]').val();
    // var sender = $('input[name=tip[receiver]]').val();
    // $.ajax({
    //   type: "POST",
    //   url: "https://stark-hamlet-6630.herokuapp.com/tip",
    //   data: ,
    //   success: success,
    //   dataType: dataType
    // });
  });
});

function showParticipants(participantsList) {
  var participants = (typeof participantsList === 'undefined') ? gapi.hangout.getParticipants() : participantsList;
  console.log("participants: ", participants);

  if( $("#participantsList") ) {
    console.log("here");
    $("#participantsList").remove();
  }

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
                                  gapi.hangout.onParticipantsChanged.add(function(participantsClass) {
                                    console.log("my participants: ", gapi.hangout.getParticipants());
                                    showParticipants(participantsClass.participants);
                                  });
                                }, 1);
        }
      });
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

