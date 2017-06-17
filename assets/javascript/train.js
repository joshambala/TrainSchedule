
$(document).ready(function(){

	var config = {
	    apiKey: "AIzaSyAZi9w6_NfAYCA2fOM6L2npOShhzdN15Y4",
	    authDomain: "trainschedule-5cd9f.firebaseapp.com",
	    databaseURL: "https://trainschedule-5cd9f.firebaseio.com",
	    projectId: "trainschedule-5cd9f",
	    storageBucket: "",
	    messagingSenderId: "82381063239"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();



	$("#trainForm").on("submit", function(event){
		event.preventDefault();

		var values = $(this).serializeArray()
		console.log(values)

		values = formatData(values)
		console.log("2", values)

		writeData(values);

	
	})


	var trainsRef = database.ref();
	trainsRef.on('value', function(snapshot){
		$("#trainSchedule tbody").empty();
		snapshot.forEach(function(childSnapshot){
			var row = $("<tr>")

			row.append($("<td>").text(childSnapshot.val().departure_city))
			row.append($("<td>").text(childSnapshot.val().arrival_city))
			row.append($("<td>").text(childSnapshot.val().frequency_of_train))
			row.append($("<td>").text(childSnapshot.val().time_of_train))
			row.append($("<td>").text(childSnapshot.val().time_of_train))



			$("#trainSchedule tbody").append(row)

		})
	})



	function writeData(values){
		database.ref().push(values)
	}



	function formatData(values){
		var formattedData = {}

		values.forEach(function(value){
			formattedData[value.name] = value.value;
		})

		return formattedData
	}

});
