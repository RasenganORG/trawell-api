class PropertyToRent {
  constructor(
    id,
    userId,
    rating,
    placeType,
    propertyType,
    roomType,
    numberOfGuests,
    numberOfBedrooms,
    numberOfBeds,
    numberOfBathrooms,
    bathroomPrivate,
    location,
    amenities,
    images
  ) {
    this.id = id;
    this.userId = userId;
    this.rating = rating;
    this.placeType = placeType;
    this.propertyType = propertyType;
    this.roomType = roomType;
    this.numberOfGuests = numberOfGuests;
    this.numberOfBedrooms = numberOfBedrooms;
    this.numberOfBeds = numberOfBeds;
    this.numberOfBathrooms = numberOfBathrooms;
    this.bathroomPrivate = bathroomPrivate;
    this.location = location;
    this.amenities = amenities;
    this.images = images;
  }
}

module.exports = PropertyToRent;
