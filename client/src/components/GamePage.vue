<template>
<div v-if="jsonGameData" class="container">
    <!-- No preview written and game not started -->
    <div v-if="!previewAvailable && !onIce" class="row justify-content-center">
        <div class="col text-center">
            <h1><strong>{{ awayTeam }} @ {{ homeTeam }}</strong></h1>
            <h5><strong>{{ gameStartTime }}</strong></h5>
            <h5><strong>{{ jsonGameData.gameData.venue.name }}</strong></h5>
        </div>
    </div>

    <!-- If game preview written by NHL and game has not started -->
    <div v-else-if="previewAvailable && !onIce" class="head">
        <p>
            {{ date }}
            <br>
            {{ contributor }} <a :href="'https://twitter.com/'+contributorTwitter">{{ contributorTwitter }}</a>
        </p>
        <img class="img-responsive" :src="mainImg" />
        <h2 class="headline"><b>{{ headline }}</b></h2>
        <h4 class="subhead">{{ subhead }}</h4>
        <p>{{ description }}</p>
    </div>

    <!-- Game has started, show stats -->
    <div v-else class="main">
        <ScoreBoard v-if="scoreBoardData" :gameData="scoreBoardData" />
        <hr>
        <br><br>

        <PlayerStatsTable v-if="playerStatsTableData" :gameData="playerStatsTableData" />
        <br><br>

        <MilestonesTable :gameData="milestonesData" />
    </div>
</div>
</template>

<script>
import ScoreBoard from './GamePage/ScoreBoard';
import PlayerStatsTable from './GamePage/PlayerStatsTable';
import MilestonesTable from './GamePage/MilestonesTable';
import axios from 'axios';
import moment from 'moment';

