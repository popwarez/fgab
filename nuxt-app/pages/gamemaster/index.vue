<template>
  <div class="gm-overview">
    <div v-for="(char, index) in characters" :key="index" class="char">
      <h1>{{ char.name }}</h1>
      <div>
        <h1 @click="updateCharacterStrength((char.strength -= 5), char.name)">
          --
        </h1>
        <h3>{{ char.strength }}</h3>
        <h1 @click="updateCharacterStrength((char.strength += 5), char.name)">
          ++
        </h1>
      </div>
      <button @click="deleteCharacter(char.name)">delete</button>
    </div>
    <div class="char-input">
      <label for="char-name-input">Name:</label>
      <input v-model="characterName" type="text" id="char-name-input" />
      <label for="char-strength-input">Strength:</label>
      <input
        v-model="characterStrength"
        type="number"
        id="char-strength-input"
      />
      <button @click="createCharacter(characterName, characterStrength)">
        add char
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const characterName = ref<string>("");
const characterStrength = ref<number>(0);
const {
  characters,
  createCharacter,
  deleteCharacter,
  updateCharacterStrength,
} = useCharacters();
</script>

<style lang="scss" scoped>
.gm-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-auto-rows: auto;
  grid-gap: 10px;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;

  .char-input {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 200px;
    aspect-ratio: 1 / 1.5;
    background: var(--gray);
    color: #fff;

    input {
      margin: 0 0 20px 0;
    }
  }

  .char {
    display: grid;
    grid-template-rows: auto auto auto;
    width: 200px;
    aspect-ratio: 1 / 1.5;
    background: var(--gray);
    color: #fff;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 20px;
  }
}
</style>
