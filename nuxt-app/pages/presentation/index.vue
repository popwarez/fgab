<template>
  <div
    class="map"
    :style="`grid-template-columns: repeat(${characters.length + 1}, ${
      100 / characters.length
    }%)`"
  >
    <div
      v-for="(char, index) in characters"
      :key="index"
      class="lane"
      :style="`grid-template-rows: repeat(${bosses.length + 2}, ${
        100 / (bosses.length + 2)
      }%)`"
    >
      <div class="lane-start" :class="char.position === 0 ? 'char' : ''">
        <div v-if="char.position === 0">
          <img :src="`/public/assets/heroe_tokens/${index + 1}.png`" />
          <div>{{ char.name }}</div>
        </div>
      </div>
      <div
        class="char"
        :style="`grid-row: ${char.position + 1}`"
        v-if="char.position > 0"
      >
        <img :src="`/public/assets/heroe_tokens/${index + 1}.png`" />
        <div>{{ char.name }}</div>
      </div>
      <div
        v-for="(boss, index) in bosses"
        :key="index"
        class="boss"
        :style="`grid-row: ${boss.position + 1}`"
      >
        <img
          v-if="boss.position !== char.position"
          :src="`/public/assets/monster_tokens/monster_${index + 1}.png`"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { characters } = useCharacters();
const { bosses } = useBosses();
const { showWinMessageComp, setShowWinMessage, winner } = useGameLogic();
</script>

<style lang="scss" scoped>
.map {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 100%;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .lane {
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
    box-sizing: border-box;
    background: url(@/public/assets/images/full_road.png);
    background-size: cover;

    &:nth-child(even) {
      background: url(@/public/assets/images/full_road_mirror.png);
      background-size: cover;
    }

    .lane-start {
      grid-row: 1;
      height: 100%;
      background: url(@/public/assets/images/Ruined-Keep-Battle-Map-Forest-Glade-Preview.jpg)
        center center;
      background-size: contain;

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        > img {
          aspect-ratio: 1/1;
          height: 35%;
          -o-object-fit: scale-down;
          object-fit: scale-down;
        }
      }
    }

    .char {
      display: flex;
      justify-content: center;
      align-items: center;
      justify-self: center;
      height: 100%;
      color: #000;
      box-sizing: border-box;
      color: #fff;
      width: 100%;
      flex-flow: column nowrap;

      > img {
        object-fit: scale-down;
        height: 35%;
        aspect-ratio: 1 / 1;
      }
    }

    .boss {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      justify-self: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
