<template>
<div v-if="roster">
    <div class="row">
        <div v-for="player in centers" :key="player.jerseyNumber" class="col-sm-2 playerItem">
            <a :href="/player/+player.person.id">
                <PlayerItem
                :name="player.person.fullName" 
                :number="player.jerseyNumber"
                :position="player.position.name"
                />
            </a>
        </div>
        <div v-for="player in lWingers" :key="player.jerseyNumber" class="col-sm-2 playerItem">
            <a :href="/player/+player.person.id">
                <PlayerItem
                :name="player.person.fullName" 
                :number="player.jerseyNumber"
                :position="player.position.name"
                />
            </a>
        </div>
        <div v-for="player in rWingers" :key="player.jerseyNumber" class="col-sm-2 playerItem">
            <a :href="/player/+player.person.id">
                <PlayerItem
                :name="player.person.fullName" 
                :number="player.jerseyNumber"
                :position="player.position.name"
                />
            </a>
        </div>
        <div v-for="player in dMen" :key="player.jerseyNumber" class="col-sm-2 playerItem">
            <a :href="/player/+player.person.id">
                <PlayerItem
                :name="player.person.fullName" 
                :number="player.jerseyNumber"
                :position="player.position.name"
                />
            </a>
        </div>
        <div v-for="player in goalies" :key="player.jerseyNumber" class="col-sm-2 playerItem">
            <a :href="/player/+player.person.id">
                <PlayerItem
                :name="player.person.fullName" 
                :number="player.jerseyNumber"
                :position="player.position.name"
                />
            </a>
        </div>
    </div>
</div>
</template>

<script>
import PlayerItem from './PlayerItem';

export default {
    components: {
        PlayerItem
    },
    props: {
        teamId: null
    },
    data() {
        return {
            
            headers: ['Name', '#', 'Position'],
            jsonRoster: null,
            roster: Array(),
            centers: Array(),
            lWingers: Array(),
            rWingers: Array(),
            dMen: Array(),
            goalies: Array()
        }
    },
    watch: {
        jsonRoster(newData) {
            this.parseJsonRoster(newData);
        }
    },
    mounted() {
        this.getJsonRoster();
    },
    methods: {
        getJsonRoster() {
            let url = 'https://statsapi.web.nhl.com/api/v1/teams/';
            url += this.teamId + '?expand=team.roster';

            this.axios.get(url).then((response) => {
                this.jsonRoster = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonRoster(json) {
            this.roster = json.teams[0].roster.roster;
            this.roster.forEach((player) => {
                if(player.position.name == 'Center') {
                    this.centers.push(player);
                } else if(player.position.name == 'Left Wing') {
                    this.lWingers.push(player);
                } else if(player.position.name == 'Right Wing') {
                    this.rWingers.push(player);
                } else if(player.position.name == 'Defenseman') {
                    this.dMen.push(player);
                } else if(player.position.name == 'Goalie') {
                    this.goalies.push(player);
                }
            });
        }
    }
};
</script>

<style scoped>
@import '../css/table.css';

a, a:hover {
    text-decoration: none;
}
.playerItem {
    max-width: 12em;
}
</style>
