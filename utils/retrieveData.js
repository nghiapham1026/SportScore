const retrieveDataFromDb = async (Model, queryParams, res, errorMessage) => {
  try {
    const data = await Model.findOne({ queryParams });
    if (!data) {
      return res.status(404).json({ message: errorMessage });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = retrieveDataFromDb;
