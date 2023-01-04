install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx htmlhint ./app/*.html

deploy:
	npx --project ./build --domain https://hex-chat.surge.sh
