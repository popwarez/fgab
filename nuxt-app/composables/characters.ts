export function useCharacters() {
    
    const client = useSupabaseClient();
    const characters = ref<Character[]>([]);
    
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

    // In einer subscription handeln weil sich subscriptions onst gegenseitig ueberschreiben

    const subscribeRealtime = async () => {
        await client.from("characters")
        .on( 'INSERT' , character => {
            console.log('NEW',character.new)
            addCharacter(character.new.name, character.new.strength, character.new.position)
        })
        .on( 'DELETE' , character => {
            console.log('OLD',character.old)
            characters.value.splice((characters.value.findIndex(char => char.name === character.old.name)), 1)
        })
        .subscribe()
    }

    const removeAllSubscriptions =async () => {
        await client.removeAllSubscriptions()
    }
    
    const addCharacter = (name, strength, position) => {
      characters.value.push(new Character(name, strength, position));
    };
    
    const getCharacters = async () => {
        const {data} = await client
        .from<Character>("characters")
        .select("name, strength, position");
        data.forEach(character => addCharacter(character.name, character.strength, character.position))
    }

    const createCharacter = async (name:string, strength:number ) => {
        const {data} = await client.from("characters").insert([
            { name: name, strength: strength, position: 0 }
          ])
    }
    
    const deleteCharacter = async (name:string) => {
        const {data} = await client.from("characters").delete().match({name: name})
    }

    onMounted(() => { getCharacters(),  subscribeRealtime() })
    onUnmounted(() => { removeAllSubscriptions })

    
    return { characters, createCharacter , deleteCharacter}
    
}