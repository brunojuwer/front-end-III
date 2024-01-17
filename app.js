const filterContainer = document.querySelector(".filter-container");
const charactersCountElement = document.querySelector("[data-count-characters]");
const locationsCountElement = document.querySelector("[data-count-locations]");
const episodesCountElement = document.querySelector("[data-count-episodes]");

const charactersURL = "https://rickandmortyapi.com/api/character/?page=1";
const episodesURL = "https://rickandmortyapi.com/api/episode";
const locationsURL = "https://rickandmortyapi.com/api/location";


async function apiDataLoader(page = 1) {
  const characters = await axios.get(`${charactersURL}`)
  const episodes = await axios.get(`${episodesURL}/?page=${page}`)
  const locations = await axios.get(`${locationsURL}/?page=${page}`)

  return {
    characters: characters.data,
    episodes: episodes.data,
    locations: locations.data
  }
}

function mountCard(image, name, status, species, location, episode) {
  return `
  <div class="col-xl-4 col-md-6">
    <article class="m-auto character-card" data-bs-toggle="modal" data-bs-target="#character-details-modal">
        <img class="character-image" src="${image}" alt="Character image">
        <div class="character-info">
            <div>
                <h2 class="user-select-none">${name}</h2>
                <h3 class="user-select-none"><span class="status ${status}"></span>${translateStatus(status)} - ${translateSpeciesName(species)}</h3>
            </div>
            <div class="last-location">
                <p class="user-select-none">Última localização conhecida:</p>
                <h3 class="user-select-none">${location.name}</h3>
            </div>
            <div class="last-seen">
                <p class="user-select-none">Visto a última vez em:</p>
                <h3 class="user-select-none">${episode}</h3>
            </div>
          </div>
    </article>
  </div>`;
}

function getLoading() {
  return `<div class="d-flex align-items-center justify-content-center gap-2">
  <span class="spinner-grow spinner-grow-sm bg-primary" aria-hidden="true"></span>
  <span class="text-white" role="status">Buscando...</span>
  </div>`;
}

async function fetchLastSeenEpisode(episodes) {
  return (await axios.get(episodes[episodes.length - 1]));
}

async function fetchCharactersByPage(url){
  try {
    container.innerHTML = getLoading();

    const response = await axios.get(url);
    const characters = response.data.results;

    // changePageContextData(
    //   response.data.info.pages,
    //   response.data.info.prev,
    //   response.data.info.next,
    // );
    // changePagesToShow();
    // addNumberPages();
    
    container.innerHTML = "";
    characters.forEach( async ({name, status, location, image, episode, species}, index) => {
      if(index >= 6) {
        return;
      }
        const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
        container.innerHTML += mountCard(image, name, status, species, location, episodeName);
    });
  } catch(error) {
    renderError("Não foi possível encontrar os personagens!");
    document.getElementById("pages-container").style.display = "none";
  }
}
fetchCharactersByPage(charactersURL);

function getCharactersByName(e) {
  const name = e.target.value;
  fetchCharactersByPage(`https://rickandmortyapi.com/api/character/?name=${name}`);
}

function changeSearchIcon(element, path) {
  element.setAttribute("src", path);
}

setFilterListener(getCharactersByName, changeSearchIcon);

async function getDataCount(data) {
  const res = await apiDataLoader()
    return res[data].info.count;
}

async function printApiEnpointsInfoAmount() {
  charactersCountElement.textContent = await getDataCount('characters');
  locationsCountElement.textContent = await getDataCount('locations');
  episodesCountElement.textContent = await getDataCount('episodes');
}
printApiEnpointsInfoAmount();
