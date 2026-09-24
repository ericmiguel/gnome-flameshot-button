# Flameshot Screenshot Button

A GNOME Shell extension that replaces the built-in screenshot button in Quick
Settings with Flameshot's interactive capture interface. The `Print Screen`
keyboard shortcut is left unchanged.

## Requirements

- GNOME Shell 50 (check with `gnome-shell --version`)
- Flameshot installed and available as `flameshot` on `PATH`

## Install

Create and install the GNOME extension bundle from the project directory:

```sh
gnome-extensions pack .
gnome-extensions install ./flameshot-screenshot-button@ericmiguel.github.io.shell-extension.zip
```

Enable it:

```sh
gnome-extensions enable flameshot-screenshot-button@ericmiguel.github.io
```

If GNOME Shell does not discover the extension immediately, log out and back in,
then run the enable command again.

## Use

Open Quick Settings from the top bar and click the screenshot icon beside
Settings. Flameshot opens its capture overlay; drag to select an area and use
the toolbar to edit, copy, or save the capture.

## Remove

```sh
gnome-extensions disable flameshot-screenshot-button@ericmiguel.github.io
gnome-extensions uninstall flameshot-screenshot-button@ericmiguel.github.io
```

## Development

Check the JavaScript syntax and build the installable bundle:

```sh
node --check extension.js
gnome-extensions pack .
```
