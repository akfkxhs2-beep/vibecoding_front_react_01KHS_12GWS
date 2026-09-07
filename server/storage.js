const fs = require('fs/promises');
const path = require('path');
let Pool;
try { ({ Pool } = require('pg')); } catch (_) {}

const seedPath = path.join(__dirname, 'data', 'games.json');
let pool = null;

async function initStorage(){
  if(process.env.DATABASE_URL && Pool){
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false }
    });
    await pool.query(`CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM games');
    if(rows[0].count === 0){
      const seed = JSON.parse(await fs.readFile(seedPath, 'utf8'));
      await replaceGames(seed);
    }
    console.log('[storage] PostgreSQL mode');
  }else{
    console.log('[storage] JSON fallback mode');
  }
}

async function getGames(){
  if(pool){
    const { rows } = await pool.query('SELECT data FROM games ORDER BY id');
    return rows.map(r => r.data);
  }
  return JSON.parse(await fs.readFile(seedPath, 'utf8'));
}

async function replaceGames(games){
  if(pool){
    const client = await pool.connect();
    try{
      await client.query('BEGIN');
      for(const game of games){
        await client.query(
          `INSERT INTO games(id,data,updated_at) VALUES($1,$2,NOW())
           ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data, updated_at=NOW()`,
          [game.id, game]
        );
      }
      await client.query('COMMIT');
    }catch(err){
      await client.query('ROLLBACK');
      throw err;
    }finally{ client.release(); }
  }else{
    await fs.writeFile(seedPath, JSON.stringify(games, null, 2), 'utf8');
  }
}

module.exports = { initStorage, getGames, replaceGames };
