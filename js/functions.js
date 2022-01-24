//Render DOM with elements from arrays
const initApp = () => {
  renderCarList(carListArray);
  renderClientList(clientListArray);
  renderCarSelect(carListArray, carSelect);
};

//Validate forms
const doValidate = (inputs) => {
  let validationState = true;
  const errorArray = [...document.querySelectorAll(".main__form-warning")];
  deleteErrorTips(errorArray);
  deleteInputErrorClasslist(inputs);

  inputs.forEach((element) => {
    let elementClassList = element.classList;
    if (elementClassList.contains("age")) {
      if (!isAgeValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }
    if (elementClassList.contains("year")) {
      if (!isYearValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }

    if (elementClassList.contains("experience")) {
      if (!isAgeValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }
    if (elementClassList.contains("name")) {
      if (!isNameValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }
    if (
      elementClassList.contains("price") ||
      elementClassList.contains("mileage")
    ) {
      if (!isNumberValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }

    if (elementClassList.contains("text")) {
      if (!isTextValid(element.value)) {
        validationState = false;
        addInputErrorClassList(element);
        element.nextElementSibling.classList.add("main__form-warning--error");
      }
    }
  });

  return validationState;
};

const isNameValid = function (name) {
  const regExp = /^([A-Z]|[А-Я]|\d)([a-z]|[а-я]|\d)+$/;
  return regExp.test(name);
};

const isTextValid = function (text) {
  const regExp = /^([A-Z]|\d)([a-z]|\d)+$/;
  return regExp.test(text);
};

const isAgeValid = function (year) {
  const regExp = /^\d{1,3}$/;
  return regExp.test(+year);
};

const isNumberValid = function (number) {
  const regExp = /^\d+$/;
  return regExp.test(number);
};

const isYearValid = function (year) {
  const regExp = /^\d{4}$/;
  return regExp.test(+year);
};

const addInputErrorClassList = function (input) {
  input.classList.add("main__form-input--error");
};

const deleteErrorTips = function (elementArray) {
  elementArray.forEach((element) => {
    element.classList.remove("main__form-warning--error");
  });
};

const deleteInputErrorClasslist = (inputs) => {
  inputs.forEach((element) =>
    element.classList.remove("main__form-input--error")
  );
};

//Helper function for generate object's id in array
const generateId = (arr) => {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr.at(-1).id + 1;
  }
};

//Function for make forms visible
const showCarForm = () => {
  formContainer.classList.add("main__form-container--active");
  if (clientForm.classList.contains("main__form--active")) {
    clientForm.classList.remove("main__form--active");
  }
  carForm.classList.add("main__form--active");
};

const showClientForm = () => {
  formContainer.classList.add("main__form-container--active");
  if (carForm.classList.contains("main__form--active"))
    carForm.classList.remove("main__form--active");
  clientForm.classList.add("main__form--active");
};

//Creating new object with filled info
const createNewCarElement = (
  inputData,
  array,
  functionConstructor,
  id = null
) => {
  let elementId = null;
  if (id === null) {
    elementId = generateId(array);
    const newElement = new functionConstructor(inputData);
    newElement.id = elementId;
    array.push(newElement);
  } else {
    elementId = id;
    inputData.id = elementId;
    array[findElementArrayIndex(array, elementId)] = inputData;
    return;
  }
};

const createNewClientElement = (
  inputData,
  array,
  functionConstructor,
  id = null
) => {
  let elementId = null;
  if (id === null) {
    elementId = generateId(array);
    const newElement = new functionConstructor(inputData);
    newElement.id = elementId;
    array.push(newElement);
  } else {
    elementId = id;
    inputData.id = elementId;
    inputData.car = findElementById(carListArray, inputData.car);
    array[findElementArrayIndex(array, elementId)] = inputData;
    return;
  }
};

//Updating local storage
const updateLocalStorage = (array, arrayName) => {
  localStorage.setItem(arrayName, JSON.stringify(array));
};

//Get data from forms
const getFormData = (inputsArray) => {
  const formInputValuesObject = inputsArray.reduce((acc, element) => {
    acc[element.name] = element.value;
    return acc;
  }, {});

  return formInputValuesObject;
};

const getClientFormInputs = (clientFormElement) => {
  return [...clientFormElement.querySelectorAll(".main__form-client .req")];
};

const getCarFormInputs = (carFormElement) => {
  return [...carFormElement.querySelectorAll(".main__form-car .req")];
};

//Filling form with info from element object when user pres edit
const fillClientForm = (firstName, secondName, age, experience, car) => {
  clientForm.firstName.value = firstName;
  clientForm.secondName.value = secondName;
  clientForm.age.value = age;
  clientForm.experience.value = experience;
  if (car) {
    if (car.brand === "-") {
      clientForm.car.value = "-";
    } else {
      clientForm.car.value = car.id;
    }
  }
};

const fillCarForm = (brand, year, price, mileage, crashed) => {
  carForm.brand.value = brand;
  carForm.year.value = year;
  carForm.price.value = price;
  carForm.mileage.value = mileage;
  carForm.crashed.value = crashed;
};

//Helper function for finding dataset id from html
const findElementDataSetId = (target) => {
  return Number(target.closest(".main__list-item-control").dataset.id);
};
//Helper function for finding object by id which we get from dataset element
const findElementArrayIndex = (array, elementId) => {
  return array.findIndex((element) => element.id === elementId);
};
//Helper function for deleting object from array by id
const deleteElementFromArray = (array, id) => {
  array.splice(findElementArrayIndex(array, id), 1);
};

//Deleting client element from DOM
function deletingClientElement(elementId) {
  messageContainer.classList.add("main__prompt-message--active");
  messageContainer.addEventListener(
    "click",
    function clientMessageButtonHandler(e, elementId) {
      const { target } = e;
      if (target.closest(".agree-btn")) {
        deleteElementFromArray(clientListArray, elementId);
        updateLocalStorage(clientListArray, "clientListArray");
        renderCarSelect(carListArray, carSelect);
        renderClientList(clientListArray);
        messageContainer.classList.remove("main__prompt-message--active");
        messageContainer.removeEventListener(
          "click",
          clientMessageButtonHandler
        );
        return;
      }
      if (target.closest(".disagree-btn")) {
        messageContainer.classList.remove("main__prompt-message--active");
        messageContainer.removeEventListener(
          "click",
          clientMessageButtonHandler
        );
        return;
      }
    }
  );
}

function deletingCarElement(elementId) {
  messageContainer.classList.add("main__prompt-message--active");
  messageContainer.addEventListener(
    "click",
    function carMessageButtonHandler(e, elementId) {
      const { target } = e;

      if (target.closest(".agree-btn")) {
        deleteElementFromArray(carListArray, elementId);
        updateLocalStorage(carListArray, "carListArray");
        renderCarList(carListArray);
        renderCarSelect(carListArray, carSelect);
        renderClientList(clientListArray);
        messageContainer.classList.remove("main__prompt-message--active");
        messageContainer.removeEventListener("click", carMessageButtonHandler);
        return;
      }
      if (target.closest(".disagree-btn")) {
        messageContainer.classList.remove("main__prompt-message--active");
        messageContainer.removeEventListener("click", carMessageButtonHandler);
        return;
      }
    }
  );
}
//Deleting car element from DOM
const renderClientList = (clientArray) => {
  clientList.innerHTML = "";
  clientArray.forEach((element) => {
    const { firstName, secondName, age, experience, car = {}, id } = element;
    const markup = `
      <li class="main__list-item">
      <div class="main__list-item-control" data-id=${id}>
      <p class="main__list-item-text">
        Name: <span class="main__list-item-name">${
          firstName + " " + secondName
        }</span>
      </p>
      ${buttonsMarkup()}
    </div>
    <div class="main__list-item-info">
      <table class="main__list-item-table">
      ${clientTableHeaderMarkup()}
        <tr class="main__list-item-table-body">
          <td>${firstName}</td>
          <td>${secondName}</td>
          <td>${age}</td>
          <td>${experience}</td>
          ${carTdMarkup(car)}
        </tr>
      </table>
    </div>
    </li>
      `;
    clientList.insertAdjacentHTML("afterbegin", markup);
  });
};

//Render functions
const carTdMarkup = (car) => {
  if (car.brand === "-" && car.brand) {
    return `<td><p>No car</p></td>`;
  } else {
    const carObject = findElementById(carListArray, car.id);
    if (carObject) {
      const { brand, year, price, mileage, crashed } = carObject;
      return `<td>${
        brand +
        ", " +
        year +
        ", " +
        price +
        "$, " +
        mileage +
        "ml, " +
        "was damaged: " +
        crashed
      }</td>`;
    } else {
      return `<td><p>No car</p></td>`;
    }
  }
};

const renderCarList = (carArray) => {
  carList.innerHTML = "";

  carArray.forEach((element) => {
    const { brand, year, price, mileage, crashed, id } = element;

    const markup = `
      <li class="main__list-item">
      <div class="main__list-item-control" data-id=${id}>
      <p class="main__list-item-text">
        Brand: <span class="main__list-item-name">${brand}</span>
      </p>
      ${buttonsMarkup()}
    </div>
    <div class="main__list-item-info">
      <table class="main__list-item-table">
      ${carTableHeaderMarkup()}
        <tr class="main__list-item-table-body">
          <td>${brand}</td>
          <td>${year}</td>
          <td>${price}</td>
          <td>${mileage}</td>
          <td>${crashed}</td>
        </tr>
      </table>
    </div>
    </li>
      `;
    carList.insertAdjacentHTML("afterbegin", markup);
  });
};

const renderCarSelect = (array, select) => {
  carSelect.innerHTML = "";
  if (array.length) {
    array.forEach(({ brand, year, price, mileage, crashed, id }) => {
      const optionMarkUp = `
        <option value="${id}">${
        brand +
        ", " +
        year +
        ", " +
        price +
        "$, " +
        mileage +
        "ml, " +
        "was damaged: " +
        crashed
      }</option>
        `;
      select.insertAdjacentHTML("afterbegin", optionMarkUp);
    });
  }
  carSelect.insertAdjacentHTML(
    "afterbegin",
    `<option value="-" selected>No, thank you</option>`
  );
};

const setCarSelectStatus = () => {
  if (!carListArray.length) {
    carSelect.disabled = true;
    carSelect.innerHTML = "";
    carSelect.insertAdjacentHTML(
      "afterbegin",
      `<option value="-" selected> Please, at first add car on next page</option>`
    );
  } else {
    carSelect.disabled = false;
  }
};

const buttonsMarkup = () => {
  return `
    <div class="main__list-item-btns">
      <button class="btn edit-btn btn-hover color-9"><i class="fas fa-edit"></i></button>
      <button class="btn delete-btn btn-hover color-9"><i class="fas fa-trash-alt"></i></button>
      <button class="btn show-btn btn-hover color-9"><i class="fas fa-eye"></i></button>
    </div>
    `;
};

const carTableHeaderMarkup = () => {
  return `
    <tr class="main__list-item-table-header">
      <th>Brand</th>
      <th>Was produced in</th>
      <th>Price</th>
      <th>Mileage</th>
      <th>Was damaged</th>
    </tr>
    `;
};

const clientTableHeaderMarkup = () => {
  return `
    <tr class="main__list-item-table-header">
      <th>First Name</th>
      <th>Second Name</th>
      <th>Age</th>
      <th>Experience</th>
      <th>Car</th>
    </tr>
    `;
};

//Handlers for CRUD actions
const clientButtonActionListener = ({ target }) => {
  if (target.closest(".edit-btn")) {
    setCarSelectStatus();
    showClientForm();
    const elementId = findElementDataSetId(target);
    clientForm.dataset.id = elementId;
    const { firstName, secondName, age, experience, car } = findElementById(
      clientListArray,
      elementId
    );

    fillClientForm(firstName, secondName, age, experience, car);
    return;
  }
  if (target.closest(".delete-btn")) {
    const elementId = findElementDataSetId(target);
    deletingClientElement(elementId);
    return;
  }
  if (target.closest(".show-btn")) {
    target
      .closest(".main__list-item")
      .querySelector(".main__list-item-info")
      .classList.toggle("show");
    target
      .closest(".main__list-item")
      .querySelector(".main__list-item-control")
      .classList.toggle("show");
    return;
  }
};

const carButtonActionListener = ({ target }) => {
  if (target.closest(".edit-btn")) {
    showCarForm();
    const elementId = Number(
      target.closest(".main__list-item-control").dataset.id
    );
    carForm.dataset.id = elementId;
    const { brand, year, price, mileage, crashed, id } = findElementById(
      carListArray,
      elementId
    );
    fillCarForm(brand, year, price, mileage, crashed);
    return;
  }
  if (target.closest(".delete-btn")) {
    setCarSelectStatus();
    const elementId = findElementDataSetId(target);
    deletingCarElement(elementId);
    renderCarSelect(carListArray, carSelect);
    return;
  }
  if (target.closest(".show-btn")) {
    target
      .closest(".main__list-item")
      .querySelector(".main__list-item-info")
      .classList.toggle("show");
    target
      .closest(".main__list-item")
      .querySelector(".main__list-item-control")
      .classList.toggle("show");
    return;
  }
};

//Welcome animation
const doAnimation = () => {
  const sliderArray = [...document.querySelectorAll(".slider")];
  sliderArray[0].classList.add("slider--first-animation");
  sliderArray[1].classList.add("slider--second-animation");
  sliderArray[2].classList.add("slider--third-animation");
};

//Listeners
showCarsListButton.addEventListener("click", ({ target }) => {
  clientList.parentElement.classList.remove(
    "main__client-list-wrapper--active"
  );
  carList.parentElement.classList.add("main__car-list-wrapper--active");
});

showClientsListButton.addEventListener("click", ({ event }) => {
  carList.parentElement.classList.remove("main__car-list-wrapper--active");
  clientList.parentElement.classList.add("main__client-list-wrapper--active");
});

carAddButton.addEventListener("click", ({ target }) => {
  showCarForm();
});

clientAddButton.addEventListener("click", ({ target }) => {
  setCarSelectStatus();
  formContainer.classList.add("main__form-container--active");
  if (carForm.classList.contains("main__form--active"))
    carForm.classList.remove("main__form--active");
  clientForm.classList.add("main__form--active");
});

formContainer.addEventListener("click", ({ target }) => {
  if (target.closest(".main__close-btn")) {
    formContainer.classList.remove("main__form-container--active");
    formContainer.querySelector(".main__form--active").reset();
  }
});

clientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { target } = event;
  const clientFormInputs = getClientFormInputs(target);
  let isValid = doValidate(clientFormInputs);
  if (isValid) {
    const clientFormData = getFormData(clientFormInputs);
    clientForm.reset();
    const elementId = clientForm.dataset.id;
    if (elementId) {
      createNewClientElement(
        clientFormData,
        clientListArray,
        Client,
        +elementId
      );
      clientForm.dataset.id = "";
    } else {
      createNewClientElement(clientFormData, clientListArray, Client);
    }
    updateLocalStorage(clientListArray, "clientListArray");
    renderClientList(clientListArray);
  }
});

carForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { target } = event;
  const carFormInputs = getCarFormInputs(target);
  let isValid = doValidate(carFormInputs);
  if (isValid) {
    const carFormData = getFormData(carFormInputs);
    carForm.reset();
    const elementId = carForm.dataset.id;
    if (elementId) {
      createNewCarElement(carFormData, carListArray, Car, +elementId);
      carForm.dataset.id = "";
    } else {
      createNewCarElement(carFormData, carListArray, Car);
    }
    updateLocalStorage(carListArray, "carListArray");
    renderCarList(carListArray);
    renderCarSelect(carListArray, carSelect);
  }
});

clientList.addEventListener("click", clientButtonActionListener);

carList.addEventListener("click", carButtonActionListener);
