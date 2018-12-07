<template>
<div v-if="gameData" class="row">
    <div class="col-sm-12">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th v-for="header in milestonesTableHeadings">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="milestone in gameData.gameMilestones" :key="milestone.timeAbsolute">
                    <td v-if="milestone.teamId">{{ idToAbbr[milestone.teamId] }}</td>
                    <td v-else>---</td>
                    <td>{{ milestone.title }}</td>
                    <td>{{ milestone.description }}</td>
                    <td>{{ milestone.ordinalNum }}</td>
                    <td>{{ milestone.periodTime }}</td>
                    <td v-if="milestone.highlight.playbacks" id="highlight">
                        <a :href="milestone.highlight.playbacks[9].url" target="_blank">
                            &#9654;
                        </a>
                    </td>
                    <td v-else>&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    props: {
        gameData: null
    },
    data() {
        return {
            idToAbbr: {
                1: 'NJD', 2: 'NYI', 3: 'NYR', 4: 'PHI', 5: 'PIT', 6: 'BOS',
                7: 'BUF', 8: 'MTL', 9: 'OTT', 10: 'TOR', 12: 'CAR',
                13: 'FLA', 14: 'TBL', 15: 'WSH', 16: 'CHI', 17: 'DET',
                18: 'NSH', 19: 'STL', 20: 'CGY', 21: 'COL', 22: 'EDM',
                23: 'VAN', 24: 'ANA', 25: 'DAL', 26: 'LAK', 28: 'SJS',
                29: 'CBJ', 30: 'MIN', 52: 'WPG', 53: 'ARI', 54: 'VKG'
            },
            milestonesTableHeadings: [
                'Team', 'Title', 'Description', 'Period', 'Time', 'Highlight'
            ]
        }
    }
};
</script>

<style scoped>
@import '../css/table.css';

#highlight {
    padding-left: 2em;
}
</style>
