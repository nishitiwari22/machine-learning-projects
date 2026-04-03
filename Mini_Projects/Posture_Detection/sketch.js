let capture;
let posenet;
let noseX,noseY;
let singlepose;
let reyeX,reyeY;
let leyeX,leyeY;
// let singlePose,skeleton;
// let specs,smoke;

function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.hide();
  posenet = ml5.poseNet(capture,modelLoaded);
  posenet.on('pose',gotPoses);

//   specs = loadImage("specs.png");
}

function recievedPoses(poses){
    console.log(poses);


    if(poses.length > 0){
        singlePose = poses[0].pose;
        noseX = singlepose.pose.nose.x;
        noseY = singlepose.pose.nose.y;
    }

    console.log(noseX + " " + noseY);

}


function modelLoaded(){
  console.log("Model is loaded");
}

// function gotPoses(poses){
//   if(poses.length > 0){
//     console.log(poses);
//   }
// }
// console.log("Setup is done");

// function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
// }
//infitie loop
function draw() {
    // console.log("Draw is called");

    // img and videos (webcam)
    console.log("Model has loaded");

    Image(capture, 0, 0, 800, 600)
    fill(255,0,0);
    // ellipse(noseX, noseY, 30, 30)
    ellipse(reyeX, reyeY, 30)
    ellipse(leyeX, leyeY, 30)



    // r = getRandomArbitrary(0,255);
    // g = getRandomArbitrary(0,255);
    // b = getRandomArbitrary(0,255);
    // // stroke(r,g,b);
    // fill(r, g, b);
    // ellipse(mouseX, mouseY, 50, 50);

    // background(200);
    // //1. point 
    // point (200,200);

    // //2. line
    // line(300,300,400,400);

    // //3. rectangle
    // rect(100,100,50,50);

    // //4. circle
    // circle(500,100,50);

    // // 5. ellipse
    // ellipse(500,300,100,50);

//  Stroke and Fill
    // stroke(255,0,0);
    // fill(0,255,0);
    // rect(100,100,50,50);

  image(capture,0,0);
    if(singlePose){
        fill(255,0,0);
        noseX = singlePose.nose.x;
        noseY = singlePose.nose.y;
        reyeX = singlePose.rightEye.x;
        reyeY = singlePose.rightEye.y;
        leyeX = singlePose.leftEye.x;
        leyeY = singlePose.leftEye.y;
        image(specs,reyeX-50,reyeY-50,100,100);
        image(specs,leyeX-50,leyeY-50,100,100);
   }
}
