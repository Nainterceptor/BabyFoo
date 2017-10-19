<template>
    <div>
        <nav>
            <nuxt-link to="/" class="brand"><span>Babyfoo</span></nuxt-link>
            <div class="menu">
                <nuxt-link to="/users" class="pseudo button">Users</nuxt-link>
                <nuxt-link to="/scores" class="pseudo button">Scores</nuxt-link>
                <nuxt-link to="/statistics" class="pseudo button">Statistics</nuxt-link>
            </div>
        </nav>
        <nuxt class="body"/>
    </div>
</template>
