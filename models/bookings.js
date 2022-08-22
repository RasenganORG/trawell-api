class Bookings {
  constructor(
    id,
    userId,
    roomId,
    startDate,
    endDate,
    numberOfTrawellers,
    price,
    country,
    city,
    photo
  ) {
    this.id = id;
    this.userId = userId;
    this.roomId = roomId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfTrawellers = numberOfTrawellers;
    this.price = price;
    this.country = country;
    this.city = city;
    this.photo = photo;
  }
}

module.exports = Bookings;
