install:
	npm install

lint:
	npx stylelint ./app/**/*.scss
	npx pug-lint ./app/pug/**/*.pug --reporter node_modules/puglint-stylish
