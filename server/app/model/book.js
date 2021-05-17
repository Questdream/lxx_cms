module.exports = app => {
    const { STRING, INTEGER} = app.Sequelize;

    const book = app.model.define('book', {
        title: STRING,
        orderby: INTEGER,
        img: STRING,
    })
    return book;
}