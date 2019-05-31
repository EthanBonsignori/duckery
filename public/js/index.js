// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

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

$("canvas")
  .drawEllipse({
    layer: true,
    name: "body",
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "yellow",
    x: 160,
    y: 160,
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
    x: 110,
    y: 80,
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
    x: 70,
    y: 70,
    width: 15,
    height: 15
  })
  .drawEllipse({
    layer: true,
    name: "righteye",
    strokeStyle: "black",
    strokeWidth: 5,
    fillStyle: "white",
    x: 120,
    y: 70,
    width: 15,
    height: 15
  })
  .drawPath({
    layer: true,
    name: "bill",
    strokeStyle: "#000",
    strokeWidth: 3,
    fillStyle: "orange",
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
      x1: 65,
      y1: 90, // Start point
      cx1: 105,
      cy1: 30, // Control point
      cx2: 90,
      cy2: 90, // Control point
      x2: 125,
      y2: 90 // Start/end point
    },
    p2: {
      type: "bezier",
      x1: 65,
      y1: 90,
      cx1: 0,
      cy1: 120,
      cx2: 45,
      cy2: 150,
      x2: 125,
      y2: 90
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
