<template>
<div class="container">
    <div class="row">
        <div class="col-sm-1">
            <img id="logo" :src='"../assets/teamLogos/"+team+".png"'>
        </div>
        <div class="col-sm-8">
            <h1 id="teamName">{{ teamInfo.name }}</h1>
        </div>
    </div>
    <hr>
    <br>
    <h3><strong>Roster</strong></h3>
    <div class="row">
        <div class="col-sm-6">
            <RosterTable :teamId="abbrToId[team]" />
        </div>
    </div>
</div>
</template>

<script>
import RosterTable from './TeamPage/RosterTable';

export default {
    components: {
        RosterTable
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
            teamInfo: Object()
        }
    },
    watch: {
        jsonTeamInfo(newData) {
            this.parseJsonTeamInfo(newData);
        }
    },
    mounted() {
        this.getJsonTeamInfo();
    },
    methods: {
        getJsonTeamInfo() {
            let url = 'https://statsapi.web.nhl.com/api/v1//teams/';
            url += this.abbrToId[this.team];

            this.axios.get(url).then((response) => {
                this.jsonTeamInfo = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonTeamInfo(json) {
            this.teamInfo = json.teams[0];
        }
    }
};
</script>

<style scoped>
@import './css/table.css';

#logo {
    width: 64px;
}
#teamName {
    padding-top: 0.25em;
}

.container {
    min-height: calc(100vh - 20em);
}
</style>