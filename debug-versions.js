const fs = require('fs');
const path = require('path');

console.log('🔍 Checking ALL package.json files for invalid versions...\n');

function checkPackage(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules') {
            checkPackage(fullPath);
        } else if (file === 'package.json') {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const pkg = JSON.parse(content);

                console.log(`📁 ${fullPath}`);
                console.log(`   Version: "${pkg.version}"`);

                // Check for invalid versions
                if (!pkg.version) {
                    console.log('   ❌ ERROR: Missing version field!');
                } else if (pkg.version === '') {
                    console.log('   ❌ ERROR: Empty version string!');
                } else if (pkg.version === 'latest' || pkg.version === '*' || pkg.version === 'next') {
                    console.log('   ❌ ERROR: Invalid version:', pkg.version);
                } else if (!/^\d+\.\d+\.\d+/.test(pkg.version)) {
                    console.log('   ❌ ERROR: Version does not follow semver format!');
                } else {
                    console.log('   ✅ Version OK');
                }
                console.log('---');

            } catch (error) {
                console.log(`❌ ERROR parsing ${fullPath}:`, error.message);
                console.log('---');
            }
        }
    }
}

checkPackage('.');