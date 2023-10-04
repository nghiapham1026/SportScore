require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixtureEvents = require('../../models/fixtures/events'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/events`;

const getFixtureEvents = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixtureEventsData = data.response.map(item => ({
        time: item.time,
        team: item.team,
        player: item.player,
        assist: item.assist,
        type: item.type,
        detail: item.detail,
        comments: item.comments
    }));

    // Create a single object to group all the fixture events
    const groupedData = {
        allFixtureEvents: fixtureEventsData
    };

    // Check if data already exists in MongoDB
    try {
        // Check for existing data using time.elapsed, team.id, and player.id as unique identifiers
        const existingData = await GroupedFixtureEvents.findOne({
            "allFixtureEvents": {
                $elemMatch: {
                    "time.elapsed": { $in: fixtureEventsData.map(f => f.time.elapsed) },
                    "team.id": { $in: fixtureEventsData.map(f => f.team.id) },
                    "player.id": { $in: fixtureEventsData.map(f => f.player.id) }
                }
            }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const fixtureEventsGroup = new GroupedFixtureEvents(groupedData);
            await fixtureEventsGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await GroupedFixtureEvents.findOneAndReplace({
                "allFixtureEvents": {
                    $elemMatch: {
                        "time.elapsed": { $in: fixtureEventsData.map(f => f.time.elapsed) },
                        "team.id": { $in: fixtureEventsData.map(f => f.team.id) },
                        "player.id": { $in: fixtureEventsData.map(f => f.player.id) }
                    }
                }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error interacting with MongoDB:", error);
    }

    return fixtureEventsData;
};

module.exports = {
    getFixtureEvents
};