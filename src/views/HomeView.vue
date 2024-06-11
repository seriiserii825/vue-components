<script setup>
import Block from "../components/globals/Block.vue";
</script>
<template>
  <main class="home">
    <transition appear>
      <Block
          title="Evento list"
      >
        <ul class="home__list">
          <li>
            <router-link to="/evento/status1/dettaglio/info?code=R23BZS">Main event(Teacher)</router-link>
          </li>
          <li>
            <router-link to="/evento/status1/dettaglio/info?code=D23UUU">Main event(Student)</router-link>
          </li>
          <hr>
          <li>
            <router-link to="/event/status1/contenuto/62/info?code=R23VAS">Session content(Teacher)</router-link>
          </li>
          <li>
            <router-link to="/event/status1/contenuto/62/discenti/info?code=D23YTG">Session content(Student)</router-link>
          </li>
          <hr>
          <li>
            <router-link to="/evento/status1">Public status1(need login)</router-link>
          </li>
          <hr>
          <li>
            <router-link to="/evento/unpublished">unpublished</router-link>
          </li>
          <li>
            <router-link to="/evento/status0">Public status0 - Terminato</router-link>
          </li>
          <li>
            <router-link to="/evento/status2">Public status2(Will start)</router-link>
          </li>
          <li>
            <router-link to="/evento/status1/repository">Public repository</router-link>
          </li>
          <li>
            <router-link to="/contenuto/16">Contenuto 16</router-link>
          </li>
        </ul>
      </Block>
    </transition>
  </main>
</template>
<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .block {
    width: 80rem;
    a {
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
  }
  &__list {
    li {
      margin-bottom: 2rem;
    }
  }
}
</style>