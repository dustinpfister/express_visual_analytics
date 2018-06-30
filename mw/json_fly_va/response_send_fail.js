// send fail
module.exports = function (req,res) {

    let jRes = req.app.locals.jRes;

    jRes.mess = 'end of line sorry';
    res.json(jRes);

};
