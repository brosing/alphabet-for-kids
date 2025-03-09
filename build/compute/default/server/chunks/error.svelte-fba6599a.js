import { j as escape_html, e as pop, p as push } from './index-f1623389.js';
import { p as page } from './index2-4e08a838.js';
import './exports-eeea347f.js';

function Error($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error as default };
//# sourceMappingURL=error.svelte-fba6599a.js.map
