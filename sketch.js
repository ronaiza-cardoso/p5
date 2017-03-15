var symbolSize   = 14
var streams      = []
var fadeInterval = 1.6
var centerBuffer
function setup () {
 createCanvas(window.innerWidth, window.innerHeight)
 centerBuffer = createGraphics(400, 250)

 background(0)
 var x = 0

 for (var i = 0; i <= width / symbolSize; i++) {
  stream = new Stream()
  stream.generateSymbols(x, random(-1000, 0))
  streams.push(stream)

  x += symbolSize

 }

 textFont('Consolas')
 textSize(symbolSize)
}

function draw() {
 drawCenterBuffer()
 background(0, 150)
 streams.forEach(stream => {
  stream.render()
 })
 image(centerBuffer, (window.innerWidth / 2.9), (window.innerHeight / 4));
}

function drawCenterBuffer() {
 centerBuffer.background(180, 255, 180)
 centerBuffer.fill(0, 0, 0);
 centerBuffer.textSize(32);
 centerBuffer.text("Hello World", 120, 120);
}

function Symbol(x, y, speed, fist) {
 this.x = x
 this.y = y
 this.value
 this.speed = speed
 this.switchInterval = round(random(2, 10))
 this.fist = fist

 this.setToRandomSymbol = function () {
  if(frameCount % this.switchInterval === 0){
   this.value = String.fromCharCode(
    0x30A0 + round(random(0, 96))
   )
  }
}

 this.rain = function() {
  this.y = (this.y >= height) ?  0 : this.y += this.speed
 }

}

function Stream() {
 this.symbols      = []
 this.totalSymbols = round(random(5, 10))
 this.speed        = random(5, 10)

 this.generateSymbols = function(x, y) {
   var opacity = 255
   var fist = round(random(0, 4)) === 1
   for(var i = 0; i <= this.totalSymbols; i++){
    symbol = new Symbol(x, y, this.speed, fist, opacity)
    symbol.rain()
    symbol.setToRandomSymbol()
    this.symbols.push(symbol)
    opacity -= (255 / this.totalSymbols) / fadeInterval
    y -= symbolSize
    fist = false
   }

  }

  this.render = function() {
   this.symbols.forEach(symbol => {
    if(symbol.fist) {
     fill(180, 255, 180, symbol.opacity)
    } else {
     fill(0, 255, 70, symbol.opacity)
    }

    text(symbol.value, symbol.x, symbol.y)
    symbol.rain()
    symbol.setToRandomSymbol()
   })
  }

}
