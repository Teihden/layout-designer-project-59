install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx htmlhint ./app/*.html
	npx pug-lint ./app/pug/**/*.pug

deploy:
	npx surge --project ./build --domain https://hex-chat.surge.sh
