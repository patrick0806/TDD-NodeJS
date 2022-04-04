const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");
const CarService = require("../../src/service/carService");

const carsDatabase = join(__dirname, "../../database/cars.json");
const mocks = {
  validCarCategory: require("../mocks/valid-car-category.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService", () => {
  let carService = {};
  let sandBox= {};
  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0); // lte = less than equal to, gte = greater than equal to
  });

  it("should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const caridIndex = 0;

    sandBox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(caridIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[caridIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a car category it should return an avaliable car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory); //cria uma nova instancia do objeto que não influencia o objeto pai
    carCategory.carIds = [car.id];

    sandBox.stub(
        carService.carRepository,
        carService.carRepository.find.name,
    ).resolves(car);

    sandBox.spy(carService, carService.chooseRandomCar.name);
    
    const result = await carService.getAvailableCar(carCategory);
    const expected = car;
    
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
