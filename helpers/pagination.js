app.get('/users', function (req, res) {
  let page = Number.parseInt(req.query.page) || 1;
  let limit = Number.parseInt(req.query.limit) || 5;
  let from = 0;
  let to = 5;
  let total = 0;
  User.countDocuments({ google: false })
    .then((total) => {
      if (page > 1) {
        let totalItems = limit * page;
        from = totalItems - limit;
        to = totalItems;
      }
      User.find({ google: false })
        .skip(from)
        .limit(limit)
        .exec()
        .then((users) => {
          res.json({
            data: users,
            pagination: {
              current_page: page,
              last_page: page === 1 ? null : page - 1,
              from: from,
              per_page: limit,
              to: to,
              total: total,
            },
            success: true,
            message: 'Data returned successfully !',
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
});
lalallaa;
