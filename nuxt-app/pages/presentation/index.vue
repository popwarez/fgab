<template>
  <div class="map">
    <div v-for="(char, index) in characters" :key="index" class="lane">
      <div
        class="char"
        :style="`grid-row: ${char.position}`"
        v-if="char.position > 0"
      >
        {{ char.name }}
      </div>
      <div
        v-for="(boss, index) in bosses"
        :key="index"
        class="boss"
        :style="`grid-row: ${boss.pos}`"
      >
        <span v-if="boss.pos !== char.position">{{ boss.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import mockBosses from "@/public/mockBosses";
const { characters } = useCharacters();
const bosses = mockBosses;
</script>

<style lang="scss" scoped>
.map {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-gap: 20px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;

  .lane {
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    grid-template-columns: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;
    grid-row-gap: 20px;
    background: var(--gray);
    padding: 20px;

    .char {
      display: flex;
      justify-content: center;
      align-items: center;
      justify-self: center;
      height: 100%;
      color: #000;
      box-sizing: border-box;
      background: var(--purple);
      border-radius: 20px;
      border: 10px solid var(--gold);
      color: #fff;
      width: 100%;
    }

    .boss {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      justify-self: center;
      width: 100%;
      height: 100%;
      background: var(--red);
      border-radius: 20px;
    }
  }
}
</style>
