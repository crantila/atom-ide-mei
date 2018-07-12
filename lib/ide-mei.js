'use babel';

import IdeMeiView from './ide-mei-view';
import { CompositeDisposable } from 'atom';

export default {

  ideMeiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ideMeiView = new IdeMeiView(state.ideMeiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ideMeiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ide-mei:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ideMeiView.destroy();
  },

  serialize() {
    return {
      ideMeiViewState: this.ideMeiView.serialize()
    };
  },

  toggle() {
    console.log('IdeMei was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
