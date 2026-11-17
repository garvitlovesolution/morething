// Usage: node scripts/check-funding.js [path-to-funding.json]
const fs = require('fs');
const f = process.argv[2] || 'funding.json';
const text = fs.readFileSync(f, 'utf8');
let j; try { j = JSON.parse(text); } catch (e) { console.error('Not valid JSON:', e.message); process.exit(1); }
const problems = [];
if (/REPLACE/.test(text)) problems.push('Some REPLACE values are still in the file.');
const need = (c, m) => { if (!c) problems.push(m); };
need(j.version, 'version missing'); need(j.entity && j.entity.name && j.entity.email && j.entity.description, 'entity name, email and description are required');
need(j.projects && j.projects.length, 'at least one project is required');
(j.projects || []).forEach(p => { need(p.guid && p.name && p.description, 'project guid, name and description are required'); need(p.repositoryUrl && /^https:\/\//.test(p.repositoryUrl.url || ''), 'project repositoryUrl must start with https://'); need((p.licenses || []).length, 'project licenses missing (example: spdx:MIT)'); });
need(j.funding && (j.funding.channels || []).length && (j.funding.plans || []).length, 'funding channels and plans are required');
(j.funding && j.funding.plans || []).filter(p => p.currency === 'USD').forEach(p => { need([10000, 25000, 50000, 75000, 100000].includes(p.amount), 'plan amount should be 10000, 25000, 50000, 75000 or 100000 USD per year for FLOSS/fund'); });
if (problems.length) { console.log('Please fix:\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('funding.json looks complete.');
