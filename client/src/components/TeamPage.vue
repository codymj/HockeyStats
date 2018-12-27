<template>
<div v-if="stats" class="container">
    <div class="row">
        <div class="col-sm-2">
            <a :href="teamInfo.officialSiteUrl">
                <img id="logo" :src='"../assets/teamLogos/"+team+".png"'>
            </a>
        </div>
        <div class="col-sm-10">
            <h1 id="title">
                {{ teamInfo.name }}
                ({{ stats[0].stat.wins }}-{{ stats[0].stat.losses }}-{{ stats[0].stat.ot }})
            </h1>
        </div>
    </div>
    <hr>
    <br>
    <div>
        <TeamStatsTable :stats="stats" />
    </div>
    <br>
    <div class="row">
        <div class="col-sm-12">
            <RosterTable :teamId="abbrToId[team]" />
        </div>
    </div>
</div>
</template>

<script>
import RosterTable from './TeamPage/RosterTable';
import TeamStatsTable from './TeamPage/TeamStatsTable';

export default {
    components: {
        RosterTable, TeamStatsTable
    },
    props: {
        team: null
    },
    data() {
        return {
            abbrToId: {
                'NJD': 1, 'NYI': 2, 'NYR': 3, 'PHI': 4, 'PIT': 5, 'BOS': 6,
                'BUF': 7, 'MTL': 8, 'OTT': 9, 'TOR': 10, 'CAR': 12,
                'FLA': 13, 'TBL': 14, 'WSH': 15, 'CHI': 16, 'DET': 17,
                'NSH': 18, 'STL': 19, 'CGY': 20, 'COL': 21, 'EDM': 22,
                'VAN': 23, 'ANA': 24, 'DAL': 25, 'LAK': 26, 'SJS': 28,
                'CBJ': 29, 'MIN': 30, 'WPG': 52, 'ARI': 53, 'VKG': 54
            },
            jsonTeamInfo: null,
            jsonStats: null,
            teamInfo: Object(),
            stats: null
        }
    },
    watch: {
        jsonTeamInfo(newData) {
            this.parseJsonTeamInfo(newData);
        },
        jsonStats(newData) {
            this.parseJsonStats(newData);
        }
    },
    mounted() {
        this.getJsonTeamInfo();
        this.getJsonStats();
    },
    methods: {
        getJsonTeamInfo() {
            let url = 'https://statsapi.web.nhl.com/api/v1/teams/';
            url += this.abbrToId[this.team];

            this.axios.get(url).then((response) => {
                this.jsonTeamInfo = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonTeamInfo(json) {
            this.teamInfo = json.teams[0];
        },
        getJsonStats() {
            let url = 'https://statsapi.web.nhl.com/api/v1/teams/';
            url += this.abbrToId[this.team] + '?expand=team.stats';

            this.axios.get(url).then((response) => {
                this.jsonStats = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonStats(json) {
            this.stats = Array();
            this.stats = json.teams[0].teamStats[0].splits;
        }
    }
};
</script>

<style scoped>
@import './css/table.css';

#logo {
    width: 64px;
}
#title {
    padding-top: 0.25em;
}

.container {
    min-height: calc(100vh - 20em);
}
</style>