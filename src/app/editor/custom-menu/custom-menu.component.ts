import {Component, Input, OnInit} from '@angular/core';
import {toggleMark} from 'prosemirror-commands';
import {EditorState, Plugin, Transaction} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Editor} from 'ngx-editor';
import {isMarkActive} from 'ngx-editor/helpers';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent implements OnInit {

  constructor() {
  }

  @Input() editor: Editor | undefined;
  subIsActive = false;
  subIsDisabled = false;
  supIsActive = false;
  supIsDisabled = false;

  onClick(e: MouseEvent, tag: string): void {
    if (!!this.editor) {
      e.preventDefault();
      const {state, dispatch} = this.editor.view;
      this.execute(tag, state, dispatch);
    }
  }

  execute(tag: string, state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const {schema} = state; // {} sinon type EditorView<any> au lieu de EditorState<S>.schema
    return toggleMark(schema.marks[tag])(state, dispatch);
  }

  update = (view: EditorView) => {
    const {state} = view; // {} sinon type EditorView<any> au lieu de EditorState<any>.state
    const {schema} = state;
    this.subIsActive = isMarkActive(state, schema.marks.sub);
    this.subIsDisabled = !this.execute('sub', state); // returns true if executable
    this.supIsActive = isMarkActive(state, schema.marks.sup);
    this.supIsDisabled = !this.execute('sup', state); // returns true if executable
  }

  ngOnInit(): void {
    const plugin = new Plugin({
      view: () => {
        return {
          update: this.update,
        };
      },
    });
    if (!!this.editor) {
      this.editor.registerPlugin(plugin);
    }
  }
}
