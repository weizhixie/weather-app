const loaderDiv = document.querySelector("#loader");

export function showLoader() {
  loaderDiv.classList.add("show");
}

export function hideLoader() {
  loaderDiv.classList.remove("show");
}
