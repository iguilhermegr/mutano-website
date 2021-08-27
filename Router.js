module.exports = (app) => {
    app.use('/', require('./Routes/Index.js'));
    app.use('/api', require('./Routes/Api.js'));
}