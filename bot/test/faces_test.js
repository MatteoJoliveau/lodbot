var expect = require('chai').expect

const {Utils} = require('../utils.js');

const utils = new Utils();

describe('Faces', () => {
  describe('Load a single face', function() {
    it('Should return a face as a InlineQueryResult', function() {
      const face = utils.getFace({
        "name": "Sweet",
        "face": "(☞ﾟヮﾟ)☞"
      });

      expect(face).to.have.property("input_message_content");
      haveProperties(face, ['type', 'id', 'title', 'description'], ['article', '0', 'Sweet', '(☞ﾟヮﾟ)☞']);
      haveProperties(face.input_message_content, ['message_text'], ['(☞ﾟヮﾟ)☞']);
    });
  });
  describe('Load all faces', () => {
    it("Should return an array of InlineQueryResults", () => {
        const faces = require('../faces.json');
        const all = utils.getAllFaces(faces);

        expect(all).to.be.an('array');
        expect(all.length).to.equal(faces.length);

        for (let prop in faces) {

            if (faces.hasOwnProperty(prop)) {
                const current = faces[prop];
                const loaded = all[prop];
                expect(current.name).to.equal(loaded.title);
                expect(current.face).to.equal(loaded.input_message_content.message_text).and.equal(loaded.description);
            }
        }
    })
  })
})

function haveProperties(face, props, values) {
  for (let prop in props) {
    expect(face).to.have.property(props[prop]).and.equal(values[prop]);
  }
}
