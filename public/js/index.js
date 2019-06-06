// Get references to page elements

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/ducks',
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: 'api/ducks',
      type: 'GET'
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: 'api/ducks/' + id,
      type: 'DELETE'
    });
  }
};

/* // refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $('<a>')
        .text(example.text)
        .attr('href', '/ducks/' + example.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': example.id
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });
  });
}; */

//Check if the fillStyle is a function (so the parameters for the function can be passed)
//or a solid color (so the hex value can be passed)
function funcStyleCheck(toCheck, checkLayer) {
  if (typeof toCheck === 'function') {
    if (toCheck === grad) {
      return 'grad';
    }

    if (toCheck === pat) {
      return 'pat';
    }
  } else {
    return $('canvas').getLayer(checkLayer).fillStyle;
  }
}

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var $head = funcStyleCheck($('canvas').getLayer('head').fillStyle, 'head');
  var $bill = funcStyleCheck($('canvas').getLayer('bill').fillStyle, 'bill');
  var $body = funcStyleCheck($('canvas').getLayer('body').fillStyle, 'body');
  if (hatOn) {
    var $hat = $('canvas').getLayer('hat').source;
  }
  if (gradientOn) {
    var $gradient = gradsrc.c1 + ',' + gradsrc.c2;
  }
  if (gradientOn) {
    var $pattern = patsrc;
  }

  var duck = {
    head: $head,
    bill: $bill,
    body: $body,
    hat: $hat,
    gradient: $gradient,
    pattern: $pattern
  };

  API.saveExample(duck).then(function() {
    //refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$('#submit').on('click', handleFormSubmit);
