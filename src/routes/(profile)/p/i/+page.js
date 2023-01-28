import { getOwnedContractNames } from "$flow/actions";
import { user } from "$lib/stores/FlowStore";
import { supabase } from "$lib/supabaseClient";
import { get } from "svelte/store";

export async function load({ params }) {
  const userAddr = get(user)?.addr;
  if (!userAddr) {
    return {};
  }

  const { data } = await supabase.from('touchstone-projects').select('contract_name, contract_address');
  const ownedContractNames = await getOwnedContractNames(userAddr);
  const infos = data.filter(ele => ownedContractNames.includes(ele.contract_name));
  return { infos };
}