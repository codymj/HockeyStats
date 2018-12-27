<template>
<table class="table table-sm">
    <thead>
        <tr>
            <td class="text-center" :colspan="headers.length">
                <b>{{ standingType }}</b>
            </td>
        </tr>
        <tr>
           <th v-for="header in headers">{{ header }}</th> 
        </tr>
    </thead>
    <tbody>
        <tr v-for="team in standingData">
            <td><b><a :href="idToAbbr[team.team.id]">{{ idToAbbr[team.team.id] }}</a></b></td>
            <td>{{ team.gamesPlayed }}</td>
            <td>{{ team.leagueRecord.wins }}</td>
            <td>{{ team.leagueRecord.losses }}</td>
            <td>{{ team.leagueRecord.ot }}</td>
            <td><b>{{ team.points }}</b></td>
            <td><b>{{ team.streak.streakCode }}</b></td>
        </tr>
        <tr v-if="standingType == 'Central' || standingType == 'Western'">
            <td>---</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        standingType: null,
        standingData: null
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
            headers: ['Team', 'GP', 'W', 'L', 'OT', 'P', 'STK']
        }
    }
};
</script>

<style scoped>
@import '../css/table.css';

td, th {
    text-align: center;
}
</style>
