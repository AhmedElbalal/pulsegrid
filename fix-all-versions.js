const fs = require('fs');
const path = require('path');

console.log('🛠️ Fixing ALL package.json versions...\n');

function fixVersions(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules' && !file.includes('.git')) {
            fixVersions(fullPath);
        } else if (file === 'package.json') {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const pkg = JSON.parse(content);
                let fixed = false;

                // Fix invalid versions
                if (!pkg.version || pkg.version === '' || pkg.version === 'latest' || pkg.version === '*' || pkg.version === 'next') {
                    console.log(`🔧 Fixing: ${fullPath}`);
                    console.log(`   Before: "${pkg.version}"`);
                    pkg.version = '1.0.0';
                    fixed = true;
                    console.log(`   After: "${pkg.version}"`);
                }

                // Write back if fixed
                if (fixed) {
                    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2));
                    console.log('   ✅ Fixed!\n');
                }

            } catch (error) {
                console.log(`❌ Error reading ${fullPath}:`, error.message, '\n');
            }
        }
    }
}

fixVersions('.');
console.log('🎉 All versions fixed!');