# gnome-extension-clean-notifications-position

Extensión para GNOME Shell 50 que mueve el botón **Limpiar** al inicio del historial de notificaciones y añade un atajo de teclado para limpiarlas sin abrir el panel. Al desactivarla, GNOME recupera su disposición normal y el atajo deja de funcionar.

La instalación es por usuario: no necesita `sudo` y no modifica archivos del sistema.

## Requisitos

- GNOME Shell 50.
- Los comandos `git` y `gnome-extensions` disponibles en la terminal.

## Instalación

Clona el repositorio y crea el paquete instalable:

```bash
git clone https://github.com/todomagichere/gnome-extension-clean-notifications-position.git
cd gnome-extension-clean-notifications-position
gnome-extensions pack --force --out-dir . clear-first@todomagichere
gnome-extensions install --force "$PWD/clear-first@todomagichere.shell-extension.zip"
```

Ahora **cierra sesión y vuelve a iniciarla**. Es necesario para que GNOME Shell detecte una extensión instalada mientras la sesión ya estaba en marcha, especialmente en Wayland.

Después de volver a entrar, actívala:

```bash
gnome-extensions enable clear-first@todomagichere
```

Para comprobar que está activa:

```bash
gnome-extensions list --enabled | grep -F clear-first@todomagichere
```

Abre el panel de fecha/notificaciones: el botón **Limpiar** aparecerá arriba.

## Atajo de teclado

Pulsa <kbd>Super</kbd>+<kbd>Mayús</kbd>+<kbd>N</kbd> para limpiar todas las notificaciones, igual que con el botón **Limpiar**. Funciona con el panel abierto o cerrado y también desde la vista de actividades. Si no hay nada que limpiar, no hace nada.

Para cambiarlo por otra combinación, por ejemplo <kbd>Super</kbd>+<kbd>Supr</kbd>:

```bash
gsettings --schemadir ~/.local/share/gnome-shell/extensions/clear-first@todomagichere/schemas \
  set org.gnome.shell.extensions.clear-first clear-notifications "['<Super>Delete']"
```

El cambio se aplica al momento, sin volver a iniciar sesión. Para volver al atajo por defecto:

```bash
gsettings --schemadir ~/.local/share/gnome-shell/extensions/clear-first@todomagichere/schemas \
  reset org.gnome.shell.extensions.clear-first clear-notifications
```

## Desinstalación

```bash
gnome-extensions disable clear-first@todomagichere
gnome-extensions uninstall clear-first@todomagichere
```
