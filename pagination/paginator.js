function getPreviousPage(){
  if(pageContext.previousPage) {
    fetchCharactersByPage(pageContext.previousPage);
    window.scrollTo(0, 0);
    resetSections()
  }
}

function getNextPage(){
  if(pageContext.nextPage) {
    fetchCharactersByPage(pageContext.nextPage);
    window.scrollTo(0, 0);
    resetSections()
  }
}


function resetSections() {
  section1.checked = true;
}