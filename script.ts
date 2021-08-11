const WORDS = [
	"Strawberry",
	"Eclipse",
	"Chandelier",
	"Ketchup",
	"Toothpaste",
	"Rainbow",
	"Bunkbed",
	"Boardgame",
	"Beehive",
	"Lemon",
	"Wreath",
	"Waffles",
	"Bubble",
	"Whistle",
	"Snowball",
	"Bouquet",
	"Headphones",
	"Fireworks",
	"Igloo",
	"Ferris wheel",
	"Banana peel",
	"Lawnmower",
	"Summer",
	"Whisk",
	"Cupcake",
	"Sleeping bag",
	"Bruise",
	"Fog",
	"Crust",
	"Battery",
	"Paris",
	"Beach",
	"Mountains",
	"Hawaii",
	"Mount Rushmore",
	"USA",
	"Hospital",
	"Attic",
	"Japan",
	"Library",
	"Desert",
	"Mars",
	"Washington DC",
	"Las Vegas",
	"Train station",
	"North Pole",
	"Farm",
	"Disney World",
	"Mexico",
	"Giraffe",
	"Koala",
	"Wasp",
	"Scorpion",
	"Lion",
	"Salamander",
	"Dolphin",
	"Frog",
	"Panda",
	"Platypus",
	"T-rex",
	"Meerkat",
	"Eagle",
	"Mailman",
	"Superman",
	"Justin Bieber",
	"Cowboy",
	"Alexander Hamilton",
	"Robin Hood",
	"Vampire",
	"Pirate",
	"Girl Scout",
	"Pikachu",
	"Spongebob",
	"Baby Yoda",
	"Pilgrim",
	"Cinderella",
	"Baker",
	"Abe Lincoln",
	"Thief",
	"Leprechaun",
	"Harry Potter",
	"Shrek",
	"Yoshi",
	"Queen Elizabeth",
	"Skip",
	"Burp",
	"Cook",
	"Scratch",
	"Sleep",
	"Plant",
	"Purchase",
	"Text",
	"Tie",
	"Snore",
	"Catch",
	"Study",
	"Olympics",
	"Sandcastle",
	"Recycle",
	"Blackhole",
	"Applause",
	"Blizzard",
	"Sunburn",
	"Time machine",
	"Lace",
	"Monday",
	"Atlantis",
	"Swamp",
	"Panama Canal",
	"Sunscreen",
	"Dictionary",
	"Vanilla",
	"Century",
];
let countTurn = 0;
let lineColor = "black";
let width = 5;

///         THIS IS ALL PART OF THE CANVAS, DO NOT TOUCH
// works out the X, Y position of the click inside the canvas from the X, Y position on the page
document.onload = initialize;

// works out the X, Y position of the click inside the canvas from the X, Y position on the page
function getPosition(mouseEvent, sigCanvas: HTMLCanvasElement) {
	if (myturn == true) {
		let x, y;
		if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
			x = mouseEvent.pageX;
			y = mouseEvent.pageY;
		} else {
			x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
	} else {
		return;
	}
}

/*function changeColor(id: ) {
  let idValue = id.value.toLowerCase();
  lineColor = idValue.toString();
}*/

function changeSize(id) {
	let idValue = id.value;
	width = idValue;
}

