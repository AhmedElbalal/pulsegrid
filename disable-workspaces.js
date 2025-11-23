// disable-workspaces.js in project root
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Comment out workspaces and add false value
pkg.workspaces = false;
pkg._originalWorkspaces = [
    "shared/types",
    "shared/utils",
    "shared/ui",
    "apps/dashboard",
    "apps/reports",
    "api"
];

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Temporarily disabled workspaces for deployment');