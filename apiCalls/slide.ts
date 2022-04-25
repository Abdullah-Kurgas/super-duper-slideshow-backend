var conn = require('../mysqlConnection');

let getSlides = (req: any, res: any) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM slide WHERE slideshow_id = ?';

    conn.query(sql, [id], (err: any, result: any) => {
        res.json(result);
    })
}

export {
    getSlides
}