function initialize() {
	// get references to the canvas element as well as the 2D drawing context
	let sigCanvas = document.getElementById("canvasSignature") as HTMLCanvasElement;
	sigCanvas.height = sigCanvas.clientHeight;
	sigCanvas.width = sigCanvas.clientWidth;
	let context = sigCanvas.getContext("2d") as CanvasRenderingContext2D;
	context.strokeStyle = "black";
	context.lineWidth = width;

	// This will be defined on a TOUCH device such as iPad or Android, etc.
	let is_touch_device = "ontouchstart" in document.documentElement;

	if (is_touch_device) {
		// create a drawer which tracks touch movements
		var drawer = {
			isDrawing: false,
			touchstart: (coors) => {
				context.beginPath();
				context.moveTo(coors.x, coors.y);
				this.isDrawing = true;
			},
			touchmove: (coors) => {
				if (this.isDrawing) {
					context.lineTo(coors.x, coors.y);
					context.stroke();
				}
			},
			touchend: (coors) => {
				if (this.isDrawing) {
					this.touchmove(coors);
					this.isDrawing = false;
				}
			},
		};

		// create a function to pass touch events and coordinates to drawer
		function draw(event) {
			// get the touch coordinates.  Using the first touch in case of multi-touch
			let coors = {
				x: event.targetTouches[0].pageX,
				y: event.targetTouches[0].pageY,
			};

			// Now we need to get the offset of the canvas location
			let obj = sigCanvas;

			if (obj.offsetParent) {
				// Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
				do {
					coors.x -= obj.offsetLeft;
					coors.y -= obj.offsetTop;
				} while (
					// The while loop can be "while (obj = obj.offsetParent)" only, which does return null
					// when null is passed back, but that creates a warning in some editors (i.e. VS2010).
					(obj = obj.offsetParent) != null
				);
			}

			// pass the coordinates to the appropriate handler
			drawer[event.type](coors);
		}

		// attach the touchstart, touchmove, touchend event listeners.
		sigCanvas.addEventListener("touchstart", draw, false);
		sigCanvas.addEventListener("touchmove", draw, false);
		sigCanvas.addEventListener("touchend", draw, false);

		// prevent elastic scrolling
		sigCanvas.addEventListener(
			"touchmove",
			(event) => {
				event.preventDefault();
			},
			false
		);
	} else {
		// start drawing when the mousedown event fires, and attach handlers to
		// draw a line to wherever the mouse moves to
		$("#canvasSignature").mousedown(function (mouseEvent) {
			var position = getPosition(mouseEvent, sigCanvas);
			context.moveTo(position.X - sigCanvas.offsetLeft, position.Y - sigCanvas.offsetTop);
			context.beginPath();

			// attach event handlers
			$(this)
				.mousemove((mouseEvent) => {
					drawLine(mouseEvent, sigCanvas, context);
				})
				.mouseup((mouseEvent) => {
					finishDrawing(mouseEvent, sigCanvas, context);
				})
				.mouseout((mouseEvent) => {
					finishDrawing(mouseEvent, sigCanvas, context);
				});
		});
	}
}
// draws a line to the x and y coordinates of the mouse event inside
// the specified element using the specified context
function drawLine(mouseEvent, sigCanvas, context) {
	let position = getPosition(mouseEvent, sigCanvas);

	context.strokeStyle = lineColor;
	context.lineWidth = width;
	context.lineTo(position.X, position.Y);
	context.stroke();
}

// draws a line from the last coordiantes in the path to the finishing
// coordinates and unbind any event handlers which need to be preceded
// by the mouse down event
function finishDrawing(mouseEvent, sigCanvas, context) {
	// draw the line to the finishing coordinates
	sendLine(sigCanvas.getContext("2d"));
	drawLine(mouseEvent, sigCanvas, context);

	context.closePath();

	// unbind any events which could draw
	$(sigCanvas).unbind("mousemove").unbind("mouseup").unbind("mouseout");
}
///         CANVAS STUFF FINISHED. YOU CAN EDIT THE CONTENT BELOW

///         LOG MESSAGE TO PAGE

let players: string[] = [];

const username = prompt("Enter a username", "Guest");

if (username != null) {
	players.push(username);
}

function getWord() {
	let rndnumber = Math.floor(Math.random() * 113);
	let word = WORDS[rndnumber];
	theWord = word;
	document.getElementById("word").innerHTML = word;
	sendWord(word);
}

function logMessage() {
	let guess = document.getElementById("guess") as HTMLInputElement;

	if (guess.value.trim() != "") {
		const message = guess.value;
		if (message.toUpperCase() == String(theWord).toUpperCase()) {
			clearCanvas();
			sendGuessed();
		} else {
			sendmsg();
		}
	}
	guess.value = "";
}

