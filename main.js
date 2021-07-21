function preload() {

}

function setup() {
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);
    video = createCapture(VIDEO);
    video.size(550, 500);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded() {
    console.log("model is loaded");
}

var noseX = 0;
var noseY = 0;
var difference = 0;
rightwristX = 0;
leftwristX = 0;

function gotposes(result) {
    if (result.length > 0) {
        console.log(result);
        noseX = result[0].pose.nose.x;
        noseY = result[0].pose.nose.y;
        console.log("nose X =" + noseX + " nose Y =" + noseY);

        leftwristX = result[0].pose.leftWrist.x;
        rightwristX = result[0].pose.rightWrist.x;

        difference = floor(leftwristX - rightwristX); //floor is used to remove decimal points

        console.log("leftwristX =" + leftwristX + " rightwristX =" + rightwristX + " difference =" + difference);
    }
}

function draw() {
    background("#808080");
    square(noseX, noseY, difference);
    fill("#0000FF");
    stroke("#FF0000");

    document.getElementById('square_sides').innerHTML = "width and height of the square will be =" + difference + "px";
}