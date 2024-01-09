function createErrorContainer(message) {
  container.innerHTML = `<div id="errorContainer">
  <span>${message}</span> <i class="ph ph-smiley-sad"></i>
</div>`;
}

function renderError(message) {
  createErrorContainer(message);
}