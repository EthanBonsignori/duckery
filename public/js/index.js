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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var $head = String($('canvas').getLayer('head').fillStyle);
  var $bill = String($('canvas').getLayer('bill').fillStyle);
  var $body = String($('canvas').getLayer('body').fillStyle);
  if (hatOn) {
    var $hat = $('canvas').getLayer('hat').source;
  }
  if (gradientOn) {
    var $gradient = JSON.stringify($('canvas').getLayer('head').fillStyle);
  }
  if (gradientOn) {
    var $pattern = JSON.stringify($('canvas').getLayer('body').fillStyle);
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
