const filterContainer = document.querySelector(".filter-container");
const charactersCountElement = document.querySelector(
  "[data-count-characters]"
);
const locationsCountElement = document.querySelector("[data-count-locations]");
const episodesCountElement = document.querySelector("[data-count-episodes]");

const charactersURL = "https://rickandmortyapi.com/api/character/?page=1";
const character = "https://rickandmortyapi.com/api/character/";
const episodesURL = "https://rickandmortyapi.com/api/episode";
const locationsURL = "https://rickandmortyapi.com/api/location";

async function apiDataLoader(page = 1) {
  const characters = await axios.get(`${charactersURL}`);
  const episodes = await axios.get(`${episodesURL}/?page=${page}`);
  const locations = await axios.get(`${locationsURL}/?page=${page}`);

  return {
    characters: characters.data,
    episodes: episodes.data,
    locations: locations.data,
  };
}

function mountCard(id, image, name, status, species, location, episode) {
  return `
  <div class="col-xl-4 col-md-6">
    <article 
      class="m-auto character-card" 
      data-bs-toggle="modal" 
      data-bs-target="#character-details-modal"
      onclick="getSingleCharacter(${id})"
    >
        <img class="character-image" src="${image}" alt="Character image">
        <div class="character-info">
            <div>
                <h2 class="user-select-none">${name}</h2>
                <h3 class="user-select-none"><span class="status ${status}"></span>${translateStatus(
    status
  )} - ${translateSpeciesName(species)}</h3>
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
function mountCardModal(id, image, name, gender, origin, status, species, location, episode) {
  return `
  <div class="container-fluid overflow-hidden">
    <article 
      class="m-auto row justify-content-center" 
      data-bs-toggle="modal" 
      data-bs-target="#character-details-modal"
      onclick="getSingleCharacter(${id})"
    >
        <img 
          style="max-width: 300px; max-height: 300px" 
          class="character-image p-0 rounded-circle img-fluid rotate-and-pulse-animation" 
          src="${image}"
          alt="Character image"
        >
        <div class="row justify-content-center text-white show-text-animation mt-3">
            <div class="text-center">
                <h2 class="user-select-none fs-4 fw-bold my-4 placeholder-wave">${name}</h2>
                
                <h3 class="user-select-none fs-6 placeholder-wave">
                  <span class="status ${status} placeholder-wave"></span>
                  ${translateStatus(status)} - <strong> ${translateSpeciesName(species)}</strong>
                </h3>
                <h3 class="user-select-none my-3 fs-6 placeholder-wave">Genero - <strong>${gender}</strong></h3>
                <h3 class="user-select-none my-3 fs-6 placeholder-wave">Origem - <strong>${origin['name']}</strong></h3>
            </div>
            <div class="text-center placeholder-wave">
                <p class="user-select-none mb-0">Última localização conhecida - <strong class="user-select-none text-light">${location.name}</strong></p>
            </div>
            <div class="text-center my-3 placeholder-wave">
                <p class="user-select-none mb-0">Visto a última vez em - <strong class="user-select-none text-light">${episode}</strong></p>
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
  return await axios.get(episodes[episodes.length - 1]);
}

async function getSingleCharacter(id) {
  const response = await axios.get(character + `/${id}`);
  const { image, name, status, species, location, gender, origin, episode} = response.data;
  
  const episodeName = await fetchLastSeenEpisode(episode);
  modalContent.innerHTML = mountCardModal(
    id,
    image,
    name,
    gender,
    origin,
    status,
    species,
    location,
    episodeName.data.name
  );
}


function divideArray(originalArray) {
  const result = {
      1: [],
      2: [],
      3: [],
      4: [],
  };

  let currentIndex = 1;
  let currentSubarray = result[currentIndex];

  originalArray.forEach(item => {
      currentSubarray.push(item);

      if (currentSubarray.length === 6) {
          currentIndex++;
          currentSubarray = result[currentIndex] = [];
      }
  });

  return result;
}

var dividedObject = {}

async function populateContainer(number = 1) {
  container.innerHTML = "";
  dividedObject[number].forEach(
    async ({ id, name, status, location, image, episode, species }, index) => {
      if(index < 6) {
        const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
        container.innerHTML += mountCard(
          id,
          image,
          name,
          status,
          species,
          location,
          episodeName
        );
      }
    }
  );
  window.scrollTo(0, 0);
}

async function fetchCharactersByPage(url) {
  try {
    container.innerHTML = getLoading();

    const response = await axios.get(url);
    const characters = response.data.results;

    changePageContextData(
      response.data.info.pages,
      response.data.info.prev,
      response.data.info.next,
    );

    dividedObject = divideArray(characters);
    populateContainer();
    
    
  } catch (error) {
    renderError("Não foi possível encontrar os personagens!");
  }
}
fetchCharactersByPage(charactersURL);

function getCharactersByName(e) {
  const name = e.target.value;
  fetchCharactersByPage(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );
}

function changeSearchIcon(element, path) {
  element.setAttribute("src", path);
}

setFilterListener(getCharactersByName, changeSearchIcon);

async function getDataCount(data) {
  const res = await apiDataLoader();
  return res[data].info.count;
}

async function printApiEnpointsInfoAmount() {
  charactersCountElement.textContent = await getDataCount("characters");
  locationsCountElement.textContent = await getDataCount("locations");
  episodesCountElement.textContent = await getDataCount("episodes");
}
printApiEnpointsInfoAmount();
