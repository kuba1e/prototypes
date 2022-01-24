  //Creating function constructor for objects
function Client({
  firstName = "-",
  secondName = "-",
  age = "-",
  experience = "-",
  car = "-",
} = {}) {
  this.firstName = firstName;
  this.secondName = secondName;
  this.age = age;
  this.experience = experience;
  this.car = findElementById(carListArray, car);
}

//Helper function for finding element by id
function findElementById(array, id) {
  return array.find((element) => element.id === +id);
}