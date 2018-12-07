<template>
    <div>
        <!-- Heading -->
        <div>
            <button @click="toggleTableVisibility" type="button" class="btn float-right">-</button>
            <h5 class="card-title font-weight-bold">Team Statistics</h5>
            <hr />
        </div>

        <!-- Teams Table -->
        <table v-if="teamsTableVisible" class="table table-sm text-monospace teamsTable">
            <thead>
                <tr>
                    <th v-for="header in headers">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in teams">
                    <td><b><a :href="team.abbreviation">{{ team.abbreviation }}</a></b></td>
                    <td>{{ team.gamesPlayed }}</td>
                    <td>{{ team.wins }}</td>
                    <td>{{ team.losses }}</td>
                    <td>{{ team.ot }}</td>
                    <td><b>{{ team.pts }}</b></td>
                    <td>{{ team.row }}</td>
                    <td v-text="team.ptPctg.toFixed(1)"></td>
                    <td v-text="team.goalsPerGame.toFixed(2)"></td>
                    <td v-text="team.goalsAgainstPerGame.toFixed(2)"></td>
                    <td v-text="team.powerPlayPercentage.toFixed(1)"></td>
                    <td v-text="team.penaltyKillPercentage.toFixed(1)"></td>
                    <td v-text="team.shotsPerGame.toFixed(2)"></td>
                    <td v-text="team.shotsAllowed.toFixed(2)"></td>
                    <td v-text="team.faceOffWinPercentage.toFixed(1)"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        
    },
    data() {
        return {
            teams: [],
            headers: [
                'Team', 'GP', 'W', 'L', 'OT', 'P', /*'ROW',*/ 'P%', 'GF/G', 'GA/G',
                'PP%', 'PK%', 'SF/G', 'SA/G', 'FOW%'
            ],
            teamsTableVisible: true
        }
    },
    mounted() {
        if(localStorage.getItem('teams')) {
            this.teams = JSON.parse(localStorage.getItem('teams'))
        } else {
            this.getTeams();
        }
    },
    watch: {
        teams(newData) {
            localStorage.setItem('teams', JSON.stringify(newData));
        }
    },
    methods: {
        toggleTableVisibility() {
            this.teamsTableVisible = this.teamsTableVisible ? false : true;
        },
        getTeams() {
            this.axios.get('api/team').then((response) => {
                this.teams = response.data;
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }
};
</script>

<style>
    .teamsTable thead, tbody {
        display: block;
    }
    .teamsTable tbody {
        height: 20em;
        overflow-y: scroll;
    }
    .teamsTable thead {
        margin-right: 15px;
    }
    .teamsTable td, th {
        background-color: #202020;
        color: #fff;
        border-top: none !important;
        width: 5em;
    }
    .teamsTable tr td a {
        color: #fff;
    }
    .teamsTable tr td a:hover {
        color: #c0c0c0;
    }
    .teamsTable tr:nth-child(even) td {
        background-color: #303030;
    }
</style>