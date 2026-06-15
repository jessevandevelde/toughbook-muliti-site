const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'xC3ePYYgue',
      database: 'toughbookdb',
      multipleStatements: true
    });

    console.log('✓ Database connected');

    // Disable foreign key checks for schema reload
    await connection.query('SET FOREIGN_KEY_CHECKS=0');

    // Read and execute schema
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'cms-schema.sql'), 'utf8');
    await connection.query(schemaSQL);
    console.log('✓ Schema loaded');

    // Re-enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS=1');

    // Read and execute seed data
    const seedSQL = fs.readFileSync(path.join(__dirname, 'cms-seed-clean.sql'), 'utf8');
    console.log('Loading seed file...');
    const result = await connection.query(seedSQL);
    console.log('✓ Seed data loaded');

    // Verify data
    const [websites] = await connection.query('SELECT * FROM websites');
    const [blocks] = await connection.query('SELECT COUNT(*) as count FROM website_blocks');
    const [items] = await connection.query('SELECT COUNT(*) as count FROM block_items');
    
    console.log('\n✓ Database seeded successfully!');
    console.log(`  - Websites: ${websites.length}`);
    console.log(`  - Blocks: ${blocks[0].count}`);
    console.log(`  - Items: ${items[0].count}`);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('SQL:', error.sql);
    process.exit(1);
  }
})();