export default {
    props: {
        id: null
    },
    components: {
        MilestonesTable, PlayerStatsTable, ScoreBoard
    },
    data() {
        return {
            jsonContent: null,
            previewAvailable: null,
            date: null,
            contributor: null,
            contributorTwitter: null,
            headline: null,
            subhead: null,
            description: null,
            mainImg: null,
            gameMilestones: Array(),
            gameImgs: null,
            displayMode: null,

            jsonGameData: null,
            scoreBoardData: null,
            playerStatsTableData: null,
            milestonesData: null,
            onIce: false,
            gameStartTime: null,
            boxscore: null,
            linescore: null,
            awayTeam: null,
            awayScore: null,
            homeTeam: null,
            homeScore: null,
            periodTimeRemaining: null,
            periodOrdinal: null,
            inIntermission: null,
            intermissionTimeRemaining: null,
            hasShootout: null,
            awayStats: null,
            homeStats: null,
            threeStars: null,

            awayPlayers: Array(),
            homePlayers: Array()
        }
    },
    mounted() {
        this.getJsonContent();
        this.getJsonGameData();
    },
    watch: {
        jsonContent(newData) {
            this.parseJsonContent(newData);
        },
        jsonGameData(newData) {
            this.parseJsonGameData(newData);
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.getJsonGameData(),
            this.getJsonContent()
        }, 15000);
    },
    methods: {
        getJsonContent() {
            let url = 'https://statsapi.web.nhl.com/api/v1/game/'+this.id+'/content';
            axios.get(url).then((response) => {
                this.jsonContent = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonContent(json) {
            if(!json.editorial.recap.items.length) {
                this.displayMode = 'preview';
                if(!json.editorial.preview.items.length) {
                    this.previewAvailable = false;
                } else {
                    this.previewAvailable = true;
                }
            } else {
                this.previewAvailable = true;
                this.displayMode = 'recap';
            }

            let imgSize = '568x320';
            if(this.displayMode == 'preview') {
                let previewItems = json.editorial.preview.items[0];
                this.date = moment(previewItems.date).format('MMMM Do YYYY, h:mm A');
                this.contributor = previewItems.contributor.contributors[0].name;
                this.contributorTwitter = previewItems.contributor.contributors[0].twitter;
                this.headline = previewItems.headline;
                this.subhead = previewItems.subhead;
                this.description = previewItems.seoDescription;
                this.mainImg = previewItems.media.image.cuts[imgSize].src;
            } else {
                let recapItems = json.editorial.recap.items[0];
                this.date = moment(recapItems.date).format('MMMM Do YYYY, h:mm A');
                this.contributor = recapItems.contributor.contributors[0].name;
                this.contributorTwitter = recapItems.contributor.contributors[0].twitter;
                this.headline = recapItems.headline;
                this.subhead = recapItems.subhead;
                this.description = recapItems.seoDescription;
                this.mainImg = recapItems.media.image.cuts[imgSize].src;
            }
            this.gameMilestones = json.media.milestones.items;
            this.gameHighlights = json.highlights.scoreboard.items;
        },
        getJsonGameData() {
            let url = 'https://statsapi.web.nhl.com/api/v1/game/'+this.id+'/feed/live';
            axios.get(url).then((response) => {
                this.jsonGameData = response.data;
                if(this.jsonGameData.liveData.linescore.currentPeriodOrdinal != 'Scheduled') {
                    this.onIce = true;
                } else {
                    this.onIce = false;
                }
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonGameData(json) {
            this.gameStartTime = this.timestampToTime(json.gameData.datetime.dateTime);
            this.awayTeam = json.gameData.teams.away.triCode;
            this.homeTeam = json.gameData.teams.home.triCode;

            this.linescore = json.liveData.linescore;
            this.awayScore = this.linescore.teams.away.goals;
            this.homeScore = this.linescore.teams.home.goals;
            if(!this.linescore.periods.length) {
                this.periodOrdinal = 'Scheduled';
                this.periodTimeRemaining = this.gameStartTime;
            } else {
                this.periodOrdinal = this.linescore.currentPeriodOrdinal;
                this.periodTimeRemaining = this.linescore.currentPeriodTimeRemaining;
            }
            
            this.boxscore = json.liveData.boxscore;
            this.awayStats = this.boxscore.teams.away.teamStats.teamSkaterStats;
            this.homeStats = this.boxscore.teams.home.teamStats.teamSkaterStats;
            this.awayPlayers = Object.values(this.boxscore.teams.away.players);
            this.homePlayers = Object.values(this.boxscore.teams.home.players);
            if(this.periodOrdinal != 'Scheduled') {
                this.onIce = true;
            } else {
                this.onIce = false;
            }

            this.inIntermission = this.linescore.intermissionInfo.inIntermission;
            this.intermissionTimeRemaining = this.linescore.intermissionInfo.intermissionTimeRemaining;
            this.hasShootout = this.linescore.hasShootout;

            if(json.liveData.decisions.firstStar) {
                this.threeStars = {
                    'firstStar': json.liveData.decisions.firstStar.fullName,
                    'secondStar': json.liveData.decisions.secondStar.fullName,
                    'thirdStar': json.liveData.decisions.thirdStar.fullName
                };
            }

            this.packData();
        },
        packData() {
            this.scoreBoardData = {
                'gameStartTime': this.gameStartTime,
                'awayTeam': this.awayTeam,
                'awayScore': this.awayScore,
                'homeTeam': this.homeTeam,
                'homeScore': this.homeScore,
                'linescore': this.linescore,
                'periodOrdinal': this.periodOrdinal,
                'periodTimeRemaining': this.periodTimeRemaining,
                'boxscore': this.boxscore,
                'awayStats': this.awayStats,
                'homeStats': this.homeStats,
                'inIntermission': this.inIntermission,
                'intermissionTimeRemaining': this.intermissionTimeRemaining,
                'hasShootout': this.hasShootout,
                'threeStars': this.threeStars
            };

            this.playerStatsTableData = {
                'awayTeam': this.awayTeam,
                'homeTeam': this.homeTeam,
                'awayPlayers': this.awayPlayers,
                'homePlayers': this.homePlayers
            };

            this.milestonesData = {
                'gameMilestones': this.gameMilestones,
                'gameHighlights': this.gameHighlights
            };
        },
        timestampToTime(ts) {
            return moment(ts).format("h:mm A") + ' ET';
        }
    }
};
</script>

<style>
@import './css/table.css';

.container {
    min-height: calc(100vh - 20em);
}
.head img {
    padding-bottom: 1em;
}
.head h1, .head h4 {
    padding-bottom: 10px;
}
.main {
    padding-bottom: 3em;
    padding-top: 2em;
}
.img-responsive {
    max-width: 100%;
}
</style>
