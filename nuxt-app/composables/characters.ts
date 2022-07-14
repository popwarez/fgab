export function useCharacters() {
    
    const supabase = useSupabaseClient();
    const characters = ref<Character[]>([]);
    

    // create characters
    class Character {
      name: string;
      strength: number;
      position: number;
      constructor(name: string, strength: number, position: number) {
        this.name = name;
        this.strength = strength;
        this.position = position;
      }
    }
    
    const addCharacter = (name, strength, position) => {
      characters.value.push(new Character(name, strength, position));
    };

    // subscribe in one function/ call, because multiple funktions to subscribe override each other

    const subscribeRealtime = async () => {
        await supabase.from("characters")
        .on('INSERT' , character => {
            console.log('NEW',character)
            addCharacter(character.new.name, character.new.strength, character.new.position)
        })
        .on('DELETE' , character => {
            console.log('OLD',character)
            characters.value.splice((characters.value.findIndex(char => char.name === character.old.name)), 1)
        })
        .on('UPDATE', character => {
            console.log('UPDATE', character)
            characters.value[(characters.value.findIndex(char => char.name === character.old.name))] = character.new
        })
        .subscribe()
    }

    // remember to remove the subscriptions

    const removeAllSubscriptions =async () => {
        await supabase.removeAllSubscriptions()
    }
    

    // manual calls to change stuff

    const getCharacters = async () => {
        const {data} = await supabase
        .from("characters")
        .select("name, strength, position");
        data.forEach(character => addCharacter(character.name, character.strength, character.position))
    }

    const createCharacter = async (name:string, strength:number ) => {
        const {data} = await supabase.from("characters").insert([
            { name: name, strength: strength, position: 0 }
          ])
          return data
    }

    const updateCharacterStrength = async (strength:number, name:string) => {
        const {data} = await supabase
        .from("characters")
        .update({strength: strength})
        .match({name: name})
        return data
    }

    const updateCharacterPosition = async (position:number, name:string) => {
        const {data} = await supabase
        .from("characters")
        .update({position: position})
        .match({name: name})
        return data
    }
    
    const deleteCharacter = async (name:string) => {
        const {data} = await supabase.from("characters").delete().match({name: name})
    }

    onMounted(() => { getCharacters(),  subscribeRealtime() })
    onUnmounted(() => { removeAllSubscriptions })

    
    return { characters, createCharacter , deleteCharacter, updateCharacterStrength, updateCharacterPosition}
    
}