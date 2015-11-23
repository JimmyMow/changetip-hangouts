function makeMessage(val) {
  var message = "<p>" + val + "</p>";
  console.log("message from function: ", message);
  console.log($(".alert").length);

  $( "<div/>", {
    id: "alertContainer",
    class: "alert alert-danger alert-dismissible",
    role: "alert"
  }).appendTo($("#tipResponse"));

  var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  $("#alertContainer").append(button);
  $("#alertContainer").append(message);
  return;
}

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
    $("#spinner").removeClass('hide');
    $.ajax({
      type: "POST",
      url: 'https://stark-hamlet-6630.herokuapp.com/tip',
      data: realData,
      error: function(error) {
        $("#spinner").addClass('hide');
        var message = "<p>There was a problem with your tip</p>";
        $( "<div/>", {
          id: "alertContainer",
          class: "alert alert-danger alert-dismissible",
          role: "alert"
        }).appendTo($("#tipResponse"));

        var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        $("#alertContainer").append(button);
        $("#alertContainer").append(message);
      },
      success: function(data) {
        $("#spinner").addClass('hide');
        var tip = data.result.tip;
        console.log("dataatata: ", data);
        console.log("tip: ", tip);

        if(!tip) {
          // var message = "<p>There was a problem with your tip</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("There was a problem with your tip");
        }

        if (data.result.error_message === "Missing required field: receiver") {
          // var message = "<p>You must select a hangout user to send a tip</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("You must select a hangout user to send a tip");
        } else if(data.result.error_message === "Missing required field: message") {
          // var message = "<p>You must send a tip message</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("You must send a tip message");
        } else if (data.result.error_message === "You can't tip yourself.") {
          // var message = "<p>You can't tip yourself</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("You can't tip yourself");
        } else if (data.result.error_code === "invalid_sender") {
          // var message = "<p>To send your first tip, login with your GooglePlus account on ChangeTip</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("To send your first tip, login with your GooglePlus account on ChangeTip");
        } else if (data.result.error_code === "duplicate_context_uid") {
          // var message = "<p>That looks like a duplicate tip.</p>";
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-danger alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage("That looks like a duplicate tip.");
        } else if (data.result.state === "ok") {
          var message = tip.receiver_display + " has been tipped " + tip.fiat_display + " by " + tip.sender_display + ". Collect it <a href='" + tip.collect_url_short + "'>here</a>, " + tip.receiver_display;
          console.log("message: ", message);
          gapi.hangout.data.sendMessage(message);
          // $( "<div/>", {
          //   id: "alertContainer",
          //   class: "alert alert-success alert-dismissible",
          //   role: "alert"
          // }).appendTo($("#tipResponse"));

          // var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          // $("#alertContainer").append(button);
          // $("#alertContainer").append(message);
          makeMessage(message);
        }
      }
    });
    $('input[type=checkbox]').attr('checked', false);
    $('#tipMessageInput').val('');
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

function onMessageReceived(event) {
  console.log("here here trust me im here");
  console.log("message homie: ", event);
  $( "<div/>", {
    id: "alertContainer",
    class: "alert alert-success alert-dismissible",
    role: "alert"
  }).appendTo($("#tipResponse"));

  var button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  $("#alertContainer").append(button);
  $("#alertContainer").append(event.message);
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
                                  gapi.hangout.data.onMessageReceived.add(onMessageReceived);
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

