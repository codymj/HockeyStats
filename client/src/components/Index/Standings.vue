<template>
<div>
    <!-- Heading -->
    <!-- <div>
        <button @click="toggleStandingsVisible" 
        type="button" class="btn float-right">
            -
        </button>
        <select v-model="standingsMode" class="custom-select float-right">
            <option v-for="mode in standingsModes" :value="mode.key">
                {{ mode.text }}
            </option>
        </select>
        <h5 class="card-title font-weight-bold">Standings</h5>
        <hr />
    </div> -->

    <!-- Standings -->
    <div v-if="standingsVisible">
        <div v-if="standingsMode == 'divisions'" class="row">
            <div v-for="division in divisions" :key="division" class="col-sm">
                <StandingsItem :standingType="division" />
            </div>
        </div>
        <!-- <div v-if="standingsMode == 'conferences'" class="row">
            <div v-for="conference in conferences" :key="conference" class="col-sm">
                <StandingsItem :standingType="conference" />
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
import StandingsItem from './StandingsItem';

export default {
    components: {
        StandingsItem
    },
    props: {
        
    },
    data() {
        return {
            standingsVisible: true,
            standingsMode: 'divisions',
            standingsModes: [
                { key: 'divisions', text: 'Divisions' },
                { key: 'conferences', text: 'Conferences' }
            ],
            divisions: ['Pacific', 'Central', 'Metropolitan', 'Atlantic'],
            conferences: ['Western', 'Eastern'],
        }
    },
    mounted() {
        
    },
    watch: {
        standingsMode(newMode) {
            if(newMode) {
                this.standingsMode = newMode;
            }
            else {
                this.standingsMode = 'divisions';
            }
        }
    },
    methods: {
        toggleStandingsVisible() {
            this.standingsVisible = this.standingsVisible ? false : true;
        }
    }
};
</script>

<style scoped>

</style>
