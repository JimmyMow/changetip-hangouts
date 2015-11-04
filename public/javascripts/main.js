function showParticipants() {
  var participants = gapi.hangout.getParticipants();
  console.log("participants: ", participants);
  var participantsDiv = $("#participantsDiv");
  console.log("test: ", participantsDiv);

  // var ulTag = document.createElement('ul');
  // ulTag.id = "participantsList"
  // document.getElementById("participantsDiv").appendChild(ulTag);​

  // for (var index in participants) {
  //   var participant = participants[index];
  //   console.log("participant: ", participant);

  //   var listElement = document.createElement('li');
  //   listElement.id = "person-"+participant.person.id
  //   ​document.getElementById("participantsList").appendChild(listElement);​

  //   var aTag = document.createElement('a');
  //   aTag.text = participant.person.displayName;
  //   aTag.href = "#";
  //   aTag.addEventListener('click', function(){
  //     clickedPerson(participant);
  //   });

  //   ​document.getElementById("person-"+participant.person.id).appendChild(aTag);​
  // }
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
