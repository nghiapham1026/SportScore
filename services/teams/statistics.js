require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const TeamStatistics = require('../../models/teams/statistics'); // Import the schema

const API_ENDPOINT = `${apiUrl}/teams/statistics`;

const getTeamStatistics = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);
  console.log(data);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getTeamStatistics(params, attempts + 1);
    } else {
      console.log(data);
      return { error: 'Empty data after multiple attempts' };
    }
  }

  const responseData = Array.isArray(data.response)
    ? data.response
    : [data.response];

  // Process the data into the schema
  const statisticsData = responseData.map((item) => ({
    queryParams: params,
    league: item.league,
    team: item.team,
    form: item.form,
    fixtures: item.fixtures,
    goals: item.goals,
    biggest: {
      wins: {
        home: item.biggest.wins.home,
        away: item.biggest.wins.away,
      },
      loses: {
        home: item.biggest.loses.home,
        away: item.biggest.loses.away,
      },
    },
    clean_sheet: item.clean_sheet,
    failed_to_score: item.failed_to_score,
    penalty: item.penalty,
    lineups: item.lineups,
    cards: item.cards,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  }));

  // Save to MongoDB
  try {
    for (const statData of statisticsData) {
      // Check for existing data using queryParams as a unique identifier
      const existingData = await TeamStatistics.findOne({
        queryParams: params,
      });

      // If data does not exist, save to MongoDB
      if (!existingData) {
        await TeamStatistics.create(statData);
        console.log(`Data for team ${statData.team.name} saved successfully`);
      } else if (
        existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
      ) {
        // Replace the existing data
        await TeamStatistics.findOneAndReplace(
          { queryParams: params },
          { ...statData, updatedAt: Date.now() } // Update the timestamp
        );
        console.log(
          `Data for team ${statData.team.name} already exists in the database. Existing data has been replaced with new data.`
        );
      }
    }
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }

  return statisticsData;
};

module.exports = {
  getTeamStatistics,
};
