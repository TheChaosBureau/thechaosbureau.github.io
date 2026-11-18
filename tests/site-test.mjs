import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('landing page links to the public visual and source', () => {
  assert.match(html, /href="\/em-visuals\/"/);
  assert.match(html, /https:\/\/github\.com\/TheChaosBureau\/em-visuals/);
});

test('landing page contains no private dashboard surface', () => {
  assert.doesNotMatch(html, /fleet|tailnet|tmux|api\//i);
});

test('the Drive Artifacts pages are served by their own repository, not copied here', () => {
  assert.equal(fs.existsSync(new URL('../drive-artifacts', import.meta.url)), false);
  const deploy = fs.readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.doesNotMatch(deploy, /drive-artifacts/);
});
