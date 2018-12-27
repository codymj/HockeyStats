<template>
<div class="row">
<table class="table table-sm">
    <thead>
        <tr>
            <th>P</th>
            <th>P%/G</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ stats[0].stat.pts }}</td>
            <td>{{ parseFloat(stats[0].stat.ptPctg).toFixed(2) }}</td>
        </tr>
        <tr>
            <td>{{ stats[1].stat.pts }}</td>
            <td>{{ stats[1].stat.ptPctg }}</td>
        </tr>
    </tbody>
</table>
<table class="table table-sm">
    <thead>
        <tr>
            <th>GF/G</th>
            <th>GA/G</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ parseFloat(stats[0].stat.goalsPerGame).toFixed(2) }}</td>
            <td>{{ parseFloat(stats[0].stat.goalsAgainstPerGame).toFixed(2) }}</td>
        </tr>
        <tr>
            <td>{{ stats[1].stat.goalsPerGame }}</td>
            <td>{{ stats[1].stat.goalsAgainstPerGame }}</td>
        </tr>
    </tbody>
</table>
<table class="table table-sm">
    <thead>
        <tr>
            <th>PP%</th>
            <th>PK%</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ parseFloat(stats[0].stat.powerPlayPercentage).toFixed(2) }}</td>
            <td>{{ stats[0].stat.penaltyKillPercentage }}</td>
        </tr>
        <tr>
            <td>{{ stats[1].stat.powerPlayPercentage }}</td>
            <td>{{ stats[1].stat.penaltyKillPercentage }}</td>
        </tr>
    </tbody>
</table>
<table class="table table-sm">
    <thead>
        <tr>
            <th>SF/G</th>
            <th>SA/G</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ parseFloat(stats[0].stat.shotsPerGame).toFixed(2) }}</td>
            <td>{{ parseFloat(stats[0].stat.shotsAllowed).toFixed(2) }}</td>
        </tr>
        <tr>
            <td>{{ stats[1].stat.shotsPerGame }}</td>
            <td>{{ stats[1].stat.shotsAllowed }}</td>
        </tr>
    </tbody>
</table>
<table class="table table-sm">
    <thead>
        <tr>
            <th>FO%</th>
            <th>S%</th>
            <th>SV%</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ parseFloat(stats[0].stat.faceOffWinPercentage).toFixed(2) }}</td>
            <td>{{ parseFloat(stats[0].stat.shootingPctg).toFixed(2) }}</td>
            <td>{{ parseFloat(stats[0].stat.savePctg).toFixed(3) }}</td>
        </tr>
        <tr>
            <td>{{ stats[1].stat.faceOffWinPercentage }}</td>
            <td>{{ stats[1].stat.shootingPctRank }}</td>
            <td>{{ stats[1].stat.savePctRank }}</td>
        </tr>
    </tbody>
</table>
</div>
</template>

<script>
export default {
    props: {
        stats: null
    },
    data() {
        return {
            headers: [
                '', 'P', 'P%/G', 'GF/G', 'GA/G', 'PP%', 'PK%', 'SF/G', 'SA/G', 
                'FOW%', 'S%', 'SV%'
            ]
        }
    },
    watch: {
        
    },
    mounted() {
        
    },
    methods: {
        
    }
};
</script>

<style scoped>
@import '../css/table.css';

table th, td {
    width: 3em;
}
table tr {
    text-align: center;
}
</style>
