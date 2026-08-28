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
