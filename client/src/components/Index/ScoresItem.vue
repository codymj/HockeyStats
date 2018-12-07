<template>
<div>
    <h5><strong>{{ dateToLabel(date.date) }}</strong></h5>
    <div class="row">
        <div v-for="game in dataMap" :key="game[0].gamePk" class="col-sm-2 scoresItem">
            <ScoresItemTable v-if="game" :date="date.date" :game="game" />
        </div>
    </div>
</div>
</template>

<script>
import ScoresItemTable from './ScoresItemTable';
import moment from 'moment';

export default {
    components: {
        ScoresItemTable
    },
    props: {
        date: null
    },
    data() {
        return {
            games: null,
            linescores: null,
            dataMap: null
        }
    },
    mounted() {
        this.setScheduleData();
    },
    created() {
        this.interval = setInterval(() => this.getLinescores(), 15000);
    },
    watch: {
        games(newData) {
            this.getLinescores(newData);
        },
        linescores(newData) {
            this.dataMap = Array();
            for(let i=0; i<newData.length; i++) {
                this.dataMap.push(Array(this.games[i], this.linescores[i]));
            }
        }
    },
    methods: {
        setScheduleData() {
            this.games = this.date.games;
        },
        getLinescores() {
            let urls = Array();

            this.games.forEach((game) => {
                urls.push('https://statsapi.web.nhl.com/api/v1/game/'+game.gamePk+'/linescore')
            });
            let promiseArray = urls.map(url => this.axios.get(url));

            this.axios.all(promiseArray).then((response) => {
                this.linescores = response.map(r => r.data);
            });
        },
        dateToLabel(date) {
            if(date == moment().subtract(1, 'days').format('YYYY-MM-DD')) {
                return 'Yesterday';
            } else if(date == moment().format('YYYY-MM-DD')) {
                return 'Today';
            } else if (date == moment().add(1, 'days').format('YYYY-MM-DD')) {
                return 'Tomorrow';
            } else {
                return moment(date).format('dddd M-D');
            }
        }
    }
};
</script>

<style scoped>
p {
    font-weight: bold;
}
.scoresItem {
    max-width: 10em;
}
</style>
