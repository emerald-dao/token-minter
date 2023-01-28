import { getContractDisplays } from "$flow/actions";
import { supabase } from "$lib/supabaseClient";
import { user } from "$stores/FlowStore";
import { get } from "svelte/store";

export async function load({ params }) {
  const contractName = params.collection;

  const { data } = await supabase.from('touchstone-projects').select().eq('contract_name', contractName);

  return { contractAddress: data[0].contract_address };
}