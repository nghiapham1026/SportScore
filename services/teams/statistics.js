require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const TeamStatistics = require('../../models/teams/statistics'); // Import the schema

const API_ENDPOINT = `${apiUrl}/teams/statistics`;

const transformScore = (score) => {
    const [scored, conceded] = score.split('-').map(Number);
    return { scored, conceded };
  };

const getTeamStatistics = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    const responseData = Array.isArray(data.response) ? data.response : [data.response];

    // Process the data into the schema
    const statisticsData = responseData.map(item => ({
        league: item.league,
        team: item.team,
        form: item.form,
        fixtures: item.fixtures,
        goals: item.goals,
        biggest: {
            wins: {
              home: transformScore(item.biggest.wins.home),
              away: transformScore(item.biggest.wins.away)
            },
            loses: {
              home: transformScore(item.biggest.loses.home),
              away: transformScore(item.biggest.loses.away)
            }
          },
        clean_sheet: item.clean_sheet,
        failed_to_score: item.failed_to_score,
        penalty: item.penalty,
        lineups: item.lineups,
        cards: item.cards
    }));

    // Save to MongoDB
    try {
        await TeamStatistics.insertMany(statisticsData);
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return statisticsData;
};

module.exports = {
    getTeamStatistics
};