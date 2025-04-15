const baseController = {};

baseController.buildHome = async function (req, res) {
  // #swagger.ignore = true
  res.render('index', { title: 'Home' });
};

module.exports = baseController;
