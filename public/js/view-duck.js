$(document).ready(function() {
  const obj = document.createElement("audio");
  obj.src = "./sound/squeak.wav";
  obj.volume = 0.1;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;

  $("#refresh").on("click", function() {
    duckRendered = true;
    $("#canvas2").removeLayerGroup("tips");
    viewDuck();
  });

  $("#canvas2").on("click", function() {
    if (duckRendered) {
      squeeze();
      obj.play();
    }
  });
});

function viewDuck() {
  $("#canvas2").removeLayers();

  $("#canvas2")
    .drawEllipse({
      layer: true,
      groups: ["duck"],
      name: "body",
      strokeStyle: "#000",
      strokeWidth: 3,
      fillStyle: duckAttrs.bodyColor,
      shadowColor: "rgb(0, 0, 0, 0.5)",
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
      name: "wing",
      groups: ["beziers"],
      strokeStyle: "rgb(0,0,0, 0.3)",
      fillStyle: "rgb(0,0,0, 0.03)",
      strokeWidth: 3,
      x1: 205,
      y1: 280,
      cx1: 225,
      cy1: 310,
      cx2: 375,
      cy2: 210,
      x2: 205,
      y2: 240
    })
    .drawEllipse({
      layer: true,
      groups: ["duck"],
      name: "head",
      strokeStyle: "#000",
      strokeWidth: 3,
      fillStyle: duckAttrs.headColor,
      shadowColor: "rgb(0, 0, 0, 0.3)",
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
      groups: ["duck"],
      name: "lefteye",
      strokeStyle: "black",
      strokeWidth: 5,
      fillStyle: "white",
      x: 120,
      y: 140,
      width: 14,
      height: 18
    })
    .drawEllipse({
      layer: true,
      groups: ["duck"],
      name: "righteye",
      strokeStyle: "black",
      strokeWidth: 5,
      fillStyle: "white",
      x: 170,
      y: 140,
      width: 14,
      height: 18
    })
    .drawPath({
      layer: true,
      name: "bill",
      groups: ["beziers"],
      strokeStyle: "#000",
      strokeWidth: 3,
      fillStyle: duckAttrs.billColor,
      shadowColor: "rgb(0, 0, 0, 0.2)",
      shadowBlur: 15,
      shadowX: 0,
      shadowY: 3,
      p1: {
        type: "bezier",
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
        type: "bezier",
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

  if (duckAttrs.hatOn) {
    $("#canvas2").drawImage({
      name: "hat",
      groups: ["duck"],
      layer: true,
      shadowColor: "rgb(0, 0, 0, 0.3)",
      shadowBlur: 15,
      shadowX: 0,
      shadowY: 5,
      source: "./duck/accessories/l3helmet.svg",
      x: 200,
      y: 200
    });
  }
}

function squeeze() {
  $("#canvas2")
    .animateLayerGroup(
      "duck",
      {
        scaleY: 0.8
      },
      80
    )
    .animateLayerGroup(
      "beziers",
      {
        scaleY: 0.8,
        y: +30
      },
      80
    )
    .animateLayerGroup(
      "duck",
      {
        scaleY: 1
      },
      120
    )
    .animateLayerGroup(
      "beziers",
      {
        scaleY: 1,
        y: 0
      },
      120
    )
    .drawImage({
      name: "balloon",
      groups: ["tips"],
      layer: true,
      source: "./duck/balloon.svg",
      x: 435,
      y: 90
    })
    .drawText({
      name: "tip",
      groups: ["tips"],
      layer: true,
      fillStyle: "#000",
      fontStyle: "bold",
      fontSize: "16pt",
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      text:
        "Quack! Use camelCase or snake_case! PascalCase is the tool of Satan!",
      x: 440,
      y: 90,
      maxWidth: 290
    });
}
