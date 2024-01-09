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
  <article class="card">
  <img class="character-image" src="${image}" alt="Character image">
  <div class="character-info">
      <div>
          <h2>${name}</h2>
          <h3><span class="status ${status}"></span>${translateStatus(status)} - ${translateSpeciesName(species)}</h3>
      </div>
      <div>
          <p>Última localização conhecida:</p>
          <h3>${location.name}</h3>
      </div>
      <div>
          <p>Visto a última vez em:</p>
          <h3>${episode}</h3>
      </div>
  </div>
</article>
  `;
}

async function fetchLastSeenEpisode(episodes) {
  return (await axios.get(episodes[episodes.length - 1]));
}

async function fetchCharactersByPage(url){
  try {
    container.innerHTML = '<div class="loader"></div>';
    const response = await axios.get(url);
    const characters = response.data.results;

    changePageContextData(
      response.data.info.pages,
      response.data.info.prev,
      response.data.info.next,
    );
    changePagesToShow();
    addNumberPages();
    
    container.innerHTML = "";
    let = counter = 1
    characters.forEach( async ({name, status, location, image, episode, species}) => {
      const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
      if(counter % 2 === 0 && counter !== characters.length) {
        container.innerHTML += mountCard(image, name, status, species, location, episodeName);
        container.innerHTML += `<div class="separator"></div>`;
      } else {
        container.innerHTML += mountCard(image, name, status, species, location, episodeName);
      }
      counter++;
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
