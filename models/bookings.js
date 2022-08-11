class Bookings {
  constructor(
    id,
    userId,
    locationId,
    startDate,
    endDate,
    numberOfTrawellers,
    price
  ) {
    this.id = id;
    this.userId = userId;
    this.locationId = locationId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfTrawellers = numberOfTrawellers;
    this.price = price;
  }
}

module.exports = Bookings;
