import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const contractName = params.collection;

  const { data } = await supabase.from('touchstone-projects').select().eq('contract_name', contractName);

  return { contractAddress: data[0].contract_address, version: data[0].version };
}