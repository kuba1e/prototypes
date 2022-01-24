const showClientsListButton = document.querySelector(".client-btn");
const showCarsListButton = document.querySelector(".car-btn");
const clientList = document.querySelector(".client-list");
const carList = document.querySelector(".car-list");
const clientAddButton = document.querySelector(".client-list__add-btn");
const carAddButton = document.querySelector(".car-list__add-btn");
const formContainer = document.querySelector(".main__form-container");
const clientForm = document.querySelector(".main__form-client");
const carForm = document.querySelector(".main__form-car");
const carSelect = document.querySelector(".select");
const messageContainer = document.querySelector(".main__prompt-message");

const carListArray = restoreCarListArrayFromJSON() ?? [];
const clientListArray = restoreClientListArrayFromJSON() ?? [];


  //Getting data from JSON. And restor value of key construcrot in prototype
function restoreCarListArrayFromJSON() {
  const carListArrayFromJSON = JSON.parse(
    localStorage.getItem("carListArray")
  );
  if (!carListArrayFromJSON) {
    return;
  } else {
    return carListArrayFromJSON.map((car) => {
      return Object.assign(new Car(), car);
    });
  }
}

function restoreClientListArrayFromJSON() {
  const clientListArrayFromJSON = JSON.parse(
    localStorage.getItem("clientListArray")
  );
  if (!clientListArrayFromJSON) {
    return;
  } else {
    return clientListArrayFromJSON.map((client) => {
      client.car = Object.assign(new Car(), client.car);
      return Object.assign(new Client(), client);
    });
  }
}