$("#head_test").on("click", function() {
  alert("Quack! My head is " + duckAttrs.headStyle);
});

$("#body_test").on("click", function() {
  alert("Quack! My body is " + duckAttrs.bodyStyle);
});

$("#bill_test").on("click", function() {
  alert("Quack! My bill is " + duckAttrs.billStyle);
});

$("#download").on("click", function() {
  $("canvas").getCanvasImage();
  console.log("Download");
});

var duckAttrs = {
  headStyle: "yellow",
  bodyStyle: "yellow",
  billStyle: "orange",
  hatOn: false
};

$("#addhat").on("click", function() {
  drawHat();
});

function drawBody() {
  $("canvas").removeLayerGroup("body");

  $("canvas")
    .drawEllipse({
      layer: true,
      name: "body",
      groups: ["body", "duck"],
      index: 0,
      strokeStyle: "#000",
      strokeWidth: 3,
      fillStyle: duckAttrs.bodyStyle,
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
      groups: ["body", "beziers"],
      index: 1,
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
    });
}

function drawHead() {
  $("canvas").removeLayerGroup("head");

  $("canvas")
    .drawEllipse({
      layer: true,
      name: "head",
      groups: ["head", "duck"],
      index: 3,
      strokeStyle: "#000",
      strokeWidth: 3,
      fillStyle: duckAttrs.headStyle,
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
      name: "lefteye",
      groups: ["head", "duck"],
      index: 9,
      strokeStyle: "black",
      strokeWidth: 5,
      fillStyle: "white",
      x: 110,
      y: 140,
      width: 14,
      height: 18
    })
    .drawEllipse({
      layer: true,
      name: "righteye",
      groups: ["head", "duck"],
      index: 9,
      strokeStyle: "black",
      strokeWidth: 5,
      fillStyle: "white",
      x: 170,
      y: 140,
      width: 14,
      height: 18
    });
}

function drawBill() {
  $("canvas").removeLayer("bill");

  $("canvas").drawPath({
    layer: true,
    name: "bill",
    groups: ["beziers"],
    index: 4,
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: duckAttrs.billStyle,
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
}

function drawDuck() {
  $("canvas").clearCanvas();
  drawBody();
  drawHead();
  drawBill();
}

function drawHat() {
  if (duckAttrs.hatOn) {
    $("canvas").removeLayer("hat");
    duckAttrs.hatOn = false;
  } else {
    duckAttrs.hatOn = true;
    $("canvas").removeLayer("hat");
    $("canvas").drawImage({
      name: "hat",
      groups: ["duck"],
      layer: true,
      index: 10,
      shadowColor: "rgb(0, 0, 0, 0.3)",
      shadowBlur: 15,
      shadowX: 0,
      shadowY: 5,
      source: "./duck/accessories/hattest.svg",
      x: 200,
      y: 200
    });
  }
}

drawDuck();

$("#head_color").change(function() {
  duckAttrs.headStyle = $("#head_color").val();
  drawHead();
  drawBill();
});
$("#bill_color").change(function() {
  duckAttrs.billStyle = $("#bill_color").val();
  drawBill();
});
$("#body_color").change(function() {
  duckAttrs.bodyStyle = $("#body_color").val();
  drawBody();
  drawHead();
  drawBill();
});
