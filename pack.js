var fs = require('fs');
require('shelljs/global');

var archiver = require('archiver');

var manifest = require('./manifest.json');
var npmPackageJson = require('./package.json');
manifest.browser_action.default_popup = 'index.html';
manifest.version = npmPackageJson.version;

mkdir('-p', 'dist/_package');
cp('-rf', 'dist/production/*', 'dist/_package');
cp('-rf', '_locales', 'dist/_package');
cp('-f', 'icon.png', 'dist/_package');
echo(JSON.stringify(manifest)).to('dist/_package/manifest.json');

rm('-f', 'dist/package.zip');
var archive = archiver.create('zip', {});
var output = fs.createWriteStream('dist/package.zip');
archive
.pipe(output);
archive.directory('dist/_package/', '/')
.finalize();
