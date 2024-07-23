const { Hotel, Location, LocationType } = require('../models');

exports.createHotel = async (req, res) => {
  const { Hotel_Name, Location_Name, Country, Location_Type, Price_Per_Night } = req.body;

  try {
    const locationType = await LocationType.findOne({ where: { Type: Location_Type } });
    if (!locationType) {
      return res.status(400).json({ message: 'Location type does not exist' });
    }

    let location = await Location.findOne({ where: { Name: Location_Name, Country } });
    if (!location) {
      location = await Location.create({ Name: Location_Name, Country, Location_Type_ID: locationType.ID });
    }

    await Hotel.create({
      Name: Hotel_Name,
      Location_ID: location.ID,
      Price_Per_Night
    });

    res.status(201).json({ message: 'Hotel created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the hotel' });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      include: [
        {
          model: Location,
          include: [LocationType]
        }
      ]
    });
    res.json(hotels);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Hotel.destroy({ where: { ID: id } });
    if (result) {
      res.json({ message: 'Hotel deleted successfully' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (err) {
    console.error('Error deleting hotel:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByPk(id, {
      include: [
        {
          model: Location,
          include: [LocationType]
        }
      ]
    });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { Hotel_Name, Location_Name, Country, Location_Type, Price_Per_Night } = req.body;

  try {
    const locationType = await LocationType.findOne({ where: { Type: Location_Type } });
    if (!locationType) {
      return res.status(400).json({ message: 'Location type does not exist' });
    }

    let location = await Location.findOne({ where: { Name: Location_Name, Country } });
    if (!location) {
      location = await Location.create({ Name: Location_Name, Country, Location_Type_ID: locationType.ID });
    }

    const [updated] = await Hotel.update(
      {
        Name: Hotel_Name,
        Location_ID: location.ID,
        Price_Per_Night
      },
      { where: { ID: id } }
    );

    if (updated) {
      const updatedHotel = await Hotel.findByPk(id);
      res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the hotel' });
  }
};
