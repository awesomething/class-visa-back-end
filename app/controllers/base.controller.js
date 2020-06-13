class Base {
    constructor()
    errorMessage = '';

    create() {
        try {
            const data = await model.create(req.body);
        
            res.send(data);
        } catch(err) {
            res.status(500).send({
                message: this.errorMessage,
                err
            });
        }
    }

    findAll() {

    }

    findOne() {

    }

    update() {

    }

    delete() {

    }
}

module.exports = Base;