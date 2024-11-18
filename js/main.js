import usedCars from "./usedCars.js";

const carsContainer = document.getElementById("cars-container");
const makeFilter = document.getElementById("make-filter");
const yearFilter = document.getElementById("year-filter");
const mileageFilter = document.getElementById("mileage-filter");
const priceFilter = document.getElementById("price-filter");
const colorFilter = document.getElementById("color-filter");
const applyFiltersButton = document.getElementById("apply-filters");

function filterCars() {
  const make = makeFilter.value;
  const year = parseInt(yearFilter.value) || null; //set to null if no year is entered
  const maxMileage = parseInt(mileageFilter.value) || Infinity; //set to infinity if no mileage is entered
  const maxPrice = parseInt(priceFilter.value) || Infinity; //set to infinity if no price is entered
  const color = colorFilter.value;

  // filter
  const filteredCars = usedCars.filter((car) => {
    const matchesMake = make ? car.make === make : true;
    const matchesYear = year ? car.year === year : true;
    const matchesMileage = car.mileage <= maxMileage;
    const matchesPrice = car.price <= maxPrice;
    const matchesColor = color ? car.color === color : true;

    return (
      matchesMake &&
      matchesYear &&
      matchesMileage &&
      matchesPrice &&
      matchesColor
    );
  });

  //clear previous results and display new results
  carsContainer.innerHTML = "";
  filteredCars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.classList.add("card");

    carCard.innerHTML = `
      <h2>${car.year} ${car.make} ${car.model}</h2>
      <img src="${car.imageURL}" alt="${car.make} ${car.model}">
      <p><strong>Price:</strong> $${car.price}</p>
      <p><strong>Mileage:</strong> ${car.mileage} miles</p>
      <p><strong>Gas Mileage:</strong> ${car.gasMileage}</p>
      <p><strong>Color:</strong> ${car.color}</p>
    `;

    carsContainer.appendChild(carCard);
  });
}

applyFiltersButton.addEventListener("click", filterCars);

filterCars();
