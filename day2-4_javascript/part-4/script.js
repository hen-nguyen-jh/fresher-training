(function (window, document) {
  // body

  const createMapWrapper = () => {
    let map;

    return {
      getMap: () => map,
      setMap: (newMap) => {
        if (!newMap) {
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
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const geol = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geol);

    addMarkers(map);

    map.on('click', (event) => {
      const markerInfo = {
        title: 'Test title',
        description: 'This is my description',
      };

      const el = document.createElement('div');
      el.className = 'marker';

      const coords = event.lngLat;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${markerInfo.title}</h3><p>${markerInfo.description}</p>`
          )
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

      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';

        const marker = new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
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
      return;
    }

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
    } catch (error) {}
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
})(window, document);
