<template>
<div>
    <Standings />
    <br>
    <Scores />
    <br>
</div>
</template>

<script>
import Standings from './Index/Standings';
import Scores from './Index/Scores';

export default {
    components: { Standings, Scores },
    props: []
};
</script>

<style>
body {
    min-height:100%;
    position:relative;
}
.card-body {
    background-color: #f0f0f0;
    padding-bottom: 4px;
    border: 1px solid #000;
}
.btn {
    background-color: #202020;
    color: #fff;
    margin-left: 10px;
    margin-bottom: 10px;
    outline: none !important;
    border: none !important;
    box-shadow: none !important
}
hr { 
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    border-width: 1px;
} 
.custom-select, option {
    background-color: #202020;
    color: #fff;
    width: 130px;
    outline: none !important;
    border: none !important;
    box-shadow: none !important
}
option:hover {
    background-color: #303030;
    color: #fff;
}
</style>
