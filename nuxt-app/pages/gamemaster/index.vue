<template>
  <div>
    <div v-for="(char, index) in characters" :key="index">
      {{ char.characterName }} + {{ char.characterStrength }}
    </div>
    <button @click="addCharacter('tobi', 10)">add char</button>
  </div>
</template>

<script setup lang="ts">
class Character {
  characterName: string;
  characterStrength: number;
  constructor(name: string, strength: number) {
    this.characterName = name;
    this.characterStrength = strength;
  }
}

const characters = ref<Character[]>([]);

const addCharacter = (name, strength) => {
  characters.value.push(new Character(name, strength));
};
</script>
