import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Meta from 'gi://Meta';
import St from 'gi://St';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const SCREENSHOT_ICON = 'screenshooter-symbolic';

function findScreenshotButton(actor) {
    if (actor instanceof St.Button && actor.icon_name === SCREENSHOT_ICON)
        return actor;

    for (const child of actor.get_children?.() ?? []) {
        const match = findScreenshotButton(child);
        if (match)
            return match;
    }

    return null;
}

export default class FlameshotQuickSettingsExtension extends Extension {
    enable() {
        const menu = Main.panel.statusArea.quickSettings?.menu;
        const nativeButton = menu ? findScreenshotButton(menu.actor) : null;

        if (!nativeButton) {
            console.error('Flameshot Screenshot Button: could not find GNOME screenshot button');
            return;
        }

        this._nativeButton = nativeButton;
        this._parent = nativeButton.get_parent();
        this._index = this._parent.get_children().indexOf(nativeButton);
        this._replacementButton = new St.Button({
            style_class: 'icon-button',
            can_focus: true,
            icon_name: SCREENSHOT_ICON,
            accessible_name: 'Flameshot',
        });

        this._replacementButton.connect('clicked', () => {
            menu.close({animate: false});
            global.compositor.get_laters().add(Meta.LaterType.BEFORE_REDRAW, () => {
                try {
                    Gio.Subprocess.new(['flameshot', 'gui'], Gio.SubprocessFlags.NONE);
                } catch (error) {
                    console.error(`Flameshot Screenshot Button: ${error.message}`);
                }
                return GLib.SOURCE_REMOVE;
            });
        });

        this._parent.insert_child_at_index(this._replacementButton, this._index);
        nativeButton.hide();
    }

    disable() {
        this._replacementButton?.destroy();
        this._nativeButton?.show();
        this._replacementButton = null;
        this._nativeButton = null;
        this._parent = null;
    }
}
