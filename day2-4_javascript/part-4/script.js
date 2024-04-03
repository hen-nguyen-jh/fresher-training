const createMapWrapper = () => {
  let map;

  return {
    getMap: () => map,
    setMap: (newMap) => {
      if (!newMap) {
        console.log(`Can't set map to null value`);
        return;
      }
      if (!map) {
        map = newMap;
      }
    },
  };
};

const wrapper = createMapWrapper();

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGVuLW5ndXllbi1qaCIsImEiOiJjbHVnb2RnZHMyMGRvMmtueTdnZGhpYzg3In0.yyk3sh5xRg4IvYL6LZ92Ug';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  const map = setupMapbox({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });
  wrapper.setMap(map);
}

function errorLocation(error) {
  const map = setupMapbox({
    latitude: 0,
    longitude: 0,
  });
  wrapper.setMap(map);
}

let isInfoTabOpen = false;
let searchResult = null;

function setupMapbox(coords) {
  const { latitude, longitude } = coords;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  // Search box
  // const geocoder = new MapboxGeocoder({
  //   accessToken: mapboxgl.accessToken,
  //   mapboxgl: mapboxgl,
  // });
  // geocoder.on('result', handleSearchBoxResult);
  // map.addControl(geocoder, 'top-left');

  const geol = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  });
  map.addControl(geol);

  // Marker
  addMarkers(map);

  // add marker on click
  map.on('click', (event) => {
    // test feature
    const markerInfo = {
      title: 'Test title',
      // make a long descriptoin
      description: 'This is my description',
    };

    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    const coords = event.lngLat;

    const marker = new mapboxgl.Marker(el).setLngLat(coords).setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<h3>${markerInfo.title}</h3><p>${markerInfo.description}</p>`)
    );

    const markerDiv = marker.getElement();
    markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
    markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

    marker.addTo(map);
  });

  return map;
}

function addMarkers(map) {
  map.on('load', () => {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [106.68917, 10.74786],
          },
          properties: {
            title: 'Journey Horizon Company',
            description:
              'Probably the best sharetribe flex developer in the world! Yep it is a big claim but we have the experience and team to prove it. There is not much we have not done over the years when it comes to implementing online marketplaces on Sharetribe Flex.',
          },
        },
      ],
    };

    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      console.log('feature: ', feature);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        );

      const markerDiv = marker.getElement();
      markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

      marker.addTo(map);
    }
  });
}

function handleSearchBoxResult(result) {
  if (!result) {
    console.log('no result');
    return;
  }

  console.log('result: ', result);
  isInfoTabOpen = true;
  searchResult = result;

  if (isInfoTabOpen) {
    document.querySelector('.info-tab__header__name').textContent =
      searchResult.text ?? 'no name';
    document.querySelector('.info-tab__body__coords').textContent =
      searchResult.geometry.coordinates.join(', ') ?? 'no coords';
    document.querySelector('.info-tab__body__text').textContent =
      searchResult.place_name ?? 'no place name';
    document.querySelector('.info-tab__body__place-type').textContent =
      searchResult.place_type.join(', ') ?? 'no place type';
    document.querySelector('.info-tab__body__address').textContent =
      searchResult.properties.address ?? 'no address';
    document.querySelector('.info-tab__body__category').textContent =
      searchResult.properties.category ?? 'no category';
    document
      .querySelector('.info-tab__header-label__close-button')
      .addEventListener('click', () => {
        isInfoTabOpen = false;

        const infoTab = document.querySelector('.info-tab');
        infoTab.classList.remove('info-tab--open');
        setTimeout(() => {
          infoTab.classList.add('none');
        }, 300);
      });
  }

  const tabInfo = document.querySelector('.info-tab');
  tabInfo.classList.remove('none');
  tabInfo.classList.add('info-tab--open');
}

// API request
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function handleSearchAPIRequest(event) {
  const searchText = event.target.value;
  const endpoint = 'mapbox.places';
  const access_token = mapboxgl.accessToken;
  const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=${access_token}`;
  try {
    const response = await fetch(url, {
      method: 'get',
    });
    if (response.ok) {
      const data = await response.json();
      handleRenderResultFeatures(data.features);
      const searchBoxUlEl = document.querySelector('#search-box > ul');
      searchBoxUlEl.classList.remove('none');
    }
  } catch (error) {
    console.log('fail to fetch geocoding api', error);
  }
}
function handleRenderResultFeatures(features) {
  const ulEl = document.querySelector('#search-box > ul');
  const handleClick = (feature) => {
    handleSearchBoxResult(feature);
    zoomIn(feature.bbox, feature.center);
    ulEl.classList.add('none');
  };
  const items = features.map((feature) =>
    createSearchResultItem({ feature, handleClick })
  );
  ulEl.replaceChildren(...items);
}
function createSearchResultItem({ feature, handleClick }) {
  const text = feature.text;
  const htmlString = `
    <li><button>${text}</button></li> 
  `;
  const element = createElement(htmlString);

  element
    .querySelector('button')
    .addEventListener('click', handleClick.bind(null, feature));
  return element;
}
function createElement(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.firstElementChild;
}
function zoomIn(bbox, center) {
  const map = wrapper.getMap();
  if (bbox) {
    map.fitBounds(bbox, {
      padding: 100,
    });
  } else {
    // zoom into center instead
    console.log('fly to: ', center);
    map.flyTo({
      center,
      zoom: 15,
    });
  }
}

const searchBox = document.querySelector('#search-box');
const searchInput = searchBox.querySelector('input');
searchInput.addEventListener('input', debounce(handleSearchAPIRequest, 500));
const searchBoxUlEl = document.querySelector('#search-box > ul');
searchInput.addEventListener('focus', () => {
  searchBoxUlEl.classList.remove('none');
});

// handleSearchAPIRequest();
