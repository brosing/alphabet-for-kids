function _layout($$payload, $$props) {
  let { children } = $$props;
  children($$payload);
  $$payload.out += `<!---->`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-75a4fa55.js.map
