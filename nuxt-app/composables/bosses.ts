export function useBosses() {
  const supabase = useSupabaseClient();
  const bosses = ref<Boss[]>([]);

  // create bosses
  class Boss {
    name: string;
    life: number;
    position: number;
    constructor(name: string, life: number, position: number) {
      this.name = name;
      this.life = life;
      this.position = position;
    }
  }

  const addBoss = (name, life, position) => {
    bosses.value.push(new Boss(name, life, position));
  };

  // subscribe in one function/ call, because multiple funktions to subscribe override each other

  const subscribeRealtime = async () => {
    await supabase
      .from("bosses")
      .on("INSERT", (boss) => {
        console.log("NEW", boss);
        addBoss(boss.new.name, boss.new.life, boss.new.position);
      })
      .on("DELETE", (boss) => {
        console.log("OLD", boss);
        bosses.value.splice(
          bosses.value.findIndex((char) => char.name === boss.old.name),
          1
        );
      })
      .on("UPDATE", (boss) => {
        console.log("UPDATE", boss);
        bosses.value[
          bosses.value.findIndex((char) => char.name === boss.old.name)
        ] = boss.new;
      })
      .subscribe();
  };

  // remember to remove the subscriptions

  const removeAllSubscriptions = async () => {
    await supabase.removeAllSubscriptions();
  };

  // manual calls to change stuff

  const getBosses = async () => {
    const { data } = await supabase
      .from("bosses")
      .select("name, life, position");
    data.forEach((boss) => addBoss(boss.name, boss.life, boss.position));
  };

  const createBoss = async (name: string, life: number) => {
    const { data } = await supabase
      .from("bosses")
      .insert([{ name: name, life: life, position: 0 }]);
    return data;
  };

  const updateBossLife = async (life: number, name: string) => {
    const { data } = await supabase
      .from("bosses")
      .update({ life: life })
      .match({ name: name });
    return data;
  };

  const updateBossPosition = async (position: number, name: string) => {
    const { data } = await supabase
      .from("bosses")
      .update({ position: position })
      .match({ name: name });
    return data;
  };

  const deleteBoss = async (name: string) => {
    const { data } = await supabase
      .from("bosses")
      .delete()
      .match({ name: name });
  };

  onMounted(() => {
    getBosses(), subscribeRealtime();
  });
  onUnmounted(() => {
    removeAllSubscriptions;
  });

  return { bosses, createBoss, deleteBoss, updateBossLife, updateBossPosition };
}
