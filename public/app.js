/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable func-names */

let lastEditButtonClicked; // global for tracking note clicks;

// Query the articles db and parse the JSON into html
$.getJSON('/api/articles', (articleArray) => {
  if (articleArray.length === 0) {
    window.location.replace('/api/scrape');
    return;
  }
  $('#article-list-header').text(`${articleArray.length} stories found:`);
  let articlesHTML = '';
  articleArray.forEach((article) => {
    const notateButtonColor = article.note ? 'btn-primary' : 'btn-secondary';
    articlesHTML += `
      <div class="row my-4">
        <div class="col-11">
          <a href="${article.link}" alt="View on NPR.org" target="_blank" class="link-without-underline">
            <i class="fas fa-external-link-alt"></i>
          </a>
          <h5 class='news-article'>
            <span class='news-article hover-shadow p-1 m-1 w-75 rounded' data-id='${article._id}'>
              ${article.title}
            </span>
          </h5>
          <p>
            ${article.summary}
          </p>
        </div>
        <div class="col-1">
          <button type="button" class="btn ${notateButtonColor} news-note-button" data-toggle="modal" data-target="#article-modal" data-id='${article._id}'>
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>`;
  });
  $('#articles').append(articlesHTML); // appending all at once to avoid reflow.
});

// When user opens edit modal:
$(document).on('click', 'button.news-note-button', function () {
  const thisId = $(this).attr('data-id');
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
      $('#deletenote').addClass('invisible');
      // If there's a note associated with the article, add it to modal:
      if (data.note) {
        $('#bodyinput').val(data.note.body);
        $('#deletenote').attr('data-id', data.note._id);
        $('#deletenote').attr('data-article-id', data._id);
        $('#deletenote').removeClass('invisible');
      }
    });
});

// When user saves a note from modal:
$(document).on('click', '#savenote', function () {
  const thisId = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: `/api/addnote/${thisId}`,
    data: {
      body: $('#bodyinput').val(),
    },
  }).then(() => {
    // Don't change color of button until db is updated
    lastEditButtonClicked.addClass('btn-primary');
    lastEditButtonClicked.removeClass('btn-secondary');
  });
  // Clear out modal fields.
  $('#modal-article-title').text(''); // clear out title
  $('#bodyinput').val(''); // clear out previous value
});

// When a user deletes a note:
$(document).on('click', '#deletenote', function () {
  const thisId = $(this).attr('data-id');
  lastEditButtonClicked.removeClass('btn-primary');
  lastEditButtonClicked.addClass('btn-secondary');
  $('#deletenote').addClass('invisible');
  $('#modal-article-title').text(''); // clear out title
  $('#bodyinput').val(''); // clear out previous value
  $.ajax({
    method: 'POST',
    url: `/api/removenote/${thisId}`,
    data: {
      // sending in the article linked from the note
      // this way the entry for note can be removed
      articleId: $(this).attr('data-article-id'),
    },
  });
});
