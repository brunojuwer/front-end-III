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

function getSpecificPage(e) {
  const page = e;
  if(pageContext.lastUrl.includes("page")) {
    const lastPage = extractPageNumber(pageContext.lastUrl);
    const urlToGet = pageContext.lastUrl.replace(lastPage, page);
    fetchCharactersByPage(urlToGet);
    window.scrollTo(0, 0);
    return;
  }
}

function resetSections() {
  section1.checked = true;
}