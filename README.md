Bund-starterkit for Drupal 8
============================

# Dev requirements
- node.js
- npm
- bower

# Development

Install vendors (bootstrap-sass, gulp, gulp-sass, gulp-autoprefixer, browser-sync).
```
npm install
bower install
```

import css files from submodule and generate js vendors for Drupal
```
gulp init
```

Watch SCSS changes and live reload with browserSync
```
gulp
```

Check the terminal to get the URL from BrowserSync.
