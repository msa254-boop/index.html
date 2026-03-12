let scaleSlider, heightSlider, detailSlider;

let cols = 100;
let rows = 100;

let terrain = [];

let scale = 0.02;
let heightMultiplier = 150;
let detail = 3;

function setup() {

  let canvas = createCanvas(700, 600, WEBGL);

  // attach canvas to page
  canvas.parent(document.body);

  // disable right-click menu so orbitControl works
  canvas.elt.oncontextmenu = () => false;

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

  // CAMERA CONTROL
  orbitControl(1,1,0.1);

  rotateX(PI/3);
  translate(-cols*3,-rows*3);

  stroke(255);
  noFill();

  for (let y = 0; y < rows - 1; y++) {

    beginShape(TRIANGLE_STRIP);

    for (let x = 0; x < cols; x++) {

      vertex(x*6, y*6, terrain[x][y]);
      vertex(x*6, (y+1)*6, terrain[x][y+1]);

    }

    endShape();

  }

}
