$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function() {
  $("#sendTipForm").on("submit", function(e) {
    e.preventDefault();
    console.log("string: ", JSON.stringify($('#sendTipForm').serializeObject()));
    console.log("not string: ", $('#sendTipForm').serializeObject());
    var data = $('#sendTipForm').serializeObject();
//  tip[money_val]: "have a cent buddy"
//  tip[receiver]: "106784919214705677125"
//  tip[sender]: "108104158228107899864"

    var realData = {
      sender: data['tip[sender]'],
      receiver: data['tip[receiver]'],
      message: data['tip[money_val]']
    };
    console.log("real data: ", realData);
    fetch('https://stark-hamlet-6630.herokuapp.com/tip', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: realData
    })
    .then((response) => response.json()).then(function(data) {
        console.log("yo data: ", data);
    });
    // $.ajax({
    //   type: "POST",
    //   url: 'https://stark-hamlet-6630.herokuapp.com/tip',
    //   data: realData,
    //   success: function(data) {
    //     console.log("yo data: ", data);
    //   }
    });
  });
});

function showParticipants(participantsList) {
  var participants = (typeof participantsList === 'undefined') ? gapi.hangout.getParticipants() : participantsList;
  console.log("participants: ", participants);

  if( $("#participantsList") ) {
    $("#participantsList").remove();
    $( "input[name='tip[sender]']" ).remove();
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

