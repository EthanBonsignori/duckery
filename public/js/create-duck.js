// eslint-disable-next-line no-unused-vars
var gradientOn = false;
// eslint-disable-next-line no-unused-vars
var patternOn = false;

$('#head_test').on('click', function() {
  alert('Quack! My head is ' + colGradPat.head.color);
});

$('#body_test').on('click', function() {
  alert('Quack! My body is ' + colGradPat.body.color);
});

$('#bill_test').on('click', function() {
  alert('Quack! My bill is ' + colGradPat.bill.color);
});

$('#download').on('click', function() {
  $('canvas').getCanvasImage();
  console.log('Download');
});

$('#addhat').on('click', function() {
  hatButton();
});

var hatOn = false;

var gradsrc = {
  c1: 'red',
  c2: 'white'
};
var grad = function(layer) {
  return $(this).createGradient({
    // Gradient is drawn relative to layer position
    x1: 0,
    y1: layer.y - layer.height,
    x2: 0,
    y2: layer.y + layer.height,
    c1: gradsrc.c1,
    c2: gradsrc.c2
  });
};

var patsrc = 'tartan.png';
// eslint-disable-next-line no-unused-vars
var pat = function(layer) {
  return $(this).createPattern({
    source: './duck/patterns/' + patsrc,
    repeat: 'repeat'
  });
};

var colGradPat = {
  head: {
    color: 'yellow',
    pattern: pat,
    gradient: grad
  },
  body: {
    color: '#ffff00',
    pattern: pat,
    gradient: grad
  },
  bill: {
    color: 'orange',
    pattern: pat,
    gradient: grad
  }
};

function drawBody() {
  $('canvas').removeLayerGroup('body');

  $('canvas')
    .drawEllipse({
      layer: true,
      name: 'body',
      groups: ['body', 'duck'],
      index: 0,
      strokeStyle: '#000',
      strokeWidth: 3,
      fillStyle: colGradPat.body.color,
      shadowColor: 'rgb(0, 0, 0, 0.5)',
      shadowBlur: 15,
      shadowX: 4,
      shadowY: 10,
      x: 210,
      y: 230,
      width: 200,
      height: 150
    })
    .drawBezier({
      layer: true,
      name: 'wing',
      groups: ['body', 'beziers'],
      index: 1,
      strokeStyle: 'rgb(0,0,0, 0.5)',
      fillStyle: 'rgb(0,0,0, 0.04)',
      strokeWidth: 3,
      x1: 205,
      y1: 280,
      cx1: 225,
      cy1: 310,
      cx2: 375,
      cy2: 210,
      x2: 205,
      y2: 240
    });
}

function drawHead() {
  $('canvas').removeLayerGroup('head');

  $('canvas')
    .drawEllipse({
      layer: true,
      name: 'head',
      groups: ['head', 'duck'],
      index: 3,
      strokeStyle: '#000',
      strokeWidth: 3,
      fillStyle: colGradPat.head.color,
      shadowColor: 'rgb(0, 0, 0, 0.3)',
      shadowBlur: 15,
      shadowX: 0,
      shadowY: 5,
      x: 160,
      y: 150,
      width: 120,
      height: 120
    })
    .drawEllipse({
      layer: true,
      name: 'lefteye',
      groups: ['head', 'duck'],
      index: 9,
      strokeStyle: 'black',
      strokeWidth: 5,
      fillStyle: 'white',
      x: 110,
      y: 140,
      width: 14,
      height: 18
    })
    .drawEllipse({
      layer: true,
      name: 'righteye',
      groups: ['head', 'duck'],
      index: 9,
      strokeStyle: 'black',
      strokeWidth: 5,
      fillStyle: 'white',
      x: 170,
      y: 140,
      width: 14,
      height: 18
    });
}

function drawBill() {
  $('canvas').removeLayer('bill');

  $('canvas').drawPath({
    layer: true,
    name: 'bill',
    groups: ['beziers'],
    index: 4,
    strokeStyle: '#000',
    strokeWidth: 3,
    fillStyle: colGradPat.bill.color,
    shadowColor: 'rgb(0, 0, 0, 0.2)',
    shadowBlur: 15,
    shadowX: 0,
    shadowY: 3,
    p1: {
      type: 'bezier',
      x1: 115,
      y1: 160, // Start point
      cx1: 155,
      cy1: 100, // Control point
      cx2: 140,
      cy2: 160, // Control point
      x2: 175,
      y2: 160 // Start/end point
    },
    p2: {
      type: 'bezier',
      x1: 115,
      y1: 160,
      cx1: 50,
      cy1: 190,
      cx2: 95,
      cy2: 220,
      x2: 175,
      y2: 160
    }
  });
}

function drawDuck() {
  $('canvas').clearCanvas();
  drawBody();
  drawHead();
  drawBill();
  if (hatOn) {
    drawHat();
  }
}

function drawHat() {
  $('canvas').removeLayer('hat');
  $('canvas').drawImage({
    name: 'hat',
    groups: ['duck'],
    imageSmoothing: true,
    layer: true,
    index: 10,
    load: $('canvas').drawLayers(),
    shadowColor: 'rgb(0, 0, 0, 0.3)',
    shadowBlur: 15,
    shadowX: 0,
    shadowY: 5,
    source: './duck/accessories/l3helmet.svg',
    x: 200,
    y: 200
  });
}

function hatButton() {
  if (hatOn) {
    $('canvas').removeLayer('hat');
    $('canvas').drawLayers();
    hatOn = false;
  } else {
    hatOn = true;
    drawHat();
  }
}

drawDuck();

function changeStyle(varlayer, style, val) {
  style = val;
  $('canvas').setLayer(varlayer, {
    fillStyle: style
  });
  if (hatOn) {
    drawHat();
  }
  $('canvas').drawLayers();
}

$('#head_color').change(function() {
  changeStyle('head', colGradPat.head.color, $('#head_color').val());
  gradientOn = false;
});

$('#bill_color').change(function() {
  changeStyle('bill', colGradPat.bill.color, $('#bill_color').val());
});

$('#body_color').change(function() {
  changeStyle('body', colGradPat.body.color, $('#body_color').val());
  patternOn = false;
});

$('#grad_test').on('click', function() {
  changeStyle('head', colGradPat.head.gradient, colGradPat.head.gradient);
  gradientOn = true;
});

$('#patt_test').on('click', function() {
  changeStyle('body', colGradPat.body.pattern, colGradPat.body.pattern);
  patternOn = true;
});
