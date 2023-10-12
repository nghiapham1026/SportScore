const retrieveDataFromDb = async (Model, queryParams, res, errorMessage) => {
    try {
      let data;
      if (!queryParams || Object.keys(queryParams).length === 0) {
        // If queryParams is null or an empty object, retrieve without query
        data = await Model.findOne({});
      } else {
        // Else, use queryParams to retrieve data
        data = await Model.findOne({ queryParams });
      }
  
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
