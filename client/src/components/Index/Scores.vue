<template>
<div>
    <!-- Heading -->
    <!-- <div>
        <button @click="toggleScores" type="button" class="btn float-right">-</button>
        <h5 class="card-title font-weight-bold">Scores</h5>
        <hr />
    </div>
 -->
    <!-- ScoresItems -->
    <div v-if="scoresVisible">
        <ScoresItem v-for="date in dates" :date="date" :key="date.date" />
    </div>
</div>
</template>

<script>
import moment from 'moment';
import ScoresItem from './ScoresItem';

export default {
    components: {
        ScoresItem
    },
    data() {
        return {
            startDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
            dates: null,
            scoresVisible: true
        }
    },
    mounted() {
        this.getScheduleData();
    },
    methods: {
        getScheduleData() {
            let url = 'https://statsapi.web.nhl.com/api/v1/schedule';
            url += '?startDate=' + this.startDate + '&endDate=' + this.endDate;

            this.axios.get(url).then((response) => {
                this.dates = response.data.dates;
                this.dates = this.dates.slice().reverse();
            }).catch((error) => {
                console.log(error.message);
            });
        },
        toggleScores() {
            this.scoresVisible = this.scoresVisible ? false : true;
        }
    }
};
</script>

<style scoped>

</style>
