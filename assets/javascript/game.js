$(document).ready(function() {


//available characters as individual objects
var bork = {
	name: "Bork",
	health: 120,
	attack: 3,
	counter: 12
};

var mork = {
	name: "Mork",
	health: 90,
	attack: 10,
	counter: 5
};

var zork = {
	name: "Zork",
	health: 100,
	attack: 6,
	counter: 8
};

var lork = {
	name: "Lork",
	health: 110,
	attack: 4,
	counter: 10
};


var opponentsDefeated = 0;
var playerChosen = false;
var opponentChosen = false;
var userPlayer;
var currentOpponent;
var startingValue;
var userImage;
var opponentImage;

//audio variable
var tribbleCoo = document.createElement("audio");
    tribbleCoo.setAttribute("src", "assets/sounds/tos-tribble.mp3");

$("#borkName").html(bork.name + "<br />" + "Health Prime " + bork.health);
$("#morkName").html(mork.name + "<br />" + "Health Prime " + mork.health);
$("#zorkName").html(zork.name + "<br />" + "Health Prime " + zork.health);
$("#lorkName").html(lork.name + "<br />" + "Health Prime " + lork.health);


//Reset the game function

function reset(){
	opponentsDefeated = 0;
	playerChosen = false;
	opponentChosen = false;
	userPlayer;
	currentOpponent;
	startingValue;
	$("#defenderbox").empty();
	$("#player-box").empty();
	$("#currentOpponent").empty();
}

$(".player-pic").click(function(event) {

	if (playerChosen === false && opponentChosen === false) {
		$(this).appendTo("#player-box").removeClass("opponents").addClass('animated tada');
		$(".opponents").appendTo("#defenderbox");
		playerChosen = true;
		tribbleCoo.play();


		//assign selected player (object) to the userPlayer variable

		if ($(this).hasClass("tribbleone"))
		{
			userPlayer = bork;
		};
		if ($(this).hasClass("tribbletwo"))
		{
			userPlayer = mork;
		};
		if ($(this).hasClass("tribblethree"))
		{
			userPlayer = zork;
		};
		if ($(this).hasClass("tribblefour"))
		{
			userPlayer = lork;
		};



		$(".defenderChoose").text("Select an opponent to attack");
		startingValue = userPlayer.attack;


	}

	else if (playerChosen === true && opponentChosen === false) {
	
	$(this).appendTo("#currentOpponent");
	opponentChosen = true;
	opponentImage = (this);
	if ($(this).hasClass("tribbleone"))
	{
		currentOpponent = bork;
	};
	if ($(this).hasClass("tribbletwo"))
	{
		currentOpponent = mork;
	};
	if ($(this).hasClass("tribblethree"))
	{
		currentOpponent = zork;
	};
	if ($(this).hasClass("tribblefour"))
	{
		currentOpponent = lork;
	};

	$("#currentOpponent").append("<br />" + "Health: " + currentOpponent.health).addClass('animated tada');
	$(".defenderChoose").text("");
	$(".attack").addClass("btn btn-primary attack").text("FIGHT");
}


	});



//this will be the actions taken when the attack button is pressed
$(".attack").click(function(e) {

if (currentOpponent.health > 0)
{
$("#notifications").text("You attacked " + currentOpponent.name + " for " + userPlayer.attack + " damage points.  He counterattacked for " + currentOpponent.counter + " damage points.");
currentOpponent.health = currentOpponent.health - userPlayer.attack;
userPlayer.health = userPlayer.health - currentOpponent.counter;
userPlayer.attack = userPlayer.attack + startingValue;
$("#player-box").html(userImage);
$("#player-box2").html("Health: " + userPlayer.health);
$("#currentOpponent").html(opponentImage).append("Health: " + currentOpponent.health);

//check to see if the opponent has been defeated
	if (currentOpponent.health <= 0)
	{
		$("#notifications").text("You have defeated " + currentOpponent.name + "! Pick another opponent to continue.");
		opponentsDefeated = opponentsDefeated + 1;
		opponentChosen = false;
		$("#currentOpponent").removeClass('animated tada');		
		$("#currentOpponent").empty();
	}

	//check to see if all the opponents have been defeated - if so, reset the gamespace	
	if (opponentsDefeated === 3)
	{
		$("#notifications").text("Congratulations! You Win");


		$(".reset").addClass("btn btn-warning reset-button center-block").text("Reset");
		$(".defenderChoose").text("");
		$(".reset-button").click(function(e)

	{
		location.reload();
});

	}

	//check to see if the user player has been defeated
	if(userPlayer.health <= 0)
	{
		$("#notifications").text("You have been defeated, better luck next time.");
		reset();
	}	


};



});

});