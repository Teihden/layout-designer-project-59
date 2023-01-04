install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx pug-lint ./app/**/*.pug

deploy:
	npx --project ./build --domain https://hex-chat.surge.sh
