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
      <button @click="fightBossEvent(char)">FIGHT!!!!</button>
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
  updateCharacterPosition,
} = useCharacters();

const { bosses } = useBosses();
console.log(bosses.value.length);

const { fightBoss, setShowWinMessage, setWinner } = useGameLogic();

const fightBossEvent = async (character) => {
  const nextCharPosition = character.position + 1;
  const nextBoss = bosses.value.find(
    (boss) => boss.position === nextCharPosition
  );
  if (nextBoss) {
    if (fightBoss(character, nextBoss)) {
      await updateCharacterPosition(nextCharPosition, character.name);
    }
  } else {
    console.log("win");
    setShowWinMessage(true);
    setWinner(character.name);
  }
};
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
