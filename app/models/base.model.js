const sequelize = require("./sequelize-db");
const { Model } = require('sequelize');

class Base extends Model { }

Base.init = (modelName, attr) => {
    Model.init(attr, {
        sequelize,
        modelName,
    });
}

Base.updateById = (id, data) => {
    Base.update(data, {
        where: { id },
    });
}

Base.deleteById = (id) => {
    Base.destroy({
        where: { id },
    });
}

module.exports = Base;
