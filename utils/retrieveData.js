const cache = require('./cache'); // Assuming cache.js is in the same directory
const News = require('../models/news');

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
      // In retrieveDataFromDb, when preparing to set data in the cache
      if (!data || (data.updatedAt && data.updatedAt < twentyFourHoursAgo)) {
        const fetchedData = await fetchFunction(queryParams);

        // Convert Mongoose document to a plain object if it's not already one
        const dataToCache =
          fetchedData instanceof Model ? fetchedData.toObject() : fetchedData;

        // Update cache with new data using stdTTL as the TTL
        cache.set(cacheKey, dataToCache, 3600); // 3600 seconds TTL
        data = dataToCache;
      } else {
        // Data is fresh enough, update the cache
        const dataToCache = data instanceof Model ? data.toObject() : data;
        cache.set(cacheKey, dataToCache, 3600);
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

/**
 * Retrieves the latest 5 news articles from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of the latest 5 news articles.
 */
const retrieveLatestNews = async () => {
    try {
      // Query the database for the latest 5 news articles, sorted by date
      const latestNews = await News.find({})
        .sort({ date: -1 }) // Assuming 'date' field holds ISO date string
        .limit(10);
  
      return latestNews;
    } catch (err) {
      console.error('Error retrieving news articles: ', err);
      throw err;
    }
  };

module.exports = {
    retrieveDataFromDb,
    retrieveLatestNews,
}
