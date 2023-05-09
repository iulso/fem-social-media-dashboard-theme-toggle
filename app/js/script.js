// Remove the no-js class so that the toggle will show
document.documentElement.classList.remove('no-js');

/* 
The first time the page is loaded, the color mode set on the preference 
is used and set as 'default' in the localStorage. 
Changing the default preferences works the same way as changing the 
color mode using the buttons, if the page is loaded.
When the page is reloaded, whatever is the value set on the localStorage
has precedence over the values in the preference. If the preference
changed after the page was visited -and the page is not loaded- 
the last value saved on the localStorage is loaded. 
*/

const body = document.querySelector('body');
const toggleInputs = document.querySelectorAll('.toggle__wrapper input');
const lightButton = document.getElementById('light');
const darkButton = document.getElementById('dark');

/**
 * Pass an element and a theme name.
 * The theme will be added as a class to the element and set in localStorage
 */
const setColorMode = (el, theme) => {
  el.classList = theme;
  localStorage.setItem('colorMode', theme);
};

const getLocalColorMode = () => {
  return localStorage.getItem('colorMode');
};

const getPreferencesColorMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'; // If preference is set or does not match anything (light is default)
};

const loadTheme = () => {
  // localStorage has precendence over the 'prefers-color-scheme'
  const color = getLocalColorMode() || getPreferencesColorMode();
  color === 'dark' ? darkButton.click() : lightButton.click();
};

// When the toggle inputs are clicked, check which one is checked and change the color
toggleInputs.forEach(input => {
  input.addEventListener('click', e => {
    darkButton.checked
      ? setColorMode(body, 'dark')
      : setColorMode(body, 'light');
  });
});

/**
 * This event will be emitted when the 'prefers-color-scheme' changes
 * If it matches, the new color is dark, else it is light
 */
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    e.matches ? darkButton.click() : lightButton.click();
  });

// Load the right theme on startup - localStorage has precedence
loadTheme();
