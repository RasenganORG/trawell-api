class PropertyToRent {
  constructor(
    id,
    propertyStyle,
    propertyType,
    roomType,
    numberOfGuests,
    numberOfBedrooms,
    numberOfBeds,
    numberOfBathrooms,
    bathroomPrivate,
    adress,
    amenities,
    photos
  ) {
    this.id = id;
    this.propertyStyle = propertyStyle;
    this.propertyType = propertyType;
    this.roomType = roomType;
    this.numberOfGuests = numberOfGuests;
    this.numberOfBedrooms = numberOfBedrooms;
    this.numberOfBeds = numberOfBeds;
    this.numberOfBathrooms = numberOfBathrooms;
    this.bathroomPrivate = bathroomPrivate;
    this.adress = adress;
    this.amenities = amenities;
    this.photos = photos;
  }
}

module.exports = PropertyToRent;
