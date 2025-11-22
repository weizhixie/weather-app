export function createSearchBox() {
  const searchContainer = document.createElement("search");
  const form = document.createElement("form");
  form.classList.add("search-form");

  const label = document.createElement("label");
  label.htmlFor = "search-location";
  label.textContent =
    "Welcome to Sky Buddy! Enter a location to view the weather information";

  const input = document.createElement("input");
  input.type = "search";
  input.id = "search-location";
  input.name = "search-location";
  input.placeholder = "Search Location";

  const button = document.createElement("button");
  button.textContent = "Search";

  form.append(label, input, button);
  searchContainer.appendChild(form);

  return searchContainer;
}
