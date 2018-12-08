<template>
<table class="table table-sm">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="player in roster">
            <td>{{ player.person.fullName }}</td>
            <td>{{ player.jerseyNumber }}</td>
            <td>{{ player.position.name }}</td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        teamId: null
    },
    data() {
        return {
            
            headers: ['Name', '#', 'Position'],
            jsonRoster: null,
            roster: Array()
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
        }
    }
};
</script>

<style scoped>
@import '../css/table.css';
</style>
