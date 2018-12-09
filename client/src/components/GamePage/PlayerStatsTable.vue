<template>
<div v-if="!Object.keys(awayPlayers).length == 0 && !Object.keys(homePlayers).length == 0">
    <div class="row">
        <!-- Away -->
        <div class="col-sm-6">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th v-for="header in skaterStatsTableHeadings">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in awayPlayersByName"
                    v-if="player.stats.skaterStats" :key="player.person.id">
                        <td>{{ player.person.fullName }}</td>
                        <td>{{ player.stats.skaterStats.timeOnIce }}</td>
                        <td>{{ player.stats.skaterStats.goals }}</td>
                        <td>{{ player.stats.skaterStats.assists }}</td>
                        <td>{{ player.stats.skaterStats.shots }}</td>
                        <td v-if="player.stats.skaterStats.plusMinus > 0">
                            +{{ player.stats.skaterStats.plusMinus }}
                        </td>
                        <td v-else>{{ player.stats.skaterStats.plusMinus }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th v-for="header in goalieStatsTableHeadings">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in awayPlayersByName"
                    v-if="player.stats.goalieStats && player.stats.goalieStats.timeOnIce != '0:00'"
                    :key="player.person.id">
                        <td>{{ player.person.fullName }}</td>
                        <td>{{ player.stats.goalieStats.timeOnIce }}</td>
                        <td>{{ player.stats.goalieStats.shots }}</td>
                        <td>{{ player.stats.goalieStats.saves }}</td>
                        <td v-text="(player.stats.goalieStats.savePercentage/100).toFixed(3)"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Home -->
        <div class="col-sm-6">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th v-for="header in skaterStatsTableHeadings">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in homePlayersByName"
                    v-if="player.stats.skaterStats" :key="player.person.id">
                        <td>{{ player.person.fullName }}</td>
                        <td>{{ player.stats.skaterStats.timeOnIce }}</td>
                        <td>{{ player.stats.skaterStats.goals }}</td>
                        <td>{{ player.stats.skaterStats.assists }}</td>
                        <td>{{ player.stats.skaterStats.shots }}</td>
                        <td v-if="player.stats.skaterStats.plusMinus > 0">
                            +{{ player.stats.skaterStats.plusMinus }}
                        </td>
                        <td v-else>{{ player.stats.skaterStats.plusMinus }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th v-for="header in goalieStatsTableHeadings">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in homePlayersByName"
                    v-if="player.stats.goalieStats && player.stats.goalieStats.timeOnIce != '0:00'"
                    :key="player.person.id">
                        <td>{{ player.person.fullName }}</td>
                        <td>{{ player.stats.goalieStats.timeOnIce }}</td>
                        <td>{{ player.stats.goalieStats.shots }}</td>
                        <td>{{ player.stats.goalieStats.saves }}</td>
                        <td v-text="(player.stats.goalieStats.savePercentage/100).toFixed(3)"></td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            gameStatsTableHeadings: [
                'Team', 'G', 'PIM', 'Shots', 'PP%', 'PPG', 'PPO', 'FO%', 'Hits'
            ],
            skaterStatsTableHeadings: [
                'Name', 'TOI', 'G', 'A', 'S', '+/-'
            ],
            goalieStatsTableHeadings: [
                'Name', 'TOI', 'SA', 'SV', 'SV%'
            ],

            awayPlayers: Object(),
            homePlayers: Object()
        }
    },
    computed: {
        awayPlayersByName() {
            function compare(a, b) {
                return b.person.fullName < a.person.fullName ? 1 : -1;
            }
            return this.awayPlayers.sort(compare);
        },
        homePlayersByName() {
            function compare(a, b) {
                return b.person.fullName < a.person.fullName ? 1 : -1;
            }
            return this.homePlayers.sort(compare);
        }
    },
    mounted() {
        this.awayPlayers = this.gameData.awayPlayers;
        this.homePlayers = this.gameData.homePlayers;
    }
};
</script>

<style scoped>
@import '../css/table.css';
</style>
