const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/mydb'
});

app.get('/', async (req, res) => {
    try {
        const r = await pool.query('SELECT NOW() as now');
        res.json({ message: 'API com PostgreSQL funcionando!', dbTime: r.rows[0].now });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => console.log(`API on ${port}`));