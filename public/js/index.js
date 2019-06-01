// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

$(document).ready(function() {
  var obj = document.createElement("audio");
  obj.src = "./42941__agfx__squeeky-ball-toy-10-l.wav";
  obj.volume = 0.1;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;

  $("#squeeze").click(function() {
    obj.play();
    // obj.pause();
  });
});

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// This demo will work on iOS, Android, and desktop browsers
// Draw the outline of an unclosed path (ie a duck part), click to apply a random color from the array
var headColor = "yellow";
var bodyColor = "yellow";
var billColor = "orange";
var hatOn = false;

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
      bodyColor = $("#color").val();
    }
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
      headColor = $("#color").val();
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
      billColor = $("#color").val();
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

$("#head_test").on("click", function() {
  alert("Quack! My head is " + headColor);
});

$("#body_test").on("click", function() {
  alert("Quack! My body is " + bodyColor);
});

$("#bill_test").on("click", function() {
  alert("Quack! My bill is " + billColor);
});

$("#download").on("click", function() {
  $("canvas").getCanvasImage();
  console.log("Download");
});

$("#addhat").on("click", function() {
  if (hatOn) {
    $("canvas")
      .removeLayer("hat")
      .drawLayers();
    hatOn = false;
  } else {
    $("#canvas1").drawImage({
      name: "hat",
      groups: ["duck"],
      layer: true,
      source: "./hats/l3helmet.svg",
      x: 160,
      y: 140
    });
    hatOn = true;
  }
});

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