function clearCanvas() {
	var canvas = document.getElementById("canvasSignature");
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

///         P2P config etc

var peer = new Peer();
var conn;
var myturn = false;
var conns = [];

peer.on("open", (id: string) => {
	let idLbl = document.getElementById("idLbl") as HTMLParagraphElement;
	idLbl.innerHTML = id;
});

function connect() {
	var connId = document.getElementById("otherId").value;
	conn = peer.connect(connId);
	document.getElementById("otherId").disabled = true;

	conn.on("open", () => {
		document.getElementById("guess").disabled = false;
	});

	conn.on("data", (data) => {
		if (data.status == "msg") {
			document.getElementById("chatText").innerHTML = data.sender + ": " + data.message + "<br>" + document.getElementById("chatText").innerHTML;
		} else if (data.status == "word") {
			theWord = data.secret;
			//console.log(data.secret);
			//console.log(theWord);
		} else if (data.status == "guessed") {
			//theWord="";
			document.getElementById("chatText").innerHTML = data.sender + " guessed the word!" + "<br>" + document.getElementById("chatText").innerHTML;
			myturn = false;
			//document.getElementById("chatText").innerHTML = data.sender + " guessed the word!" +"<br>"+ document.getElementById("chatText").innerHTML;
			document.getElementById("word").innerHTML = "...";
			//document.getElementById("otherId").disabled = true;
			document.getElementById("guess").disabled = false;
			clearCanvas();

			/*if (countTurn < conns.length) {
                sendTurn();
                countTurn += 1;
            }

            else if (countTurn == conns.length) {
                myturn = true;
                document.getElementById("getWordBtn").disabled = false;
                document.getElementById("guess").disabled = true;
            }*/
		} else if (data.status == "turn") {
			////console.log("line305")
			myturn = true;
			document.getElementById("guess").disabled = true;
			sendMyTurn();
			getWord();
		} else {
			var sigCanvas = document.getElementById("canvasSignature");
			////console.log("linereceived")
			//sigCanvas.getContext("2d").drawImage(data,0,0)
			var image = new Image();
			image.onload = function () {
				sigCanvas.getContext("2d").drawImage(image, 0, 0);
			};
			image.src = data;
		}
	});

	conn.on("close", () => {
		alert("Host Ended Session");
		peer.destroy();
	});
}

let connected;

function copyID() {
	var copyText = document.getElementById("idLbl");
	copyText.select();
	document.execCommand("copy");
}

peer.on("connection", (connection) => {
	////console.log("connected")
	var conn1 = connection;
	conns.push(conn1);
	myturn = true;
	document.getElementById("otherId").disabled = true;
	document.getElementById("guess").disabled = true;

	connection.on("open", () => {
		connected = true;
		sendMyTurn();
		getWord();
	});

	connection.on("data", (data) => {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(data);
		}

		if (data.status == "msg") {
			document.getElementById("chatText").innerHTML = data.sender + ": " + data.message + "<br>" + document.getElementById("chatText").innerHTML;
		} else if (data.status == "word") {
			theWord = data.secret;
		} else if (data.status == "guessed") {
			document.getElementById("chatText").innerHTML = data.sender + " guessed the word!" + "<br>" + document.getElementById("chatText").innerHTML;
			//theWord="";
			document.getElementById("word").innerHTML = "...";
			//document.getElementById("otherId").disabled = true;
			document.getElementById("guess").disabled = false;
			myturn = false;
			clearCanvas();

			if (countTurn < conns.length) {
				////console.log(conns);
				////console.log(conns.length);
				////console.log(countTurn);
				sendTurn();
				countTurn += 1;
			} else if (countTurn == conns.length) {
				//console.log(conns.length);
				//console.log(countTurn);
				myturn = true;
				sendMyTurn();
				getWord();
				document.getElementById("guess").disabled = true;
				countTurn = 0;
			}
		} else {
			var sigCanvas = document.getElementById("canvasSignature");
			//console.log("linereceived")
			//sigCanvas.getContext("2d").drawImage(data,0,0)
			var image = new Image();
			image.onload = function () {
				sigCanvas.getContext("2d").drawImage(image, 0, 0);
			};
			image.src = data;
		}
	});

	connection.on("close", () => {
		////console.log("connection closed");
	});
});

function sendmsg() {
	const data = {
		status: "msg",
		message: document.getElementById("guess").value,
		sender: username,
	};

	document.getElementById("guess").value = "";
	if (conn) {
		conn.send(data);
	} else {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(data);
		}
		document.getElementById("chatText").innerHTML = data.sender + ": " + data.message + "<br>" + document.getElementById("chatText").innerHTML;
	}
}

function sendGuessed() {
	const data = {
		status: "guessed",
		sender: username,
	};

	document.getElementById("guess").value = "";
	if (conn) {
		conn.send(data);
	} else {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(data);
		}
		if (countTurn < conns.length) {
			//console.log("fhfhfhfhfhhf")
			sendTurn();
			countTurn += 1;
		} else if (countTurn == conns.length) {
			//console.log(conns.length);
			//console.log(countTurn);
			//console.log("elsif");
			myturn = true;
			sendMyTurn();
			getWord();
			document.getElementById("guess").disabled = true;
			countTurn = 0;
		}

		/*for (var i = 0; i<conns.length; i++) {
            conns[i].send(data);
        }*/
		document.getElementById("chatText").innerHTML = data.sender + " guessed the word!" + "<br>" + document.getElementById("chatText").innerHTML;
	}
}

function sendTurn() {
	const data = {
		status: "turn",
	};
	//console.log(countTurn)
	conns[countTurn].send(data);
}

function sendMyTurn() {
	const data = {
		status: "msg",
		message: "I am drawing now!",
		sender: username,
	};

	document.getElementById("guess").value = "";
	if (conn) {
		conn.send(data);
	} else {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(data);
		}
		document.getElementById("chatText").innerHTML = data.sender + ": " + data.message + "<br>" + document.getElementById("chatText").innerHTML;
	}
}

function sendLine() {
	var sigCanvas = document.getElementById("canvasSignature");
	const lineInfo = sigCanvas.toDataURL();

	if (conn) {
		conn.send(lineInfo);
	} else {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(lineInfo);
		}
		//document.getElementById("chatText").innerHTML = data.sender + " - " + data.message +"<br>"+ document.getElementById("chatText").innerHTML;
	}
}

function sendWord(word) {
	var wordpkg = {
		status: "word",
		secret: word,
	};

	if (conn) {
		conn.send(wordpkg);
	} else {
		for (var i = 0; i < conns.length; i++) {
			conns[i].send(wordpkg);
		}
	}
}

///         END OF CHAT FUNCTION*/
