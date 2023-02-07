song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

song1Status = "";
song2Status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {

    canvas = createCanvas(600, 500);
    canvas.position(375, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("Right Wrist x = " + rightWristX + " y = "+ rightWristY + " score = " + scoreRightWrist);
        console.log("Right Wrist x = " + rightWristX + " y = "+ rightWristY + " score = " + scoreRightWrist);
    }
}

function modelLoaded(){
    console.log("Pose Net is loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();

    fill('red');
    stroke('red');

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Song Playing - Harry Potter";
        }

    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Song Playing - PeterPan";
        }

    }
}

function play(){
    song.play();
    song.volume(1);
    song.rate(1);
}