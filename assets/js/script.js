const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totoalImages = 0;
let photosArray = [];

// API
const count = 10;
const apiKey = 'SuMSNzbvn4v3GsDfzPBkEeOpv7lT9AoyqpMEKKdOtIk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Checking loaded images
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totoalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(item, attributes) {
  for (let key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
}

// Cretate elements for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totoalImages = photosArray.length;

  photosArray.forEach(photo => {
    // Create the <a> tag and add some attributes
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // Create <img>
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description
    });

    // Event listener for download images
    img.addEventListener('load', imageLoaded);

    // Put elements inside one another.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

getPhotos();

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
