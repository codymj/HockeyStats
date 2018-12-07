<template>
<StandingsItemTable :standingType="standingType" :standingData="standingData" />
</template>

<script>
import StandingsItemTable from './StandingsItemTable';

export default {
    components: {
        StandingsItemTable
    },
    props: {
        standingType: null
    },
    data() {
        return {
            jsonData: null,
            divisions: ['Pacific', 'Central', 'Metropolitan', 'Atlantic'],
            conferences: ['Western', 'Eastern'],
            standingData: null
        }
    },
    watch: {
        jsonData(newData) {
            this.parseJsonData();
        }
    },
    mounted() {
        this.getJsonData();
    },
    methods: {
        getJsonData() {
            let url = 'https://statsapi.web.nhl.com/api/v1/standings/';

            if(this.divisions.includes(this.standingType)) {
                url += 'byDivision';
            } else if(this.conferences.includes(this.standingType)) {
                url += 'byConference';
            }
            this.axios.get(url).then((response) => {
                this.jsonData = response.data.records;
            }).catch((error) => {
                console.log(error.message);
            });
        },
        parseJsonData() {
            if(this.standingType == 'Pacific') {
                this.standingData = this.jsonData[3].teamRecords;
            } else if(this.standingType == 'Central') {
                this.standingData = this.jsonData[2].teamRecords;
            } else if(this.standingType == 'Metropolitan') {
                this.standingData = this.jsonData[0].teamRecords;
            } else if(this.standingType == 'Atlantic') {
                this.standingData = this.jsonData[1].teamRecords;
            } else if(this.standingType == 'Western') {
                this.standingData = this.jsonData[1].teamRecords;
            } else if(this.standingType == 'Eastern') {
                this.standingData = this.jsonData[0].teamRecords;
            } else {
                console.log('Error: Undefined standings data');
            }
        }
    }
};
</script>
