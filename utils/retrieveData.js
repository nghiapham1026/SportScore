const cache = require('./cache'); // Assuming cache.js is in the same directory

const retrieveDataFromDb = async (
  Model,
  fetchFunction,
  queryParams,
  res,
  errorMessage
) => {
  try {
    // Generate a unique cache key based on the model name and queryParams
    const cacheKey = `${Model.modelName}-${JSON.stringify(queryParams)}`;

    // Try to get data from cache
    let data = cache.get(cacheKey);

    // If data is not in cache or cache data is stale, fetch from DB
    if (!data) {
      if (!queryParams || Object.keys(queryParams).length === 0) {
        data = await Model.findOne({});
      } else {
        data = await Model.findOne({ queryParams });
      }

      const currentTime = new Date();
      const twentyFourHoursAgo = new Date(currentTime - 24 * 60 * 60 * 1000);

      // If there's no data or the data's updatedAt date is more than 24 hours old
      // fetch new data and update the cache
      if (!data || (data.updatedAt && data.updatedAt < twentyFourHoursAgo)) {
        const fetchedData = await fetchAndSaveToDb(fetchFunction, Model, queryParams);
        // Update cache with new data using stdTTL as the TTL
        cache.set(cacheKey, JSON.stringify(fetchedData), 3600); // 3600 seconds TTL
        data = fetchedData;
      } else {
        // Data is fresh enough, update the cache
        cache.set(cacheKey, JSON.stringify(data), 3600);
      }
    }

    // If data exists, return it
    if (data) {
      res.status(200).json(data);
    } else {
      // Handle no data found
      res.status(404).json({ message: errorMessage || 'Data not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
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
    throw error; // Rethrow the error to be handled by the caller
  }
};

module.exports = retrieveDataFromDb;
