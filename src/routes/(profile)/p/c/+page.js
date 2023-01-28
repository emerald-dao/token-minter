import { getContractDisplays } from "$flow/actions";
import { supabase } from "$lib/supabaseClient";
import { user } from "$stores/FlowStore";
import { get } from "svelte/store";

export async function load({ params }) {
  const userAddr = get(user)?.addr;
  if (!userAddr) {
    return {};
  }

  const { data } = await supabase.from('touchstone-projects').select().eq('contract_address', userAddr);
  const contractDisplays = await getContractDisplays(userAddr, data);
  return { contractDisplays };
}