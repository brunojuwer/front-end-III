let pageContext = {
  lastUrl: "",
  currentPage: 1,
  totalPages: 0,
  previousPage: null,
  nextPage: null,
  pagesToShow: [],
  setCurrentPage () {
    if(!this.previousPage) {
      this.currentPage = 1;
      return;
    }
    if(!this.nextPage) {
      this.currentPage = this.totalPages;
      return;
    } 

    const numberOfNextPage = Number(extractPageNumber(this.previousPage));
    this.currentPage = numberOfNextPage + 1;
  }
}

function extractPageNumber(url) {
    const pageRegex = /page=(\d+)/;
    const match = url.match(pageRegex);
    if(match) {
      return match[1];
    }
}

function changePageContextData(total, previous, next) {
  pageContext.totalPages = total;
  pageContext.previousPage = previous;
  pageContext.nextPage = next;
  pageContext.setCurrentPage();

  if(pageContext.nextPage) {
    pageContext.lastUrl = pageContext.nextPage 
  } else {
    pageContext.lastUrl = pageContext.previousPage
  }

  toogleStatusPageButton()

  document.querySelector(".current-page").innerText = pageContext.currentPage;
}

function toogleStatusPageButton() {
  if(!pageContext.previousPage) {
    previousPageButton.classList.add('disabled');
  } else {
    previousPageButton.classList.remove('disabled');
  }
  if(!pageContext.nextPage) {
    nextPageButton.classList.add('disabled');
  } else {
    nextPageButton.classList.remove('disabled');
  }
}