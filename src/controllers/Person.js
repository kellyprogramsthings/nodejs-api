import PersonModel from '../models/Person';

const Person = {
    create(req, res) {
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400).send({ 'message': 'All fields are required'});
        }
        const person = PersonModel.create(req.body);
        return res.status(201).send(person);
    },

    getAll(req, res) {
        const people = PersonModel.findAll();
        return res.status(200).send(people);
    },

    getOne(req, res) {
        const person = PersonModel.findOne(req.params.id);
        if (!person) {
          return res.status(404).send({'message': 'person not found'});
        }
        return res.status(200).send(person);
    },

    update(req, res) {
        const person = PersonModel.findOne(req.params.id);
        if (!person) {
          return res.status(404).send({'message': 'person not found'});
        }
        const updatedPerson = PersonModel.update(req.params.id, req.body)
        return res.status(200).send(updatedPerson);
      },
}