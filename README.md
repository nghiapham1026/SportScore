# SportScore API Manual

Welcome to the SportScore API! This API provides various endpoints to retrieve football-related data, such as player statistics, team information, and match fixtures. Below is a comprehensive guide to all available endpoints.

## Table of Contents

- [General Information](#general-information)
- [Endpoints](#endpoints)
  - [Leagues](#leagues)
  - [Teams](#teams)
  - [Venues](#venues)
  - [Standings](#standings)
  - [Fixtures](#fixtures)
  - [Players](#players)
- [Status Codes](#status-codes)
- [Support](#support)

## General Information

- **Base URL:** `http://localhost:3000` (or your deployed API URL)
- **API Version:** 1.0.0
- **Authentication:** No authentication is required for the current version.

## Endpoints

### Leagues

- **Get Leagues**
  - Endpoint: `/leagues/getLeagues`
  - Description: Retrieve available leagues and cups.
  - Method: `GET`
- **Get Leagues from Database**
  - Endpoint: `/leagues/db/getLeagues`
  - Description: Retrieve leagues data from the database.
  - Method: `GET`

### Teams

- **Get Teams**
  - Endpoint: `/teams/getTeams`
  - Description: Retrieve available teams.
  - Method: `GET`
- **Get Team Season Statistics**
  - Endpoint: `/teams/getTeamSeasonStatistics`
  - Description: Retrieve the statistics of a team for a given competition and season.
  - Method: `GET`
- **Get Teams from Database**
  - Endpoint: `/teams/db/getTeams`
  - Description: Retrieve teams data from the database.
  - Method: `GET`
- **Get Team Statistics from Database**
  - Endpoint: `/teams/db/getStatistics`
  - Description: Retrieve team statistics from the database.
  - Method: `GET`

### Venues

- **Get Team Venues**
  - Endpoint: `/venues/getTeamVenues`
  - Description: Retrieve venues for teams.
  - Method: `GET`
- **Get Venues from Database**
  - Endpoint: `/venues/db/getTeamVenues`
  - Description: Retrieve team venues from the database.
  - Method: `GET`

### Standings

- **Get Standings**
  - Endpoint: `/standings/getStandings`
  - Description: Retrieve standings for a league.
  - Method: `GET`
- **Get Standings from Database**
  - Endpoint: `/standings/db/getStandings`
  - Description: Retrieve standings from the database.
  - Method: `GET`

### Fixtures

- **Get Fixtures**
  - Endpoint: `/fixtures/getFixtures`
  - Description: Retrieve fixtures.
  - Method: `GET`
- **Get Fixture Head to Head**
  - Endpoint: `/fixtures/getFixtureHeadToHead`
  - Description: Retrieve head-to-head data for two teams.
  - Method: `GET`
- **Get Match Statistics**
  - Endpoint: `/fixtures/getMatchStatistics`
  - Description: Retrieve match statistics.
  - Method: `GET`
- **Get Match Events**
  - Endpoint: `/fixtures/getMatchEvents`
  - Description: Retrieve events of a match.
  - Method: `GET`
- **Get Match Lineups**
  - Endpoint: `/fixtures/getMatchLineups`
  - Description: Retrieve lineups of a match.
  - Method: `GET`
- **Get Match Player Statistics**
  - Endpoint: `/fixtures/getMatchPlayerStatistics`
  - Description: Retrieve player statistics for a match.
  - Method: `GET`
- **Get Fixtures from Database**
  - Endpoint: `/fixtures/db/getFixtures`
  - Description: Retrieve fixtures from the database.
  - Method: `GET`
- **Get Head to Head from Database**
  - Endpoint: `/fixtures/db/getHeadToHead`
  - Description: Retrieve head-to-head data from the database.
  - Method: `GET`
- **Get Statistics from Database**
  - Endpoint: `/fixtures/db/getStatistics`
  - Description: Retrieve match statistics from the database.
  - Method: `GET`
- **Get Events from Database**
  - Endpoint: `/fixtures/db/getEvents`
  - Description: Retrieve match events from the database.
  - Method: `GET`
- **Get Lineups from Database**
  - Endpoint: `/fixtures/db/getLineups`
  - Description: Retrieve match lineups from the database.
  - Method: `GET`
- **Get Players from Database**
  - Endpoint: `/fixtures/db/getPlayers`
  - Description: Retrieve player data from the database.
  - Method: `GET`

### Players

- **Get Squads**
  - Endpoint: `/players/getSquads`
  - Description: Retrieve squads.
  - Method: `GET`
- **Get Players**
  - Endpoint: `/players/getPlayers`
  - Description: Retrieve players.
  - Method: `GET`
- **Get Top Scorers**
  - Endpoint: `/players/getTopScorers`
  - Description: Retrieve top scorers.
  - Method: `GET`
- **Get Top Assists**
  - Endpoint: `/players/getTopAssists`
  - Description: Retrieve top assists.
  - Method: `GET`
- **Get Squads from Database**
  - Endpoint: `/players/db/getSquads`
  - Description: Retrieve squads from the database.
  - Method: `GET`
- **Get Players from Database**
  - Endpoint: `/players/db/getPlayers`
  - Description: Retrieve players from the database.
  - Method: `GET`
- **Get Top Scorers from Database**
  - Endpoint: `/players/db/getTopScorers`
  - Description: Retrieve top scorers from the database.
  - Method: `GET`
- **Get Top Assists from Database**
  - Endpoint: `/players/db/getTopAssists`
  - Description: Retrieve top assists from the database.
  - Method: `GET`

## Status Codes

- `200 OK`: The request was successful.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `404 Not Found`: Resource was not found.
- `500 Internal Server Error`: An error occurred on the server.

## Support

For any queries or support, please contact [nghiapham1026@gmail.com](mailto:nghiapham1026@gmail.com).
