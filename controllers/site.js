/*
 * @author: zimyuan
 * @last-edit-date: 2015-10-04
 */

exports.index = function(req, res) {
    if (req.session.user) {
        res.render('index', {
            user: req.session.user
        });        
    } else {
        res.render('index', {
            user: null
        })
    }
}
