$("#canvas2")
  .drawEllipse({
    layer: true,
    groups: ["duck"],
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
    height: 150
  })
  .drawEllipse({
    layer: true,
    groups: ["duck"],
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
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "orange",
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

$("#squeeze").on("click", function() {
  $("#canvas2")
    .animateLayerGroup("duck", {
      scaleY: 0.8
    })
    .animateLayer("bill", {
      scaleY: 0.8,
      y: +30
    })
    .animateLayerGroup("duck", {
      scaleY: 1
    })
    .animateLayer("bill", {
      scaleY: 1,
      y: 0
    })
    .drawImage({
      name: "balloon",
      layer: true,
      source: "./balloon.svg",
      x: 435,
      y: 90
    })
    .drawText({
      name: "tips",
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
});
