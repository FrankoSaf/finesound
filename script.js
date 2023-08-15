import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1-wHxiKEDHgQS6BkZMlOv3P6wBOel4e4",
  authDomain: "fine-sound-academy.firebaseapp.com",
  projectId: "fine-sound-academy",
  storageBucket: "fine-sound-academy.appspot.com",
  messagingSenderId: "294293467344",
  appId: "1:294293467344:web:0cf49df44c05a6a96f6ed5",
  measurementId: "G-S2MLPDEE2F",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);
const contentRef = ref(db, "content");

onValue(contentRef, (snapshot) => {
  const allContent = snapshot.val();

  for (let key in allContent) {
    if (key === "social_media-links") {
      updateSocialMediaLinks(allContent[key]);
    } else if (key === "banner_image_animation") {
      updateBannerImages(allContent[key]);
    } else if (key === "instruments") {
      updateInstruments(allContent.instruments);
    } else if (key === "about") {
      updateAboutSection(allContent[key]);
    } else if (key == "teachers_duesseldorf") {
      updateTeachersDuesseldorf(allContent.teachers_duesseldorf);
    } else if (key == "probe") {
      updateProbe(allContent.probe);
    } else if (key === "prices") {
      updatePrices(allContent.prices);
    } else {
      updatePageContent(key, allContent[key]);
    }
  }
});

function updateSocialMediaLinks(links) {
  const parentElement = document.querySelector(".social_media-links");
  parentElement.innerHTML = "";
  for (const key in links) {
    const anchor = document.createElement("a");
    anchor.classList.add("title_social_links");
    anchor.href = links[key];
    switch (key) {
      case "facebook":
        anchor.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"></path></svg>`;
        break;
      case "instagram":
        anchor.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z"></path><path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"></path></svg>`;
        break;
      case "youtube":
        anchor.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z"></path></svg>`;
        break;
    }
    parentElement.appendChild(anchor);
  }
}

function updateBannerImages(images) {
  const parentElement = document.querySelector(".banner_image_animation"); // assuming you have an element with class banner_image_animation to append images to
  const existingImages = parentElement.querySelectorAll("img");
  existingImages.forEach((img) => img.remove());

  for (const key in images) {
    const imgElement = document.createElement("img");
    imgElement.src = images[key].trim(); // Trim to remove any leading or trailing whitespace
    imgElement.classList.add(key); // Add class name to the image element (e.g., "first", "second")
    imgElement.style.height = "100%";
    imgElement.style.width = "100%";
    imgElement.style.objectFit = "cover";
    imgElement.style.objectPosition = "center center";

    parentElement.appendChild(imgElement);
  }
}
function updateInstruments(instruments) {
  const instrumentsContainer = document.querySelector(".instruments");

  instruments.forEach((instrument) => {
    const instrumentElement = document.createElement("div");
    const instrumentAnimation = document.createElement("div");
    instrumentAnimation.classList.add("animate__animated");
    instrumentAnimation.classList.add("animate__fadeIn");
    instrumentAnimation.style.animationDuration = "1s";
    instrumentAnimation.style.opacity = "0s";
    instrumentElement.classList.add("instrument_cont"); // Add your class name for instrument container
    const instrumentImage = document.createElement("img");
    instrumentImage.src = instrument.image.trim(); // Trim to remove any leading or trailing whitespace
    instrumentImage.alt = instrument.name;

    // Set the attributes and styles
    instrumentImage.setAttribute("loading", "lazy");
    instrumentImage.width = 300;
    instrumentImage.height = 300;
    instrumentImage.style.color = "transparent";
    const instrumentInfo = document.createElement("div");
    instrumentInfo.classList.add("instrument_text");
    const instrumentName = document.createElement("h5");
    instrumentName.textContent = instrument.name;
    instrumentName.style.fontFamily = "Maytra";
    instrumentName.style.fontSize = "4.4rem";
    instrumentName.style.marginBottom = "1rem";
    const instrumentText = document.createElement("p");
    instrumentText.textContent = instrument.text;

    instrumentInfo.appendChild(instrumentName);
    instrumentInfo.appendChild(instrumentText);

    instrumentElement.appendChild(instrumentImage);
    instrumentElement.appendChild(instrumentInfo);
    instrumentAnimation.appendChild(instrumentElement);

    instrumentsContainer.appendChild(instrumentAnimation);
  });
}
function updateAboutSection(aboutText) {
  const aboutElement = document.querySelector(".about");
  aboutElement.textContent = aboutText;
}
function updateTeachersDuesseldorf(teachers) {
  const teachersContainer = document.querySelector(".teachers_duesseldorf"); // Update with your actual teachers container

  teachers.forEach((teacher) => {
    const teacherElement = document.createElement("div");
    teacherElement.classList.add("teacher");
    const teacherInnerDiv1 = document.createElement("div");
    teacherInnerDiv1.classList.add("teacher_image");
    const teacherInnerDiv2 = document.createElement("div");
    teacherInnerDiv2.classList.add("teacher_name_background");

    const teacherName = document.createElement("p");
    const teacherImage = document.createElement("img");
    teacherName.classList.add("teacher_name");
    teacherName.textContent = teacher.name;
    teacherImage.src = teacher.image.trim(); // Trim to remove any leading or trailing whitespace
    teacherInnerDiv1.appendChild(teacherInnerDiv2);
    teacherInnerDiv1.appendChild(teacherName);
    teacherInnerDiv1.appendChild(teacherImage);
    teacherElement.appendChild(teacherInnerDiv1);
    teachersContainer.appendChild(teacherElement);
  });
}
function updateProbe(probe) {
  const probeElement = document.querySelector(".probe_section");

  // Create and update h3
  let h3 = document.createElement("h3");
  let span = document.createElement("span");
  span.textContent = probe.title;
  h3.appendChild(span);
  span.style.display = "block";
  span.style.textAlign = "center";
  span.style.textTransform = "uppercase";
  span.style.color = "rgb(54, 54, 54)";
  span.style.fontWeight = "bold";


  h3.appendChild(document.createTextNode(probe.text));
  h3.classList.add("probe_title");

  // Update a tag
  let a;
  if (probeElement.querySelector("a")) {
    a = probeElement.querySelector("a");
    a.textContent = probe.button.text;
    a.href = probe.button.link;
    a.classList.add("probe_text");
  } else {
    a = document.createElement("a");
    a.textContent = probe.button.text;
    a.href = probe.button.link;
    a.classList.add("probe_text");
    probeElement.appendChild(a);
  }

  // Replace the existing h3 (if there is one) with the new one
  let existingH3 = probeElement.querySelector("h3");
  if (existingH3) {
    probeElement.replaceChild(h3, existingH3);
  } else {
    probeElement.insertBefore(h3, a); // Inserts h3 before a tag
  }
}

