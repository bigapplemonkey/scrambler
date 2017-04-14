# Scrambler

The `scramble.js` injects the scrambler object to the global scope in order to scramble and unscramble any text. The script also inserts components in the DOM to allow scrambling/unscrambling directly in the page.

#### Functionality

- Determines scrambling parameters from original message and incorporates these parameters in next scramblings.
- Adds components to the DOM for scrambling/unscrambling directly from the page.
- Injects the scrambler object to the global scope for scrambling/unscrambling directly from the console.

#### Frameworks

- JQuery

#### How to use

- Include in your HTML header:
```
<script src="https://bigapplemonkey.github.io/scrambler/scrambler.js"></script>
```
- Or, append to the DOM from the console:
```
$('head').append('<script src="https://bigapplemonkey.github.io/scrambler/scrambler.js"></script>');
```
- Or, access the scrambler object from the console:
```
//Pass a string message
scrambler.scrambleMe('Hello there scrambler!');

//Pass a JQuery selector
scrambler.unscrambleMe($('body'));
```

- Or, just chek it out in action: [Here](https://bigapplemonkey.github.io/scrambler/).