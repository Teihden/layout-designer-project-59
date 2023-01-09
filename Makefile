install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx htmlhint ./build/*.html
	npx pug-lint ./app/pug/**/*.pug

deploy:
	npx surge --project ./build --domain https://hex-chat.surge.sh
