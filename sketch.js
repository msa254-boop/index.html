let scaleSlider, heightSlider, detailSlider;

let cols = 120;
let rows = 120;

let terrain = [];

let scale = 0.02;
let heightMultiplier = 150;
let detail = 3;

function setup() {

  let canvas = createCanvas(700, 600, WEBGL);
  canvas.parent(document.body);

  scaleSlider = document.getElementById("scaleSlider");
  heightSlider = document.getElementById("heightSlider");
  detailSlider = document.getElementById("detailSlider");

  document.getElementById("generateBtn").onclick = generateTerrain;

  generateTerrain();

}

function generateTerrain() {

  scale = parseFloat(scaleSlider.value);
  heightMultiplier = parseFloat(heightSlider.value);
  detail = parseInt(detailSlider.value);

  noiseSeed(random(10000));

  terrain = [];

  for (let x = 0; x < cols; x++) {

    terrain[x] = [];

    for (let y = 0; y < rows; y++) {

      let nx = x * scale;
      let ny = y * scale;

      terrain[x][y] = layeredNoise(nx, ny) * heightMultiplier;

    }
  }

}

function layeredNoise(x, y) {

  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < detail; i++) {

    total += noise(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;

    amplitude *= 0.5;
    frequency *= 2;

  }

  return total / maxValue;

}

function draw() {

  background(20);

  rotateX(PI / 3);

  translate(-cols * 2, -rows * 2);

  stroke(255);
  noFill();

  for (let y = 0; y < rows - 1; y++) {

    beginShape();

    for (let x = 0; x < cols; x++) {

      vertex(x * 4, y * 4, terrain[x][y]);

    }

    endShape();

  }

}
