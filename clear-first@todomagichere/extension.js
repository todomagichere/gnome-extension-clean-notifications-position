import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const CLEAR_SHORTCUT = 'clear-notifications';

export default class ClearFirstExtension extends Extension {
    enable() {
        const messageList = Main.panel.statusArea.dateMenu?._messageList;
        const clearButton = messageList?._clearButton;

        if (!clearButton)
            throw new Error('No se encontró la lista de notificaciones de GNOME');

        this._messageList = messageList;
        this._controls = clearButton.get_parent();
        this._container = this._controls.get_parent();
        this._originalIndex = this._container.get_children().indexOf(this._controls);

        this._container.set_child_at_index(this._controls, 0);

        this._settings = this.getSettings();
        Main.wm.addKeybinding(
            CLEAR_SHORTCUT,
            this._settings,
            Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW | Shell.ActionMode.POPUP,
            () => this._clearNotifications());
    }

    disable() {
        Main.wm.removeKeybinding(CLEAR_SHORTCUT);
        this._settings = null;

        if (this._controls && this._container && !this._controls.is_destroyed())
            this._container.set_child_at_index(this._controls, this._originalIndex);

        this._messageList = null;
        this._controls = null;
        this._container = null;
        this._originalIndex = null;
    }

    // Hace lo mismo que el botón Limpiar: cierra las notificaciones que se
    // pueden cerrar. Si no hay ninguna, no hace nada.
    _clearNotifications() {
        const messageView = this._messageList?._messageView;

        if (messageView?.canClear)
            messageView.clear();
    }
}
