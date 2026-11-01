window.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("search");
  const result = document.getElementById("result");

  function search() {
    // Trim and URL-encode the input; the server also sanitizes it
    const query = encodeURIComponent(searchInput.value.trim());

    fetch("superheroes.php?query=" + query)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Request failed: " + response.status);
        }
        return response.text();
      })
      .then(function (html) {
        result.innerHTML = html;
      })
      .catch(function (error) {
        result.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
        console.error(error);
      });
  }

  searchBtn.addEventListener("click", search);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") search();
  });
});