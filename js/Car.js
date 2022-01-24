  //Creating function constructor for objects
function Car({
  brand = "-",
  year = "-",
  price = "-",
  mileage = "-",
  crashed = "-",
} = {}) {
  this.brand = brand;
  this.year = year;
  this.price = price;
  this.mileage = mileage;
  this.crashed = crashed;
}