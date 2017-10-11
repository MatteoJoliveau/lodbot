const yaml = require('js-yaml');
const fs = require('fs');

module.exports.Utils = class Utils {
  constructor() {
    this.face_id = 0;
  }
  loadConfig(path) {
    try {
      this.config = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
      return this.config;
    } catch (e) {
      console.error(e);
    }
  }

  getFace(face) {
    return {
      type: 'article',
      id: `${this.face_id++}`,
      title: face.name,
      input_message_content: {
        message_text: face.face
      },
      description: face.face
    }
  }

  getAllFaces(faces) {
    const arr = [];
    for (let face in faces) {
      arr.push(this.getFace(faces[face]));
    }
    this.face_id = 0;
    return arr;
  }
};
