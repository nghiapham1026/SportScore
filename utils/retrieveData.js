const retrieveDataFromDb = async (Model, fetchFunction, queryParams, res, errorMessage) => {
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
        await fetchAndSaveToDb(fetchFunction, Model, queryParams);
        // Call itself recursively to get the newly saved data
        return retrieveDataFromDb(Model, fetchFunction, queryParams, res, errorMessage);
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAndSaveToDb = async (fetchFunction, Model, queryParams) => {
    try {
      const newData = await fetchFunction(queryParams);
      const instance = new Model(newData);
      await instance.save();
      return newData;
    } catch (error) {
      console.error('Error fetching and saving data:', error);
      return null;
    }
  };  

module.exports = retrieveDataFromDb;
