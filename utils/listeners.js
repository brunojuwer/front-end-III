const leftPageArrow = document.querySelector('.arrow-page-button');

filter.addEventListener('focus', () => {
  filterContainer.classList.add('focused');
}) 

filter.addEventListener('blur', () => {
  filterContainer.classList.remove('focused');
})

leftPageArrow.addEventListener('mouseover', () => {
  document.querySelector('.ph-arrow-fat-left').classList.add('move-left-arrow');
});

leftPageArrow.addEventListener('mouseout', () => {
  document.querySelector('.ph-arrow-fat-left').classList.remove('move-left-arrow');
});

function setFilterListener(getCharactersByName, changeSearchIcon) {
  filter.addEventListener('keyup', e => {
    getCharactersByName(e)
    
    if(e.target.value) {
      changeSearchIcon(e.target.nextElementSibling, "./assets/close.svg")
      e.target.nextElementSibling.style.cursor = "pointer"
      e.target.nextElementSibling.addEventListener('click', () => {
        e.target.value = "";
        location.reload();
      })
      return;
    } 
    changeSearchIcon(e.target.nextElementSibling, "./assets/search.svg")
  }); 
}