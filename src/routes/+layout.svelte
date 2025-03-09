<script lang="ts">
  import '../app.css';
  import "@fontsource-variable/nunito"; // Defaults to wght axis
	import "@fontsource-variable/nunito/wght.css"; // Specify axis
	import "@fontsource-variable/nunito/wght-italic.css"; // Specify axis and style

	let { children } = $props();
</script>

{@render children()}
