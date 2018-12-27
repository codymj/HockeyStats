<template>
<div v-if="playerInfo" class="container">
    <div class="row">
        <div class="col-sm-12">
            <h1 id="title">
                #{{ playerInfo.primaryNumber }}
                {{ playerInfo.fullName }}
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <h3>
                {{ playerInfo.primaryPosition.name }}
                &nbsp;
                {{ playerInfo.height }}
                &nbsp;
                {{ playerInfo.weight }}lbs
                &nbsp;
                {{ playerInfo.birthCity }}, {{ playerInfo.birthCountry }}
            </h3>
        </div>
    </div>
    <hr>
    <br>
    
</div>
</template>

<script>
export default {
    props: {
        id: null
    },
    data() {
        return {
            jsonPlayerInfo: null,
            jsonPlayerStats: null,
            playerInfo: Array(),
            playerStats: Array()
        }
    },
    watch: {
        jsonPlayerInfo(newData) {
            this.parseJsonPlayerInfo(newData);
        },
        jsonPlayerStats(newData) {
            this.parseJsonStats(newData);
        }
    },
    mounted() {
        this.getJsonPlayerInfo();
        this.getJsonPlayerStats();
    },
    methods: {
        getJsonPlayerInfo() {
            let url = 'https://statsapi.web.nhl.com/api/v1/people/';
            url += this.id;

            this.axios.get(url).then((response) => {
                this.jsonPlayerInfo = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonPlayerInfo(json) {
            this.playerInfo = json.people[0];
        },
        getJsonPlayerStats() {
            let url = 'https://statsapi.web.nhl.com/api/v1/people/';
            url += this.id;
            url += '/stats?stats=statsSingleSeason';

            this.axios.get(url).then((response) => {
                this.jsonPlayerStats = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonStats(json) {
            this.playerStats = json.stats[0].splits[0].stat;
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
h3 {
    padding-top: 0.75em;
}

.container {
    min-height: calc(100vh - 20em);
}
</style>