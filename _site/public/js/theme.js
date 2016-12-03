// Polyfilling Object.entries for Safari :/
Object.entries = (object) => Object.keys(object).map(
  (key) => [ key, object[key] ]
)

const isObject = (obj) => obj === Object(obj)

const LightTheme = {
  '--main-color': '#1b70de',
  '--bg-color': '#FFF',
  '--text-color': '#464646',
  '--button-color': 'rgba(0, 0, 0, 0.8)',
  '--header-color': '#424242',
  '--metadata-color': '#828282',
  '--post-title': '#313131',
  '--grey1': '#eee',
  '--grey2': '#9a9a9a',
  '--grey3': '#555',
  '--table-border-color': '#e5e5e5',
  '--table-header-color': '#f9f9f9',
  themeName: 'LightTheme'
}

const NightTheme = {
  '--main-color': 'red',
  '--bg-color': '#000',
  '--text-color': '#FFF',
  '--button-color': 'rgba(255, 255, 255, 0.8)',
  '--header-color': 'gainsboro',
  '--metadata-color': '#b2b2b2',
  '--table-border-color': '#cccccc',
  '--table-header-color': '#505050',
  themeName: 'NightTheme'
}

const setCSSVariable = (key, value) => document.body.style.setProperty(key, value)

const saveTheme = (theme) => {
  if (window.localStorage) {
    localStorage['theme'] = JSON.stringify(theme)
    localStorage['currentTheme'] = theme.themeName
  }
}

const loadSavedTheme = () => {
  if (window.localStorage) {
    const maybeTheme = localStorage['theme']
    if (maybeTheme) return JSON.parse(maybeTheme)
  }

  return null
}

const updateTheme = (theme) => {
  if (!isObject(theme)) return

  Object
  .entries(theme)
  .forEach(([key, value]) => setCSSVariable(key, value))

  saveTheme(theme)
}

const checkForSavedTheme = () => {
  const theme = loadSavedTheme()
  if (theme) updateTheme(theme)
}

const switchTheme = () => {
  const el = document.getElementById('theme-switcher')
  // Check if we have a saved theme
  const theme = loadSavedTheme()
  const currentTheme = localStorage['currentTheme']

  if (theme && currentTheme === NightTheme.themeName) {
    updateTheme(LightTheme)
    el.className = iconForTheme(LightTheme.themeName)
  } else {
    updateTheme(NightTheme)
    el.className = iconForTheme(NightTheme.themeName)
  }
}

const iconForTheme = (themeName) => {
  if (themeName === NightTheme.themeName) {
    return 'icon-chat'
  } else {
    return 'icon-search'
  }
}
