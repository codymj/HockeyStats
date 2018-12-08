<template>
<div>
    <Nav />
    <div class="container">
        <router-view />
    </div>
    <Footer />
</div>
</template>

<script>
import Nav from './components/Nav';
import Footer from './components/Footer';

export default {
    name: 'App',
    components: { Nav, Footer },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=IBM+Plex+Mono);
@import url(https://fonts.googleapis.com/css?family=Exo+2);

body {
    font-family: 'Exo 2', sans-serif;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
    width: 15px;
}
::-webkit-scrollbar-track {
    background: #f0f0f0; 
}
::-webkit-scrollbar-thumb {
    background: #202020; 
}
::-webkit-scrollbar-thumb:hover {
    background: #303030; 
}
</style>
