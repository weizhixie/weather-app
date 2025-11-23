export function createSearchBox() {
  const searchContainer = document.createElement("search");
  const form = document.createElement("form");
  form.classList.add("search-form");

  const input = document.createElement("input");
  input.type = "search";
  input.id = "search-location";
  input.name = "search-location";
  input.placeholder = "Search Location";

  const button = document.createElement("button");
  button.classList.add("search-btn");
  button.textContent = "Search";

  form.append(input, button);
  searchContainer.appendChild(form);

  return searchContainer;
}
