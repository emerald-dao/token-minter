import { contractCode } from "../../flow/stores.js";
import { get } from 'svelte/store'

export async function onLoadedShiki() {
  const response = await fetch("https://raw.githubusercontent.com/onflow/vscode-cadence/master/syntaxes/cadence.tmGrammar.json")
  const responseJson = await response.json();

  var cadenceLanguage = {
    id: "cadence",
    scopeName: "source.cadence",
    grammar: responseJson,
    aliases: ["cadence"],
  };

  let highlighter = await shiki.getHighlighter({
    theme: "nord",
  })

  await highlighter.loadLanguage(cadenceLanguage);

  var code = highlighter.codeToHtml(get(contractCode), {
    lang: "cadence",
  });

  return code;
}