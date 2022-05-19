import {DOMOutputSpec, Schema} from 'prosemirror-model';
import {marks as basicMarks, nodes} from 'ngx-editor';

const marks = Object.assign({}, basicMarks, {
  sup: {
    toDOM(): DOMOutputSpec {
      return ['sup'];
    },
    parseDOM: [{tag: 'sup'}]
  },
  sub: {
    toDOM(): DOMOutputSpec {
      return ['sub'];
    },
    parseDOM: [{tag: 'sub'}]
  },
});

const schema = new Schema({
  nodes, marks
});

export default schema;
