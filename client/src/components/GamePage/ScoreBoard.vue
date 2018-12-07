<template>
<div v-if="gameData">
    <div class="row justify-content-center">
        <div class="col"></div>
        <div class="col text-center">
            <h3><strong>{{ gameData.awayTeam }}</strong></h3>
            <transition name="fade" mode="out-in">
                <h2 :key="gameData.awayScore"><strong>{{ gameData.awayScore }}</strong></h2>
            </transition>
        </div>
        <div class="col text-center">
            <div v-if="gameData.inIntermission">
                <h5><strong>{{ gameData.periodOrdinal }}</strong></h5>
                <p><strong>Intermission</strong></p>
            </div>
            <div v-else>
                <h5><strong>{{ gameData.periodOrdinal }}</strong></h5>
                <transition name="fade" mode="out-in">
                    <h5 :key="gameData.periodTimeRemaining"><strong>{{ gameData.periodTimeRemaining }}</strong></h5>
                </transition>
            </div>
        </div>
        <div class="col text-center">
            <h3><strong>{{ gameData.homeTeam }}</strong></h3>
            <transition name="fade" mode="out-in">
                <h2 key="gameData.homeScore"><strong>{{ gameData.homeScore }}</strong></h2>
            </transition>
        </div>
        <div class="col"></div>
    </div>
    <br>
    <div class="row justify-content-center">
        <div class="col"></div>
        <div class="col text-center">
            <h5>{{ gameData.awayStats.shots }}</h5>
            <h5>{{ gameData.awayStats.hits }}</h5>
            <h5>{{ gameData.awayStats.powerPlayGoals }} / {{ gameData.awayStats.powerPlayOpportunities }}</h5>
            <h5>{{ gameData.awayStats.pim }}</h5>
            <h5>{{ gameData.awayStats.faceOffWinPercentage }}</h5>
        </div>
        <div class="col text-center">
            <h5>Shots</h5>
            <h5>Hits</h5>
            <h5>PP</h5>
            <h5>PIM</h5>
            <h5>FO%</h5>
        </div>
        <div class="col text-center">
            <h5>{{ gameData.homeStats.shots }}</h5>
            <h5>{{ gameData.homeStats.hits }}</h5>
            <h5>{{ gameData.homeStats.powerPlayGoals }} / {{ gameData.homeStats.powerPlayOpportunities }}</h5>
            <h5>{{ gameData.homeStats.pim }}</h5>
            <h5>{{ gameData.homeStats.faceOffWinPercentage }}</h5>
        </div>
        <div class="col"></div>
    </div>
    <br>
    <div v-if="gameData.threeStars" class="row justify-content-center">
        <div class="col"></div>
        <div class="col text-center">
            <h5>&#9733;</h5>
            <h5>{{ gameData.threeStars.firstStar }}</h5>
        </div>
        <div class="col text-center">
            <h5>&#9733;&#9733;</h5>
            <h5>{{ gameData.threeStars.secondStar }}</h5>
        </div>
        <div class="col text-center">
            <h5>&#9733;&#9733;&#9733;</h5>
            <h5>{{ gameData.threeStars.thirdStar }}</h5>
        </div>
        <div class="col"></div>
    </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        gameData: null
    },
    data() {
        return {
            intermissionTimeRemaining: null
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style>
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.5s;
}
.fade-leave {
    
}
.fade-leave-active {
    transition: opacity 0.5s;
    opacity: 0;
}
</style>