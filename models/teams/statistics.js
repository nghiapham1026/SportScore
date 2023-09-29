const mongoose = require('mongoose');

const minuteSchema = new mongoose.Schema({
    total: Number,
    percentage: String
}, { _id: false });

const goalsSchema = new mongoose.Schema({
    total: Number,
    average: String,
    minute: {
        '0-15': minuteSchema,
        '16-30': minuteSchema,
        '31-45': minuteSchema,
        '46-60': minuteSchema,
        '61-75': minuteSchema,
        '76-90': minuteSchema,
        '91-105': minuteSchema,
        '106-120': minuteSchema
    }
}, { _id: false });

const teamStatisticsSchema = new mongoose.Schema({
    league: {
        id: Number,
        name: String,
        country: String,
        logo: String,
        flag: String,
        season: Number
    },
    team: {
        id: Number,
        name: String,
        logo: String
    },
    form: String,
    fixtures: Object,
    goals: {
        for: goalsSchema,
        against: goalsSchema
    },
    biggest: Object,
    clean_sheet: Object,
    failed_to_score: Object,
    penalty: Object,
    lineups: Array,
    cards: Object
});

const groupedTeamStatisticsSchema = new mongoose.Schema({
    allTeamStatistics: [teamStatisticsSchema]
});

module.exports = mongoose.model('GroupedTeamStatistics', groupedTeamStatisticsSchema);