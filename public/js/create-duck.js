// This demo will work on iOS, Android, and desktop browsers
// Draw the outline of an unclosed path (ie a duck part), click to apply a random color from the array

$("#head_test").on("click", function() {
  alert("Quack! My head is " + duckAttrs.headColor);
});

$("#body_test").on("click", function() {
  alert("Quack! My body is " + duckAttrs.bodyColor);
});

$("#bill_test").on("click", function() {
  alert("Quack! My bill is " + duckAttrs.billColor);
});

$("#download").on("click", function() {
  $("canvas").getCanvasImage();
  console.log("Download");
});

var duckAttrs = {
  headColor: "yellow",
  bodyColor: "yellow",
  billColor: "orange",
  hatOn: false
};

$("#addhat").on("click", function() {
  if (duckAttrs.hatOn) {
    $("#canvas1")
      .removeLayer("hat")
      .drawLayers();
    duckAttrs.hatOn = false;
  } else {
    $("#canvas1").drawImage({
      name: "hat",
      groups: ["duck"],
      layer: true,
      shadowColor: "rgb(0, 0, 0, 0.3)",
      shadowBlur: 15,
      shadowX: 0,
      shadowY: 5,
      source: "./duck/accessories/hattest.svg",
      x: 200,
      y: 200
    });
    duckAttrs.hatOn = true;
  }
});

$("#canvas1")
  .drawEllipse({
    layer: true,
    name: "body",
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "yellow",
    shadowColor: "rgb(0, 0, 0, 0.5)",
    shadowBlur: 15,
    shadowX: 4,
    shadowY: 10,
    x: 210,
    y: 230,
    width: 200,
    height: 150,
    click: function(layer) {
      $(this).animateLayer(
        layer,
        {
          fillStyle: $("#color").val()
        },
        0
      );
      duckAttrs.bodyColor = $("#color").val();
    }
  })
  .drawBezier({
    layer: true,
    name: "wing",
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
    name: "head",
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "yellow",
    shadowColor: "rgb(0, 0, 0, 0.3)",
    shadowBlur: 15,
    shadowX: 0,
    shadowY: 5,
    x: 160,
    y: 150,
    width: 120,
    height: 120,
    click: function(layer) {
      $(this).animateLayer(
        layer,
        {
          fillStyle: $("#color").val()
        },
        0
      );
      duckAttrs.headColor = $("#color").val();
    }
  })
  .drawEllipse({
    layer: true,
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
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "orange",
    shadowColor: "rgb(0, 0, 0, 0.2)",
    shadowBlur: 15,
    shadowX: 0,
    shadowY: 3,
    click: function(layer) {
      $(this).animateLayer(
        layer,
        {
          fillStyle: $("#color").val()
        },
        0
      );
      duckAttrs.billColor = $("#color").val();
    },
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
