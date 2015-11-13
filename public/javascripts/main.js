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
    var data = $('#sendTipForm').serializeObject();
    var sender_display = $("#" + data['tip[sender]']).val();
    var receiver_display = $("#" + data['tip[receiver]']).val();
    var realData = {
      sender: data['tip[sender]'],
      receiver: data['tip[receiver]'],
      message: data['tip[money_val]'],
      sender_display: sender_display,
      receiver_display: receiver_display
    };
    console.log("realData: ", realData);
    $.ajax({
      type: "POST",
      url: 'https://stark-hamlet-6630.herokuapp.com/tip',
      data: realData,
      success: function(data) {
        var tip = data.result.tip;
        console.log("dataatata: ", data);
        console.log("tip: ", tip);
        if (data.result.state === "ok") {
          var message = "<p>Hey " + tip.receiver_display + ", you've been tipped " + tip.fiat_display + " by " + tip.sender_display + ". Collect it <a href='" + tip.collect_url_short + "'>here</a></p>";
          console.log("message: ", message);
          $("#tipResponse").append(message);
        }
      }
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

    $("<input>", {
      "type": "hidden",
      "id": participant.person.id,
      "value": participant.person.displayName
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

