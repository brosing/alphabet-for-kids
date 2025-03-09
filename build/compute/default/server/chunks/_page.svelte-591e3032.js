import { k as ensure_array_like, j as escape_html, l as fallback, m as attr, n as attr_class, o as bind_props, e as pop, p as push, q as stringify } from './index-f1623389.js';

function GlobeIcon($$payload, $$props) {
  push();
  let size = fallback($$props["size"], "24");
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let customClass = fallback($$props["class"], "");
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg"${attr("width", size)}${attr("height", size)} fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", strokeWidth)} stroke-linecap="round" stroke-linejoin="round"${attr_class(`feather feather-globe ${stringify(customClass)}`)}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
  bind_props($$props, { size, strokeWidth, class: customClass });
  pop();
}
function _page($$payload) {
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  let language = "id";
  const each_array = ensure_array_like(alphabet);
  $$payload.out += `<div class="min-h-screen"><div class="w-full max-w-xl mx-auto"><header class="bg-white shadow-sm md:rounded-b-lg"><div class="container mx-auto p-4 flex justify-between items-center"><h1 class="text-xl font-bold text-blue-600">Kids Alphabet</h1> <button class="btn btn-secondary flex items-center gap-2 rounded-xl">`;
  GlobeIcon($$payload, { size: "20" });
  $$payload.out += `<!----> ${escape_html(language.toUpperCase())}</button></div></header> <div class="grid grid-cols-4 gap-2 p-2 md:px-0"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let letter = each_array[$$index];
    $$payload.out += `<button class="card aspect-square flex items-center justify-center text-3xl font-bold text-blue-600 hover:text-blue-700 opacity-90">${escape_html(letter)}</button>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-591e3032.js.map
