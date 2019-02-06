/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable func-names */

let lastEditButtonClicked; // global for tracking note clicks;

// Grab the articles as a json
$.getJSON('/api/articles', (articleArray) => {
  articleArray.forEach((article) => {
    console.log(article);
    const notateButtonColor = article.note ? 'btn-primary' : 'btn-secondary';

    $('#articles').append(`
      <div class="row m-2">
        <div class="col-11">
          <a href="${article.link}" alt="View on NPR.org" target="_blank">
            <i class="fas fa-external-link-alt"></i>
          </a>
          <h5 class='news-article'>
            <span class='news-article hover-shadow p-1 m-1 w-75 rounded' data-id='${article._id}'>
              ${article.title}
            </span>
          </h5>
          
        </div>
        <div class="col-1">
          <button type="button" class="btn ${notateButtonColor} news-note-button" data-toggle="modal" data-target="#article-modal" data-id='${article._id}'>
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>`);
  });
});

// Whenever someone clicks a p tag
$(document).on('click', 'button.news-note-button', function () {
  // Save the id from the p tag
  const thisId = $(this).attr('data-id');
  console.log(thisId);
  console.log('Get request is:', `/api/articles/${thisId}`);
  lastEditButtonClicked = $(this);


  // $.ajax({
  // 	method: 'GET',
  // 	url: data.
  // })
  // Now make an ajax call for the Article
  $.ajax({
    method: 'GET',
    url: `/api/articles/${thisId}`,
  })
    // With that done, add the note information to the page
    .then((data) => {
      // Empty the notes from the note section
      // $('#notes').empty();
      // The title of the article

      $('#modal-article-title').text(data.title);
      // An input to enter a new title
      // $('#modal-article-body').empty();
      // $('#modal-article-body').append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $('#bodyinput').empty();
      // $('#modal-article-body').append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $('#savenote').attr('data-id', data._id);
      // $('#modal-article-body').append(`<button data-id='${data._id}' id='savenote'>Save Note</button>`);


      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        // $('#titleinput').val(data.note.title);
        // Place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on('click', '#savenote', function () {
  // Grab the id associated with the article from the submit button
  const thisId = $(this).attr('data-id');

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: `/api/articles/${thisId}`,
    data: {
      // Value taken from title input
      title: $('#titleinput').val(),
      // Value taken from note textarea
      body: $('#bodyinput').val(),
    },
  })
    // With that done
    .then((data) => {
      lastEditButtonClicked.addClass('btn-primary');
      lastEditButtonClicked.removeClass('btn-secondary');
      // Log the response
      console.log(data);
      // Empty the notes section
      // $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val('');
  $('#bodyinput').val('');
});
