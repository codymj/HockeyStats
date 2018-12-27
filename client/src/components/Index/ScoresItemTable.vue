<template>
<table class="table table-sm">
    <thead></thead>
    <tbody v-if="gameState != 'Scheduled'">
        <tr>
            <td id="team">
                <a :href="awayTeam"><strong>{{ awayTeam }}</strong></a>
            </td>
            <td id="score">
                <transition name="fade" mode="out-in">
                    <p :key="awayScore">{{ awayScore }}</p>
                </transition>
            </td>
        </tr>
        <tr>
            <td id="team">
                <a :href="homeTeam"><strong>{{ homeTeam }}</strong></a>
            </td>
            <td id="score">
                <transition name="fade" mode="out-in">
                    <p :key="homeScore">{{ homeScore }}</p>
                </transition>
            </td>
        </tr>
        <tr>
            <td colspan="2" id="infoBar">
                <transition name="fade" mode="out-in">
                    <a :key="gameInfoBar" :href="'game/'+gameId">
                        {{ gameInfoBar }}
                    </a>
                </transition>
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr>
            <td>
                <a :href="awayTeam"><strong>{{ awayTeam }}</strong></a>
                @
                <a :href="homeTeam"><strong>{{ homeTeam }}</strong></a>
            </td>
        </tr>
        <tr>
            <td id="infoBar">
                <transition name="fade" mode="out-in">
                    <a :key="gameInfoBar" :href="'game/'+gameId">
                        {{ gameInfoBar }}
                    </a>
                </transition>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

export default {
    props: {
        game: null,
        date: null
    },
    data() {
        return {
            idToAbbr: {
                1: 'NJD', 2: 'NYI', 3: 'NYR', 4: 'PHI', 5: 'PIT', 6: 'BOS',
                7: 'BUF', 8: 'MTL', 9: 'OTT', 10: 'TOR', 12: 'CAR',
                13: 'FLA', 14: 'TBL', 15: 'WSH', 16: 'CHI', 17: 'DET',
                18: 'NSH', 19: 'STL', 20: 'CGY', 21: 'COL', 22: 'EDM',
                23: 'VAN', 24: 'ANA', 25: 'DAL', 26: 'LAK', 28: 'SJS',
                29: 'CBJ', 30: 'MIN', 52: 'WPG', 53: 'ARI', 54: 'VGK'
            },
            gameId: null,
            gameStartTime: null,
            awayTeam: null,
            homeTeam: null,
            awayScore: null,
            homeScore: null,
            gameState: null,
            gameInfoBar: null,
            periodTimeRemaining: null,
            periodOrdinal: null,
            inIntermission: null
        }
    },
    mounted() {
        this.setData();
    },
    watch: {
        game() {
            this.setData();
        }
    },
    methods: {
        setData() {
            this.gameId = this.game[0].gamePk;
            this.gameState = this.game[0].status.detailedState;
            this.periodTimeRemaining = this.game[1].currentPeriodTimeRemaining;
            this.periodOrdinal = this.game[1].currentPeriodOrdinal;
            this.gameStartTime = this.timestampToTime(this.game[0].gameDate);
            this.inIntermission = this.game[1].intermissionInfo.inIntermission;

            this.awayTeam = this.idToAbbr[this.game[0].teams.away.team.id];
            this.homeTeam = this.idToAbbr[this.game[0].teams.home.team.id];
            this.homeScore = this.game[1].teams.home.goals;
            this.awayScore = this.game[1].teams.away.goals;

            if(this.gameState == 'Scheduled') {
                this.awayScore = '';
                this.homeScore = '';
                this.gameInfoBar = this.gameStartTime;
            } else if(this.gameState && this.gameState.includes('In Progress') && !this.inIntermission) {
                this.gameInfoBar = this.periodOrdinal + ' - ' + this.periodTimeRemaining;
            } else if(this.periodTimeRemaining == 'Final' && this.periodOrdinal == 'OT') {
                this.gameInfoBar = 'Final/OT';
            } else if(this.periodTimeRemaining == 'Final' && this.periodOrdinal == 'SO') {
                this.gameInfoBar = 'Final/SO';
            } else if(this.periodTimeRemaining == 'Final' && this.periodOrdinal == '3rd') {
                this.gameInfoBar = 'Final';
            } else if(this.inIntermission == true) {
                let timeLeftSecs = this.game[1].intermissionInfo.intermissionTimeRemaining;
                let mins = Math.floor(timeLeftSecs/60);
                let secs = Math.floor((timeLeftSecs/60 - mins).toFixed(2)*60);
                mins = mins < 10 ? ('0' + mins) : mins;
                secs = secs < 10 ? ('0' + secs) : secs;
                this.gameInfoBar = this.periodOrdinal + ' INT - ' + mins + ':' + secs;
            } else {
                this.gameInfoBar = this.gameState;
            }
        },
        timestampToTime(ts) {
            return moment(ts).format("h:mm A") + ' ET';
        }
    },
};
</script>

<style scoped>
@import '../css/table.css';

td {
    background-color: #202020 !important;
    text-align: center;
}
td p {
    padding: 0;
    margin: 0;
}
#team {

}
#score {
    padding-right: 1em;
}
#infoBar {
    border-top: 2px solid #fff !important;
    text-align: center;
}

.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.5s;
}
.fade-leave {
    
}
.fade-leave-active {
    transition: opacity 0.5s;
    opacity: 0;
}
</style>
