class Person {
  constructor() {
    this.people = [];
  }

  create(data) {
    const newPerson = {
      first_name: data.firstName,
      middle_name: data.middleName || '',
      last_name: data.lastName, 
      display_name: data.displayName || '',
      gender_id: data.genderId,
      country_id: data.countryId
    };
    this.people.push(newPerson);
    return newPerson;
  }

  find(id) {
    return this.people.find(person => person.id === id);
  }

  list(id) {
    return this.people;
  }

  update(id, data) {
    const person = this.find(id);
    const index = this.people.indexOf(person);
    this.people[index].first_name = data.firstName || person.firstName;
    this.people[index].middle_name = data.middleName || person.middleName;
    this.people[index].last_name = data.lastName || person.lastName;
    this.people[index].display_name = data.displayName || person.displayName;
    this.people[index].gender_id = data.genderId || person.genderId;
    this.people[index].country_id = data.countryId || person.countryId;
    return this.people[index];
  }
}