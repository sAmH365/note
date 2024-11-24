const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
    )`, (err, results, fileds) => {
        console.log('results', results);
    })


// 데이터 조회
app.get('/api/values', (req, res) => {
    // 데이터베이스에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;', 
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json(results);
        }
    )
})

// 데이터 생성
app.post('/api/value', (req, res, next) => {
    // 데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, 
        (err, results, fileds) => {
            if(err)
                return res.status(500).send(err);
            else
                return res.json({ success: true, value: req.body.value })
        }
    );
})


app.listen(5555, () => {
    console.log('server running on 5555 port...')
});