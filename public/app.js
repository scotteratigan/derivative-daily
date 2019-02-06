/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable func-names */

let lastEditButtonClicked; // global for tracking note clicks;

// Grab the articles as a json
$.getJSON('/api/articles', (articleArray) => {
  if (articleArray.length === 0) {
    window.location.replace('/api/scrape');
    return;
  }
  $('#article-list-header').text(`${articleArray.length} stories found:`);
  articleArray.forEach((article) => {
    console.log(article);
    const notateButtonColor = article.note ? 'btn-primary' : 'btn-secondary';

    $('#articles').append(`
      <div class="row my-4">
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

// When user opens edit modal:
$(document).on('click', 'button.news-note-button', function () {
  const thisId = $(this).attr('data-id');
  console.log(thisId);
  console.log('Get request is:', `/api/articles/${thisId}`);
  // Storing this so the icon color can be changed later when someone clicks save:
  lastEditButtonClicked = $(this);
  // Load the article info:
  $.ajax({
    method: 'GET',
    url: `/api/articles/${thisId}`,
  })
    // Then add the data to the modal:
    .then((data) => {
      $('#modal-article-title').text(data.title); // update title
      $('#bodyinput').val(''); // clear out previous value
      $('#savenote').attr('data-id', data._id);
      // If there's a note associated with the article, add it to modal:
      if (data.note) {
        $('#bodyinput').val(data.note.body);
      }
    });
});

// When user saves a note from modal:
$(document).on('click', '#savenote', function () {
  const thisId = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: `/api/articles/${thisId}`,
    data: {
      body: $('#bodyinput').val(),
    },
  })
    // With that done
    .then((data) => {
      lastEditButtonClicked.addClass('btn-primary');
      lastEditButtonClicked.removeClass('btn-secondary');
      $('#modal-article-title').text(''); // clear out title
      $('#bodyinput').val(''); // clear out previous value
      // Log the response
      console.log(data);
      // Empty the notes section
      // $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#bodyinput').val('');
});
