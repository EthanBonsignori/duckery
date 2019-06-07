$(document).ready(function() {
  const obj = document.createElement('audio');
  obj.src = './sound/squeak.wav';
  obj.volume = 0.1;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;

  //Plays squeeze animation and sound
  $('#canvas2').on('click', function() {
    squeeze();
    obj.play();
  });
});

var id = $('.container').attr('id') || '';
$.get('/api/ducks/' + id, function(data) {
  console.log(data);
  if (data.gradient) {
    var gradresult = data.gradient.split(',');
    gradsrc.c1 = gradresult[0];
    gradsrc.c2 = gradresult[1];
    $('canvas').setLayer('head', {
      // eslint-disable-next-line quotes
      fillStyle: grad
    });
  } else {
    $('canvas').setLayer('head', {
      fillStyle: data.head
    });
  }

  $('canvas').setLayer('bill', {
    fillStyle: data.bill
  });

  if (data.pattern) {
    patsrc = data.pattern;
    $('canvas').setLayer('body', {
      fillStyle: pat
    });
  } else {
    $('canvas').setLayer('body', {
      fillStyle: data.body
    });
  }

  if (data.hat) {
    $('canvas').setLayer('hat', {
      source: data.hat
    });
    drawHat();
  }
  $('canvas').drawLayers();
});

//Squeeze the duck to perform an animation. Depresses and returns slightly slower, like rubber.
function squeeze() {
  $('canvas').removeLayerGroup('tips');

  $('#canvas2')
    .animateLayerGroup(
      'duck',
      {
        scaleY: 0.8
      },
      80
    )
    .animateLayerGroup(
      'beziers',
      {
        scaleY: 0.8,
        y: +30
      },
      80
    )
    .animateLayerGroup(
      'accessory',
      {
        scaleY: 0.9
      },
      80
    )
    .animateLayerGroup(
      'duck',
      {
        scaleY: 1
      },
      120
    )
    .animateLayerGroup(
      'beziers',
      {
        scaleY: 1,
        y: 0
      },
      120
    )
    .animateLayerGroup(
      'accessory',
      {
        scaleY: 1
      },
      120
    )
    .drawImage({
      name: 'balloon',
      groups: ['tips'],
      layer: true,
      source: './duck/balloon.svg',
      x: 435,
      y: 90
    })
    .drawText({
      name: 'tip',
      groups: ['tips'],
      layer: true,
      fillStyle: '#000',
      fontStyle: 'bold',
      fontSize: '16pt',
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      text:
        'Quack! Use camelCase or snake_case! PascalCase is the tool of Satan!',
      x: 440,
      y: 90,
      maxWidth: 290
    });
  clearBalloon();
}

function clearBalloon() {
  var bclear = function() {
    $('canvas').removeLayer('balloon');
    $('canvas').drawLayers();
    $('canvas').animateLayerGroup(
      'tips',
      {
        fillStyle: 'rgb(255, 255, 255, 0)'
      },
      0
    );
  };
  setTimeout(bclear, 2000);
}
