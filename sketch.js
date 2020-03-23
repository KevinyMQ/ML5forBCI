// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let model;

const options = {
  inputs: 8*60, 
  outputs: ['label'],
  task: 'classification',
  //learningRate: 0.75,
  debug: true
}


function setup(){
  createCanvas(0, 0);
  
  model = ml5.neuralNetwork(options);

  leftChunks = chunkArray(left, 8*60);
  rightChunks = chunkArray(right, 8*60);
  upChunks = chunkArray(up, 8*60);
  downChunks = chunkArray(down, 8*60);
}

function addLeft(){
  for (let index = 0; index < 20; index++) {
    for (let i = 0; i < 10; i++) {
      model.addData(leftChunks[i], {label: "left"})
    }
  }

  console.log("Adding training data for LEFT");    
  console.log(leftChunks);    
}
function addRight(){
  for (let index = 0; index < 20; index++) {
    for (let i = 0; i < 10; i++) {
      model.addData(rightChunks[i], {label: "right"})
    }
  }

  console.log("Adding training data for RIGHT");    
  console.log(rightChunks);    
}
function addUp(){
  for (let index = 0; index < 20; index++) {
    for (let i = 0; i < 10; i++) {
      model.addData(upChunks[i], {label: "up"})
    }
  }
 
  console.log("Adding training data for UP");    
  console.log(upChunks);    
}
function addDown(){
  for (let index = 0; index < 20; index++) {
    for (let i = 0; i < 10; i++) {
      model.addData(downChunks[i], {label: "down"})
    }
  }

  console.log("Adding training data for DOWN");    
  console.log(downChunks);    
}

function train(){
  model.normalizeData();
  trainingOptions = {epochs: 60}; //If you want to change the training options
  model.train(trainingOptions, finishedTraining);
}

function finishedTraining(){
  console.log("Training finished");
}

function testLeft(){
  let leftToTest = leftChunks[4];
  test(leftToTest);
}
function testRight(){
  let rightToTest = rightChunks[6];  
  test(rightToTest);
}
function testUp(){
  let upToTest = upChunks[4];  
  test(upToTest);
}
function testDown(){
  let downToTest = downChunks[9];  
  test(downToTest);
}
function test(toTest){
  console.log(toTest);
  model.classify(toTest, function(err, result){
    console.log(result[0].label);
  })
}

