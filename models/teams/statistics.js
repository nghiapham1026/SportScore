const mongoose = require('mongoose');

const minuteSchema = new mongoose.Schema({
    '0-15': { total: Number, percentage: String },
    '16-30': { total: Number, percentage: String },
    '31-45': { total: Number, percentage: String },
    '46-60': { total: Number, percentage: String },
    '61-75': { total: Number, percentage: String },
    '76-90': { total: Number, percentage: String },
    '91-105': { total: Number, percentage: String },
    '106-120': { total: Number, percentage: String }
});

const recordSchema = new mongoose.Schema({
    home: Number,
    away: Number,
    total: Number
});

const lineupSchema = new mongoose.Schema({
    formation: String,
    played: Number
});

const teamStatisticsSchema = new mongoose.Schema({
    queryParams: mongoose.Schema.Types.Mixed,
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
    fixtures: {
        played: {
          home: Number,
          away: Number,
          total: Number
        },
        wins: {
          home: Number,
          away: Number,
          total: Number
        },
        draws: {
          home: Number,
          away: Number,
          total: Number
        },
        loses: {
          home: Number,
          away: Number,
          total: Number
        }
    },
    goals: {
        for: {
            total: recordSchema,
            average: recordSchema,
            minute: minuteSchema
        },
        against: {
            total: recordSchema,
            average: recordSchema,
            minute: minuteSchema
        }
    },
    biggest: {
        wins: {
          home: { scored: Number, conceded: Number },
          away: { scored: Number, conceded: Number }
        },
        loses: {
          home: { scored: Number, conceded: Number },
          away: { scored: Number, conceded: Number }
        }
    },
    clean_sheet: recordSchema,
    failed_to_score: recordSchema,
    penalty: {
        scored: { total: Number, percentage: String },
        missed: { total: Number, percentage: String },
        total: Number
    },
    lineups: [lineupSchema],
    cards: {
        yellow: minuteSchema,
        red: minuteSchema
    }
},
{ typeKey: '$type' });

module.exports = mongoose.model('TeamStatistics', teamStatisticsSchema);