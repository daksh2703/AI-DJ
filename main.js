LWx = 0;
RWx = 0;
LWy = 0;
RWy = 0;
scoreLW ="";
song = "";

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose = ml5.poseNet(video, modelLoaded);
    pose.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model has initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        LWx = results[0].pose.leftWrist.x;
        LWy = results[0].pose.leftWrist.y;
        RWx = results[0].pose.rightWrist.x;
        RWy = results[0].pose.rightWrist.y;
        console.log("Left wrist x -"+LWx+ ", Left wrist y -"+LWy);
        console.log("Right wrist x -"+RWx+ ", Right wrist y -"+RWy)
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("Right wrist score -"+scoreRW+", Left wrist score-"+scoreLW);
    }
}

function draw() {
    image(video, 0, 0, 650, 500);
    fill("red");
    stroke("red");
    if (scoreLW > 0.2){
        circle(LWx,LWy,20);

        NLWy = floor(Number(LWy));
        volume = NLWy/500;
        document.getElementById("volume").innerHTML = "Volume:"+volume;
        song.setVolume(volume);
    }
    if (scoreRW > 0.2){
        circle(RWx, RWy, 20);

        NRWy = floor(Number(RWy));
        if (NRWy > 0 && NRWy <= 100 ){
            document.getElementById("speed").innerHTML = "Speed: 0.5"
            song.rate(0.5);
        }
        if (NRWy > 100 && NRWy <= 200){
            document.getElementById("speed").innerHTML = "Speed: 1"
            song.rate(1);
        }
        if (NRWy > 200 && NRWy <= 300){
            document.getElementById("speed").innerHTML = "Speed: 1.5"
            song.rate(1.5);
        }
        if (NRWy > 300 && NRWy <= 400){
            document.getElementById("speed").innerHTML = "Speed: 2"
            song.rate(2);
        }
        if (NRWy > 400 && NRWy <= 500){
            document.getElementById("speed").innerHTML = "Speed: 2.5"
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}



