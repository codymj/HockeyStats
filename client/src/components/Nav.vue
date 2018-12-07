<template>
    <nav class="navbar navbar-expand-md">
        <a class="navbar-brand" href="/"><b>HockeyStats</b></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <!-- <ul class="navbar-nav mr-auto">
                <li v-for="link in links" class="nav-item">
                    <a class="nav-link" :href="link.href">{{ link.text }}</a>
                </li>
            </ul> -->
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { id: 0, text: 'Link0', href: '#' },
                { id: 1, text: 'Link1', href: '#' },
                { id: 2, text: 'Link2', href: '#' }
            ]
        }
    }
};
</script>

<style>
.navbar {
    background-color: #202020;
    color: #ffffff;
    margin-bottom: 2em;
}
.navbar a {
    color: #fff;
}
.navbar a:hover {
    color: #c0c0c0;
}
</style>
