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

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
