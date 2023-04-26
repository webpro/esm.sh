import { assert } from 'https://deno.land/std@0.180.0/testing/asserts.ts';

Deno.test('stable-build', async () => {
  const pkgNames = ['lit', 'preact', 'react', 'react-dom', 'solid-js', 'svelte', 'vue'];
  const pkgUrls = pkgNames.map(pkgName => `http://localhost:8080/${pkgName}`);
  const contents = await Promise.all(pkgUrls.map(url => fetch(url).then(response => response.text())));
  for (const content of contents) {
    assert(/\/stable\//.test(content));
    assert(!/\/v[0-9]+\//.test(content));
  }
});
