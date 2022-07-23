function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet", MobileLoaded);
}
function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
}
 function MobileLoaded(){
  console.log("MobileNet is loaded");
 }
var previous_results="";
function gotResults(error, results){
  if(error){
    console.log(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previous_results != results[0].label)){
    console.log(results);
    previous_results=results[0].label;
    synth=window.speechSynthesis;
    utter_this= "Object deceted is - "+results[0].label;
    speak_out=new SpeechSynthesisUtterance(utter_this);
    synth.speak(speak_out);

    document.getElementById("Object").innerHTML= results[0].label;
    document.getElementById("Accuracy").innerHTML= results[0].confidence.toFixed(3);
    }
  }
}

