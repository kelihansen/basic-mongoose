/* eslint no-console:off */

module.exports = (err, req, res) => {
    console.log(err);
    console.log(`CANNOT ${req.method} ${req.url}`);
    res.status(err.status || 500).send(err);
};