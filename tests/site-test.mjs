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

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');

test('Drive Artifacts home page links to its privacy policy', () => {
  const page = read('../drive-artifacts/index.html');
  assert.match(page, /<title>Drive Artifacts<\/title>/);
  assert.match(page, /href="\/drive-artifacts\/privacy\/"/);
});

test('Drive Artifacts privacy policy names the one Drive permission', () => {
  const page = read('../drive-artifacts/privacy/index.html');
  assert.match(page, /Privacy policy for the Drive Artifacts app/);
  assert.match(page, /drive\.file/);
});

test('the deploy copies the Drive Artifacts pages into the site', () => {
  assert.match(read('../.github/workflows/pages.yml'), /cp -r drive-artifacts _site\//);
});