function updatePrices(prices) {
  const pricesContainer = document.querySelector(".prices");
  pricesContainer.innerHTML = "";

  const backgrounds = [
    "https://res.cloudinary.com/dnp7nm4iy/image/upload/c_scale,w_320/v1680344929/left_npnzuf.jpg",
    "https://res.cloudinary.com/dnp7nm4iy/image/upload/c_scale,w_320/v1680344929/center_oi4zvo.jpg",
    "https://res.cloudinary.com/dnp7nm4iy/image/upload/c_scale,w_320/v1680344930/right_pkxc06.jpg",
  ];

  prices.forEach((price, index) => {
    const priceCard = document.createElement("div");
    const priceCardInnerDiv1 = document.createElement("div");
    const priceTitle = document.createElement("h4");
    const priceTitleSpan = document.createElement("span");
    const priceDescription = document.createElement("p");
    const priceInfoList = document.createElement("ul");

    priceTitleSpan.textContent = price.name.main; // Set the span's text
    priceTitle.appendChild(priceTitleSpan); // Add the span to the h4 first
    priceTitle.appendChild(document.createElement("br")); // Then add the break
    priceTitle.appendChild(document.createTextNode(price.name.span)); // Append the main text to the h4 after the break
    priceDescription.textContent = price.description;

    priceInfoList.innerHTML = price.infos
      .map(
        (info) =>
          `<li><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg><p>${info}</p></li>`
      )
      .join("");

    priceCardInnerDiv1.appendChild(priceTitle);
    priceCardInnerDiv1.appendChild(priceDescription);
    priceCardInnerDiv1.appendChild(priceInfoList);
    priceCard.appendChild(priceCardInnerDiv1);
    priceCardInnerDiv1.classList.add("price_card");

    // Assign background based on the current index
    const backgroundUrl = backgrounds[index % backgrounds.length];
    priceCardInnerDiv1.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.596), rgba(0, 0, 0, 0.396), rgba(0, 0, 0, 0.173)), url('${backgroundUrl}') center center / cover no-repeat`;

    priceCard.classList.add("animate__animated");
    priceCard.classList.add("animate__fadeInRight");
    if (index === 0) {
      priceCard.classList.add("animate__delay-0s");
    } else if (index === 1) {
      priceCard.classList.add("animate__delay-1s");
    } else if (index === 2) {
      priceCard.classList.add("animate__delay-2s");
    }

    priceDescription.classList.add("price_desc");
    priceInfoList.classList.add("price_details");
    pricesContainer.appendChild(priceCard);
  });
}

function updatePageContent(contentKey, contentValue) {
  const elements = document.querySelectorAll(`.${contentKey}`);

  elements.forEach((element) => {
    if (element.tagName === "IMG" && contentKey === "logo") {
      element.src = contentValue.trim();
    } else if (element.tagName === "A" && contentKey === "contact") {
      if ("link" in contentValue) {
        element.href = contentValue["link"].trim();
      }
      if ("text" in contentValue) {
        element.textContent = contentValue["text"].trim();
      }
    } else if (
      contentKey === "banner_image_animation" &&
      typeof contentValue === "object"
    ) {
      for (let imgKey in contentValue) {
        let img = document.createElement("img");
        img.src = contentValue[imgKey].trim();
        element.appendChild(img);
      }
    } else {
      element.textContent = contentValue;
    }
  });
}
function initMap() {
  var location = { lat: 51.233911389532445, lng: 6.779142169482935 }; // You can replace these coordinates with your desired location.
  const customStyles = [
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#8b8b8b",
        },
        {
          saturation: "0",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ff0000",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
        {
          lightness: "85",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: "-55",
        },
        {
          hue: "#ffb000",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
        {
          lightness: "60",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
        {
          lightness: "0",
        },
        {
          weight: "3.19",
        },
        {
          saturation: "0",
        },
        {
          gamma: "1.04",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
        {
          lightness: "60",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
        {
          lightness: "60",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b4934a",
        },
        {
          lightness: "60",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
        {
          color: "#ff0000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#b48620",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          lightness: "100",
        },
        {
          saturation: "80",
        },
        {
          color: "#b4934a",
        },
        {
          gamma: "1.70",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b4934a",
        },
      ],
    },
  ];

  var map = new google.maps.Map(document.getElementById("google_map"), {
    zoom: 16,
    center: location,
    styles: customStyles,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "https://res.cloudinary.com/dnp7nm4iy/image/upload/c_scale,w_140/v1680344909/MapMarkerFSA_glucbx.png",
      scaledSize: new google.maps.Size(70, 70),
    },
  });
}
initMap();
