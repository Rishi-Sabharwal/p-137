objects=[];
video="";
status="";

function preload() {
    video=createVideo('video.mp4');
}

function setup() {
    canvas=createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    video = window.speechSynthesis;
    video = new SpeechSynthesisUtterance(text);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status!="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Nuber of Objects detected are : "+objects.length;

            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+ percent+"%", objects[i].x+15, objects[i].y+15);
            nofill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
}
