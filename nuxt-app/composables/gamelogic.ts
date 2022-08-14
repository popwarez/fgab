export function useGameLogic() {
  const supabase = useSupabaseClient();

  const showWinMessage = ref<boolean>(false);
  const showWinMessageComp = computed(() => showWinMessage);
  const winner = ref<string>("");

  const fightBoss = (character, boss) => {
    console.log("FIGHT!");
    if (character.strength > boss.life) {
      return true;
    } else {
      return false;
    }
  };

  const setShowWinMessage = (bool: boolean) => {
    console.log("set win", bool);
    showWinMessage.value = bool;
    console.log("setted", showWinMessage.value);
  };

  const setWinner = (name: string) => {
    winner.value = name;
  };

  return {
    fightBoss,
    setShowWinMessage,
    setWinner,
    showWinMessageComp,
    winner,
  };
}
