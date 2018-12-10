<template>
<table class="table table-sm">
    <thead>
        <tr>
            <th id="number">#{{ number }}</th>
        </tr>
        <tr>
            <th>{{ name }}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ position }}</td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        name: null,
        number: null,
        position: null
    }
};
</script>

<style scoped>
@import '../css/table.css';

#number {
    border-bottom: none;
}

table tr {
    text-align: center;
}
</style>