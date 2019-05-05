/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
              Authorization: 'Client-ID ad4d25d1ca6fec553fd8405a716db52c3825ce6c68300e29e67649d584f55f89'
            }
        }).done(addImage)
        .fail(function(err) {
          requestError(err, 'image');
        });
        $.ajax({
          url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=06cbd8e8-2781-484a-bbce-8a20fc9fe667`)
        }).done(addImage)
        .fail(function(err) {
          requestError(err, 'image');
        });
    function addArticles(data) {
      let htmlContent ='';

      if (data.response && data.response.docs && data.response.docs.length > 1) {
        const articles = data.response.docs;
        htmlContent = '<ul>' + articles.map(article => `<li class="article">
        <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
        <p>${article.snippet}</p>
        </li>`
      ).join('') + '</ul>';
    } else {
      htmlContent = '<div class="error-no-articles">No articles available</div>';
    }
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }
  function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
  }
})();
