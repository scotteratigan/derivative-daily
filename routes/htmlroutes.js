module.exports = routes => {
	routes.get('/', (req, res) => {
		res.render('index');
	});
}