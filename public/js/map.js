let pos;
let map;
let bounds;
let infowindow;
let currentInfoWindow;
let service;
let infoPane;
let searchName = 'Cardiologists';

var cardiologists_toggle = document.getElementById('Cardiologist');
var gym_toggle = document.getElementById('Gym');
var nutritionist_toggle = document.getElementById('Nutritionist');
console.log("Cardiologist object checked: " + cardiologists_toggle.checked);
console.log("gym object checked: " + cardiologists_toggle.checked);
console.log("nutritionist checked: " + cardiologists_toggle.checked);

cardiologists_toggle.addEventListener('change', (event) =>{
  console.log('Cardiologists target event objectP: ' + event.target);
  if (event.target.checked == true) {
    console.log('Gyms has changed to true attempting init map');
    searchName = 'Cardiologists';
    initMap();
  }
});

gym_toggle.addEventListener('change', (event) =>{
  //We don't want to do anything if the checked value isn't true (should never be false)
  if (event.target.checked == true) {
    console.log('Gyms has changed to true attempting init map');
    searchName = 'gyms';
    initMap();
  }
});

nutritionist_toggle.addEventListener('change', (event) =>{
  if (event.target.checked == true) {
    console.log('Nutritionist has changed to true attempting init map');
    searchName = 'Nutritionist';
    initMap();
  }
});

function initMap() {
    bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow;
    currentInfoWindow = infowindow;
    infoPane = document.getElementById('panel');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
          });
          bounds.extend(pos);
          infowindow.setPosition(pos);
          infowindow.setContent('Location found.');
          infowindow.open(map);
          map.setCenter(pos);

          // Call Places Nearby Search on user's location
          getNearbyPlaces(pos);
        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infowindow);
        });
    } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infowindow);
    }
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function getNearbyPlaces(position) {
    let request = {
      location: position,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: searchName
    };
    console.log('Keyword used in request: ' + searchName);
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

    // Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}
function createMarkers(places) {
    places.forEach(place => {
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });

      // Add click listener to each marker
      google.maps.event.addListener(marker, 'click', () => {
        let request = {
          placeId: place.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'rating',
            'website', 'photos']
        };
        /* Only fetch the details of a place when the user clicks on a marker.
         * If we fetch the details for all place results as soon as we get
         * the search response, we will hit API rate limits. */
        service.getDetails(request, (placeResult, status) => {
          showDetails(placeResult, marker, status)
        });
      });
      // Adjust the map bounds to include the location of this marker
      bounds.extend(place.geometry.location);
    });
    /* Once all the markers have been placed, adjust the bounds of the map to
     * show all the markers within the visible area. */
    map.fitBounds(bounds);
}

function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let placeInfowindow = new google.maps.InfoWindow();
      let rating = "None";
      if (placeResult.rating) rating = placeResult.rating;
      placeInfowindow.setContent('<div><strong>' + placeResult.name +
        '</strong><br>' + 'Rating: ' + rating + '</div>');
      placeInfowindow.open(marker.map, marker);
      currentInfoWindow.close();
      currentInfoWindow = placeInfowindow;
      showPanel(placeResult);
    } else {
      console.log('showDetails failed: ' + status);
    }
  }

  function showPanel(placeResult) {
    // If infoPane is already open, close it
    if (infoPane.classList.contains("open")) {
      infoPane.classList.remove("open");
    }
    // Clear the previous details
    while (infoPane.lastChild) {
      infoPane.removeChild(infoPane.lastChild);
    }
    /* TODO: Step 4E: Display a Place Photo with the Place Details */
    // Add the primary photo, if there is one
    if (placeResult.photos) {
      let firstPhoto = placeResult.photos[0];
      let photo = document.createElement('img');
      photo.classList.add('search_image');
      photo.src = firstPhoto.getUrl();
      infoPane.appendChild(photo);
    }
    // Add place details with text formatting
    let name = document.createElement('h1');
    name.classList.add('place');
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating) {
      let rating = document.createElement('p');
      rating.classList.add('details');
      rating.textContent = `Rating: ${placeResult.rating} \u272e`;
      infoPane.appendChild(rating);
    }
    let address = document.createElement('p');
    address.classList.add('details');
    address.textContent =`Address: ${placeResult.formatted_address}`;
    infoPane.appendChild(address);
    if (placeResult.website) {
      let websitePara = document.createElement('p');
      let websiteLink = document.createElement('a');
      let websiteUrl = document.createTextNode(placeResult.website);
      websiteLink.appendChild(websiteUrl);
      websiteLink.title = placeResult.website;
      websiteLink.href = placeResult.website;
      websitePara.appendChild(websiteLink);
      infoPane.appendChild(websitePara);
    }
    // Open the infoPane
    infoPane.classList.add("open");
  }