const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});

// Country.create({
//   id: "ARG",
//   name: "Argentina",
//   flag: "https://restcountries.eu/data/arg.svg",
//   continent: "Americas",
//   capital: "Buenos Aires",
//   subregion: "South America",
//   area: 2780400,
//   population: 43590400,
// })
//   .then(() => done())
//   .catch((error) => done(new Error(error)));
// });