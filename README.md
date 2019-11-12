# window-extra
Extra features that attach to the "window" variable in JS.

### Base64 Features
```js
window.base64.encode('my string') // Returns "bXkgc3RyaW5n"
window.base64.decode('bXkgc3RyaW5n') // Returns "my string"
```
### Better LocalStorage
```js
window.storage.set('key1', 'my value');
window.storage.set('key2', 3);
window.storage.set('key3', {fname: 'Mark', lname: 'Fishbach'});

window.storage.get('key1'); // Will return data as you set it.
```
