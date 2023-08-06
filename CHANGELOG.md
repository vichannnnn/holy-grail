# CHANGELOG

## [v1.0.2](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.2) - 2023-07-19 09:03:50

## [v1.0.1](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.1) - 2023-07-18 14:27:37

## [v1.0.0](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.0) - 2023-07-18 10:23:44

* v1.0.0 official release  (#72)

* Feat/update tests (#38)

* feat: update tests boilerplate

* fix(tests): update dependency mocking in tests

* chore(readme): update pipeline badge

* chore(tests): remove echo from async_engine (#40)

* Feat/update tests (#42)

* Feat/ci cd update (#43)

* feat(pre-commit): add pre commit hook

* feat(ci): separate the ci/cd into different ymls and badges

* Update README.md

* fix(ci): update trigger config

* fix(ci): update trigger config

* fix(ci): update trigger config

* fix(ci): update trigger config

* fix(ci): update conclusion success trigger

* chore(env): update .env_example to .env.example

* fix(ci): update env step

* fix(ci): update env step

* fix(ci): update env step

* fix(ci): update alls-green

* Feat/update tests (#45)

* chore(requirements): update requirements.txt for fastapi to 0.100.0

* chore(pre-commit): added pre commit hooks

* feat(tests): add dev endpoint for register without email & s3 bucket dependency injection

* chore(makefile): add venv make command

* chore(makefile&readme): update venv instructions and precommit instructions

* chore(readme): update readme and env

* feat(tests): update library api test coverage & update s3 client dependency on test env

* fix(makefile): update codecov command with testing var

* fix(makefile): update test to fail immediately if there is a fail

* test(ci): update ci trigger for deploy and build and test fail test (#46)

* test(ci): update ci trigger for deploy and build and test fail test

* test

* update

* test (#47)

* test

* fix(ci): separate test

* Fix/pass test ci (#49)

* test

* fix(ci): separate test

* feat(tests): update more tests

* Fix/pass test ci (#50)

* test

* fix(ci): separate test

* feat(tests): update more tests

* feat(tests): update auth tests

* test

* chore(ci/readme): update badges & some ci test

* feat(categories): update subject endpoint and subject education level… (#51)

* feat(categories): update subject endpoint and subject education level relationship

* feat(migration): add migration script for subject-education level relationship

* chore(codecov): add yml config for codecov to not fail when coverage drops

* chore(db): update make command & gitignore

* Test (#59)

* refactor(docker-compose): update prod config and format

* feat(docker): update python image to 3.11 and dockerignore config

* refactor(tests): update sessionmaker to async_sessionmaker and tests config session

* fix(dockerfile): remove --no-cache

* refactor(auth): update typehint for auth model

* refactor(tests): update test to not require bash script

* Feat/rate limit (#60)

* chore(precommit): update pre commit hook

* chore(auth): update rate limit for auth endpoints

* chore(rate-limit): update ipaddr rate limit logic

* chore(rate-limit): update rate limit message on frontend

* chore(auth): separate logic from endpoint layer

* chore(readme): update readme for pre commit

* chore(library): optimize the create note query

* Feat/fe filter update (#61)

* fix(upload-page): update the upload file behavior when error and displaying appropriate error

* chore: add endpoint for getting single category level

* chore(notes-table): update NotesTable for combobox to support new cat-sub relationship

* chore(note-table): update combobox opacity when disabled

* feat(note-table): update combobox behavior to filter subjects for category level

* chore(note-table): remove subject combobox value if category gets removed and subject disabled again

* test(categories): update test for new endpoint

* Feat/optimize (#63)

* chore: separate dependencies to its own file

* chore: update codebase

* chore: update CRUD generic, register function & separate into utils directory

* chore(exceptions): update error to generic errors

* chore(deps): update dependencies to annotated

* refactor: optimize service logic

* chore: fix pylint issues

* fix: clear alert on redirect (#64)

* add html to emails (#62)

* fix: fix ping task url

* fix(email): update email template to reflect variables input (#66)

* fix(upload-file): update register account error description

* Feat/keyword filter (#67)

* feat(notes): update backend get notes endpoint to accept keyword argument

* feat(combobox): add keyword filter on frontend

* chore: remove unused component & clean imports

* Feat/keyword filter (#68)

* feat(combobox): add keyword filter on frontend

* chore(api): add barrel import for api

* fix(approval-table): update approval table with new changes

* chore: refactor combobox logic and notesapplication

* refactor: update NotesIcon component

* refactor(auth): update api request data structure and simplify error logic

* chore: update change password page

* chore(ci/cd): update codecov.yml

* chore(account-verify): update account verify page and header (#69)

* chore: fix some lint issue

* fix: update data input for tables

* refactor(frontend): update all components and features to barrel imports & remove default exports

* refactor(frontend): update all provider barrel imports & update tsconfig

* refactor: clean up remaining imports

* fix: fix fetchData note filter issue

* refactor(library): optimize the library loading logic by removing redundant endpoint calls

* chore(deploy): update deployment instructions & readme

* fix(make): command fix

* chore: dev env not handling SPA routes correctly

* chore: dev env not handling SPA routes correctly

* feat: support multiple file uploads (#37)

* feat: implement ui

* feat:add validation

* fix: clarify validation

* feat: add multi upload button

* fix: layout and styling

* feat: reformat and add delete logic

* feat: add temporary logic to sumbit

* fix: fix err in temp logic

* feat: implement ui changes

* feat: add 20 ratelimit

* feat: add clientside validation for submission

* feat: rm temp logic

* fix: ratelimit, client erroring

* fix: fe bugs

* feat: make ui nicer

* feat: refactor ui

* fix: cleanup frontend

* feat: finallise UI

* fix: max 10 uploads

* fix: sync select subject constraints with library

* chore(library): update create_note endpoint and service logic

* chore: implement error tracking for specific file box

* feat: endpoint validate types

* fix: handle ui, duplicate docname in form

* fix: prettier and prepare for merge

* chore: refactor

* chore: removed unused import

* chore: handle server validation on FE

* chore: rebase

* chore: finallise ui again

* fix: warns in console

* chore: remove root package.json & update export

* fix: infinite loading on submit

* chore: redo helpertext styling

* refactor(library): update & optimize multi upload service logic

* fix(library): fix transaction and file logic

* test(library): temporarily comment out test

* chore(library): validate endpoint for file limit

* chore(upload-notes): update the style of the uploadpage jsx

* chore: adjust codecov threshold

---------

Co-authored-by: hima <violet@himaa.me>

* Feat/contribute button (#71)

* chore(button): update header to use a common HeaderButton component

* chore(button): update HeaderButton component and user button logic

* feat(header): add contribute notes button

* chore(db): update index for document name and category_id for subject

* fix: fix mobile styling (#70)

* fix: fix mobile styling

* fix: again

* fix: again again

* fix: again again again

---------

Co-authored-by: SebassNoob <78428559+SebassNoob@users.noreply.github.com>
Co-authored-by: tongyu / bucketfish <bucketfishy@gmail.com>

**Full Changelog**: https://github.com/vichannnnn/holy-grail/compare/v0.0.2...v1.0.0

### Feature

- general:
  - support multiple file uploads (#37) ([e0d9b04](https://github.com/vichannnnn/holy-grail/commit/e0d9b0426ff7689e29ae17a8c69e34a8dcb1fa2f)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update ci/cd pipeline for codecov ([4a61ee9](https://github.com/vichannnnn/holy-grail/commit/4a61ee94536f4427e967cf00d82fc69aacad6439))
  - added codecov pipeline & updated tests & README ([184c144](https://github.com/vichannnnn/holy-grail/commit/184c144b053dde692e10715769d9c22f81539d78)) ([#11](https://github.com/vichannnnn/holy-grail/pull/11))
  - update rate limit ([4811419](https://github.com/vichannnnn/holy-grail/commit/4811419f3626253cf1e3d198eb9bd07e18c3086b)) ([#11](https://github.com/vichannnnn/holy-grail/pull/11))
  - increase file size upload limit ([6a3cd69](https://github.com/vichannnnn/holy-grail/commit/6a3cd6999462da0debaff4ecce52dfa3d62a2117))
  -  update endpoint rate limit ([d705e7d](https://github.com/vichannnnn/holy-grail/commit/d705e7d161cc29ffc9d61bd7e48db76ec5b78a7e)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - add tasks to celery ([c214d5f](https://github.com/vichannnnn/holy-grail/commit/c214d5fc047823f2a8e1bd4a72788673dfee294d)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - moved email logic to task ([ff71312](https://github.com/vichannnnn/holy-grail/commit/ff713120a76e50060ef9f4347931d574f0d807f0)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - move email logic to task runner ([ded60be](https://github.com/vichannnnn/holy-grail/commit/ded60bec070c6f43cd96a96f0456277f340135dd)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - add account verify page ([2de338f](https://github.com/vichannnnn/holy-grail/commit/2de338fdfe2c5f02e52d53e21b752be41b746dad)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - added reset password page redirect ([afe74fd](https://github.com/vichannnnn/holy-grail/commit/afe74fd147ca82d0befcdc48f234da499d35e867)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - update frontend to support reset email ([e536a4b](https://github.com/vichannnnn/holy-grail/commit/e536a4b9fcb254353ce8d0fe6f3994d04f195305)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - add new endpoints for reset password ([eb0fbd0](https://github.com/vichannnnn/holy-grail/commit/eb0fbd0abe4a2b13d085df575ff22dcbb63e9113)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - email frontend ([914e826](https://github.com/vichannnnn/holy-grail/commit/914e8269e30f1c8690802f6dcedb04af739b4baa)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - test verify endpoints ([aeca97f](https://github.com/vichannnnn/holy-grail/commit/aeca97f6327afa803a5e62cc1f9a1149d9c2ec26)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - redirect if logged on ([d4be698](https://github.com/vichannnnn/holy-grail/commit/d4be69850df5b8e3075b821f1dbedc1499f9f182))
  - update admin actions buttons and created icon components ([63fceb0](https://github.com/vichannnnn/holy-grail/commit/63fceb0ab1858d3450870df98d66daf38a6919bb))
  - update 50 char -> 100 char limit ([d6cc657](https://github.com/vichannnnn/holy-grail/commit/d6cc65736b74f829aa78f695af98aff2f6f12157))
  - migrated from table to card layout ([0ed55a9](https://github.com/vichannnnn/holy-grail/commit/0ed55a9476808c041bcbe16344d4ac6187d4a31a))
  - update combobox component ([39ec380](https://github.com/vichannnnn/holy-grail/commit/39ec380e57d8bf4b47c08f31dcc83ba111cff58a))
  - add unique to document_name, category, subject and type & updated doc char limit from 40 -> 50 ([5364f1e](https://github.com/vichannnnn/holy-grail/commit/5364f1e2b229b1e914f871ce4671032bbaa25652))
  - update doc name length from 20 -> 30 ([53e5094](https://github.com/vichannnnn/holy-grail/commit/53e50948c74bd96924357acdbefa34a3f4527beb))
  - update auto log out when token expires ([455a7ed](https://github.com/vichannnnn/holy-grail/commit/455a7ed628f8bdd9a0da42a84042382752170190))
  - updated meta tag ([d0d8ce4](https://github.com/vichannnnn/holy-grail/commit/d0d8ce41ed47db2d56b1de08433724b091426eb3))
  - add name for grail documents && update password function ([7850106](https://github.com/vichannnnn/holy-grail/commit/7850106368bd4a2883fde324560d8ef01c81f83a))
  - add document name ([170404a](https://github.com/vichannnnn/holy-grail/commit/170404a2f7683a1674f5f54147c551d0f51ac032))
  - update rate limit ([d9a7f07](https://github.com/vichannnnn/holy-grail/commit/d9a7f07bba45773abe82a8ee09be22937e8db145))
  - update 3 -> 20 for library pagination and updated footer ([0e0c205](https://github.com/vichannnnn/holy-grail/commit/0e0c2059d2558866008d146c411047f541d37f60))
  - update content temporarily ([f17f565](https://github.com/vichannnnn/holy-grail/commit/f17f5655199953bacf4a4a6a900649300350a774))
  - update feature cards ([90a5fee](https://github.com/vichannnnn/holy-grail/commit/90a5fee36856f33381596ae6d0f27fc2a6469a57))
  - update feature card link path ([5d83a91](https://github.com/vichannnnn/holy-grail/commit/5d83a91bb4f4fc484e25df0e760d18b10eb7e5ab))
  - update FAQ content ([55de272](https://github.com/vichannnnn/holy-grail/commit/55de272287b3989f7d302eee422fa0cb32c6595b))
  - finished developer panel ([cf55f90](https://github.com/vichannnnn/holy-grail/commit/cf55f90440a5324f2dca115cedc3291ebe13efd3))
  - added developer panel ([f1c2ff9](https://github.com/vichannnnn/holy-grail/commit/f1c2ff9b0c35527b0d5e8dec16d9ca34e9dbf47d))
  - add placeholder and title for html ([8618232](https://github.com/vichannnnn/holy-grail/commit/86182328b0e9908c0d1a36d9517f731d95659733))
  - add 404 not found page serving ([bf13e96](https://github.com/vichannnnn/holy-grail/commit/bf13e96f1d5b60aea9a25180d85ec5750ab3d792))
  - update table ([f2991f8](https://github.com/vichannnnn/holy-grail/commit/f2991f85ef1b4573e6bc75ee8606a0fa4c420078))
  - update account form component ([d303d2a](https://github.com/vichannnnn/holy-grail/commit/d303d2ac31189c61ea7aa2265cbf4bd663a0825e))
  - mobile first design for navbar ([d7c50d7](https://github.com/vichannnnn/holy-grail/commit/d7c50d7a44102d52f7eda3af1d73d2b94f923ac2))
  - redirect upload if not logged in ([36ebbf8](https://github.com/vichannnnn/holy-grail/commit/36ebbf84c333a1c954228646cb8d5e4f368fae67))
  - removed email, added dockerignore (improved devops) ([efaf594](https://github.com/vichannnnn/holy-grail/commit/efaf594fc7108667407a1b95211eff6c256770e4))

- categories:
  - update subject endpoint and subject education level… (#51) ([217d401](https://github.com/vichannnnn/holy-grail/commit/217d40112a5c02eff5edfeaa1b69cd455696063c)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- dev:
  - update metrics endpoint to return json response and update makefile debug server port (#36) ([da7fe00](https://github.com/vichannnnn/holy-grail/commit/da7fe006eb2d3ce8beacb268b7eaff934d298c8a)) ([#36](https://github.com/vichannnnn/holy-grail/pull/36))

### Bug Fixes

- general:
  - fix mobile styling (#70) ([40c0e48](https://github.com/vichannnnn/holy-grail/commit/40c0e4841f962d16aa03bd075c048505682211fa)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - fix fetchData note filter issue ([ea62f3f](https://github.com/vichannnnn/holy-grail/commit/ea62f3f0f66f01c813fa9bbfc875508dd08571f7)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update data input for tables ([a7e4603](https://github.com/vichannnnn/holy-grail/commit/a7e4603c1a8b8b740c23d6bc1cbecdab2f0b1e27)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - fix ping task url ([07ea270](https://github.com/vichannnnn/holy-grail/commit/07ea2704b95d445c1b60dd848224d3f39e6f4463)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - clear alert on redirect (#64) ([83d09e3](https://github.com/vichannnnn/holy-grail/commit/83d09e381ae72aace105d17d914fa6873f7636b0)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update CORS policy ([3668a36](https://github.com/vichannnnn/holy-grail/commit/3668a36101a8e5a691ce88b81e3ac0c4608c8172))
  - fix typos in FAQ ([cd69cb1](https://github.com/vichannnnn/holy-grail/commit/cd69cb138b40aca23f14c32e043e10544ede429b))
  - updated codecov badge in readme again... ([51ea9be](https://github.com/vichannnnn/holy-grail/commit/51ea9be02de35138ce2f7888662e5a86727c684f))
  - fix codecov badge in readme ([7511d97](https://github.com/vichannnnn/holy-grail/commit/7511d97788704c40b2a066171772456662983b8d))
  - forgot coverage command needs version specification ([8c925f3](https://github.com/vichannnnn/holy-grail/commit/8c925f3b1ea62b89d7937f634560ee9a15ce8489))
  - update email endpoints ([0f6a749](https://github.com/vichannnnn/holy-grail/commit/0f6a74963c80ecb8f2c15957cf2fadedb5fcb887)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - fix task ([db1f8e1](https://github.com/vichannnnn/holy-grail/commit/db1f8e11a0ad6c6a40ac6509cd55ed64b6634a77)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - send new password task error ([b87e2b2](https://github.com/vichannnnn/holy-grail/commit/b87e2b2c1a755df4f0289540e25a3a0a09c87ebc)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - fix typo on task name ([aa866de](https://github.com/vichannnnn/holy-grail/commit/aa866de73a649cec6dd71bb92bc4b11c3692c1ec)) ([#9](https://github.com/vichannnnn/holy-grail/pull/9))
  - typo ([5fb8f93](https://github.com/vichannnnn/holy-grail/commit/5fb8f9337ef1b425203af6e0280626c9c79a32fc)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - fixed navbar css + padding of images ([931c283](https://github.com/vichannnnn/holy-grail/commit/931c283cbbe7f29e1d4b8e513b5646115d777f7e)) ([#4](https://github.com/vichannnnn/holy-grail/pull/4))
  - fix sign up page and upload page ([7dd33f6](https://github.com/vichannnnn/holy-grail/commit/7dd33f6518ea344aba0806493061c2f9c455aaff)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - update forgot password page ([5f4399a](https://github.com/vichannnnn/holy-grail/commit/5f4399a472f823e21e38e16c35ffd8ee1e90f678)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - update table component to fix lint error ([7da9432](https://github.com/vichannnnn/holy-grail/commit/7da9432e5c8bd7a9a99553d4bd3b2e8289b0c8d8)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - fixed routing on mobile for navbar ([bc0ddbf](https://github.com/vichannnnn/holy-grail/commit/bc0ddbfc71ef69b4ba9be6f4941d74308bba9836))
  - fix box ([35af614](https://github.com/vichannnnn/holy-grail/commit/35af614d77986e40bcfd31615355a7f116ed9783))
  - fix mobile layout ([c011725](https://github.com/vichannnnn/holy-grail/commit/c011725396bdfe93348d0f09f2ec864ff808fdcb))
  - update navbar, accountform and library display ([f030905](https://github.com/vichannnnn/holy-grail/commit/f030905f06d3be2af3d08be301b64ddf6e1e6bfa))
  - update signup and login page to better design ([6f1ae8c](https://github.com/vichannnnn/holy-grail/commit/6f1ae8ce58f1c8ff9af22cf82ccce642dc42fa63))
  - lodash dependencies import ([441b5bf](https://github.com/vichannnnn/holy-grail/commit/441b5bf158a5efde5d0ea7739048fdab6ee663f2)) ([#1](https://github.com/vichannnnn/holy-grail/pull/1))
  - fix node dependencies ([81c4b3b](https://github.com/vichannnnn/holy-grail/commit/81c4b3b49173226f954322a80db7ea79192812d0)) ([#1](https://github.com/vichannnnn/holy-grail/pull/1))
  - fix pagination total count error ([cf563fc](https://github.com/vichannnnn/holy-grail/commit/cf563fc1780da9a07978504eaf7cbce9ad0c9d94)) ([#1](https://github.com/vichannnnn/holy-grail/pull/1))
  - update pagination missing pages parameter ([1c4fcc0](https://github.com/vichannnnn/holy-grail/commit/1c4fcc0b28af843e7a548577467305e79a4c70e2))
  - handle 409 for document note name ([1e5d6bd](https://github.com/vichannnnn/holy-grail/commit/1e5d6bd401bd02eea0059e81198d9332ed9e6201))
  - update prod caddy config ([ff7447f](https://github.com/vichannnnn/holy-grail/commit/ff7447f0f78a354ac0dcd4856613b2d8d62accea))
  - caddyfile prod config ([58ea697](https://github.com/vichannnnn/holy-grail/commit/58ea697242c3f9e114208c78602e5f3dbc2f1e05))
  - update production mode ([8297062](https://github.com/vichannnnn/holy-grail/commit/8297062c2fe114cc2c73fcef751e97234bad11cb))
  - center navbar properly ([7ff34bf](https://github.com/vichannnnn/holy-grail/commit/7ff34bf02eed4b93286de781ff033d7c325f603a))
  - fixed pagination component logic ([64e2f0b](https://github.com/vichannnnn/holy-grail/commit/64e2f0be5ecaf50a9d4ed8de605ce93ff9625ee4))
  - fix 0 page issue ([91db13b](https://github.com/vichannnnn/holy-grail/commit/91db13b015b96c3698b0445b78f636c51e11cb78))
  - fix the password validation box component ([f414341](https://github.com/vichannnnn/holy-grail/commit/f414341a4896445fa54b19b2543b60a1fbfe83f2))
  - update library to fit mobile first ([ae13c4e](https://github.com/vichannnnn/holy-grail/commit/ae13c4e55f922e6c659743a8ec226ceae1776bcb))
  - redirect component return error ([7746661](https://github.com/vichannnnn/holy-grail/commit/7746661ab88909d0c6bb6164dc2d8c54f81bc0a2))
  - updated navbar ([f2adaf1](https://github.com/vichannnnn/holy-grail/commit/f2adaf1c1b30d9dae09cbd92a9b70ac624d45cd3))
  - revert navbar ([6b9eca8](https://github.com/vichannnnn/holy-grail/commit/6b9eca80fa682f2d02d79557662efb96d839f6f2))
  - resize ([8300f95](https://github.com/vichannnnn/holy-grail/commit/8300f959c1ceccf356ad6e2766c596a436a1e696))
  - fix browser size 100% ([62e3b31](https://github.com/vichannnnn/holy-grail/commit/62e3b311dd376886e7cb35aa033bcf2ff380d301))
  - added container dependency to prevent deployment issue & updated requirements dependency ([5c1272d](https://github.com/vichannnnn/holy-grail/commit/5c1272d2e241209571ff2048c451faad960ffbb1))

- make:
  - command fix ([357834d](https://github.com/vichannnnn/holy-grail/commit/357834d714699c35d2ace32502f0bafb10fe9b05)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- upload-file:
  - update register account error description ([e5e590d](https://github.com/vichannnnn/holy-grail/commit/e5e590d6b3a79d601f83c747fec1ff2e6eff5c4e)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- email:
  - update email template to reflect variables input (#66) ([ea18c0d](https://github.com/vichannnnn/holy-grail/commit/ea18c0d1b7c1746ee98e001861595011ebc202f8)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- makefile:
  - update test to fail immediately if there is a fail ([3a02ff7](https://github.com/vichannnnn/holy-grail/commit/3a02ff7b6833e3e6b03cb1c2fc44df9eb50c6d35)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update codecov command with testing var ([d80c9dd](https://github.com/vichannnnn/holy-grail/commit/d80c9ddd09333bdced746c15e44f91b80ab44974)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- ci:
  - update alls-green ([d448a9d](https://github.com/vichannnnn/holy-grail/commit/d448a9df6565eeef4261b42b43a888e6cb70b2cb)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update env step ([b91cbd8](https://github.com/vichannnnn/holy-grail/commit/b91cbd82bf4773a588b9f4fd2b4db271d7ad4b4d)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update env step ([2da0e7c](https://github.com/vichannnnn/holy-grail/commit/2da0e7c4b4696b77238946b1d640298360296f58)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update env step ([90840f4](https://github.com/vichannnnn/holy-grail/commit/90840f4385fcce1b3f0e522faec52c102a11a254)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update conclusion success trigger ([4771183](https://github.com/vichannnnn/holy-grail/commit/4771183730db751d3d03396726eff342f0c39f15)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update trigger config ([bb778f5](https://github.com/vichannnnn/holy-grail/commit/bb778f5c8b35a133a2655dc3caa5543b36379c25)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update trigger config ([ebc2920](https://github.com/vichannnnn/holy-grail/commit/ebc2920b3912955164c455ffad03c7d746e2aa8c)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update trigger config ([0f0a7c6](https://github.com/vichannnnn/holy-grail/commit/0f0a7c685b6c834f81dbd37311a075ac683d4ca1)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update trigger config ([9f74b1b](https://github.com/vichannnnn/holy-grail/commit/9f74b1b5f8fe90321896358e324692bbf07035f9)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update ci to log in before pulling ([f5a406d](https://github.com/vichannnnn/holy-grail/commit/f5a406d2741a24c0f5456c918204420dfe7aa3f5))

- ci/docker-compose:
  - update prod ci and compose config ([b468cbf](https://github.com/vichannnnn/holy-grail/commit/b468cbfee9e3e2c57ec02c69c897a1cc1885435d))

### Refactor

- library:
  - optimize the library loading logic by removing redundant endpoint calls ([5e6c039](https://github.com/vichannnnn/holy-grail/commit/5e6c03971f5e37d4417292f6ee4efb11e6e5cdde)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- general:
  - clean up remaining imports ([831d517](https://github.com/vichannnnn/holy-grail/commit/831d5174605658641aefa3580c1b4a97d8ceb1d2)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - removed unused import ([05730ed](https://github.com/vichannnnn/holy-grail/commit/05730ede61a22a353ee712e6d98feef1f4f7f6bd)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - update makefile ([7bd4193](https://github.com/vichannnnn/holy-grail/commit/7bd41934aa2a7444571b2e9d14c93d7fe3dd8a71)) ([#8](https://github.com/vichannnnn/holy-grail/pull/8))
  - prettier ([c108777](https://github.com/vichannnnn/holy-grail/commit/c10877781fb99271344b2fe73b6631bc01515ebd))
  - prettier ([10d743a](https://github.com/vichannnnn/holy-grail/commit/10d743a426542387e747db6b3cb147c6cd50a54e))
  - update s3 bucket url ([886d310](https://github.com/vichannnnn/holy-grail/commit/886d310620f8e40dac324fe3c3f3f313322aa01a))
  - update directory ([232f579](https://github.com/vichannnnn/holy-grail/commit/232f579ed64d3c5d6bbeeb7c606a430122e70f62))
  - removed reset password for now ([08f6e18](https://github.com/vichannnnn/holy-grail/commit/08f6e181bfa3819799f7a741a1fd6aa35faf3be8))
  - migrated to monorepo for frontend and backend service ([1a1a7af](https://github.com/vichannnnn/holy-grail/commit/1a1a7af721de208611aea0dcbbc0d460bd30182b))

- frontend:
  - update all provider barrel imports & update tsconfig ([2933ed3](https://github.com/vichannnnn/holy-grail/commit/2933ed3c77681029c53ca551e880f637ed815515)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - update all components and features to barrel imports & remove default exports ([f8babff](https://github.com/vichannnnn/holy-grail/commit/f8babffd227e0256436e6c8804ed16ce70cc793a)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

- app:
  - ran black formatter ([01ea321](https://github.com/vichannnnn/holy-grail/commit/01ea321b4f47ab916f15c7d5af6b4a7c01bc03b9))

###  Tests

- general:
  - test ([06e39e3](https://github.com/vichannnnn/holy-grail/commit/06e39e37abba46ca7716b5c395af92ef04024883)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - test (#47) ([26257ec](https://github.com/vichannnnn/holy-grail/commit/26257ecb2e756aea8009e36c3a55e1c450f6d2b1)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))
  - test ([f19c65c](https://github.com/vichannnnn/holy-grail/commit/f19c65cc3a31945a777170ae1b0890d727cbee35))
  - test mobile update ([9c6269d](https://github.com/vichannnnn/holy-grail/commit/9c6269deafd16375443c6f4f0f601e34e9137803))
  - test ([f5e61b8](https://github.com/vichannnnn/holy-grail/commit/f5e61b89c0ef46561957d8d9e5f9cf328cea6d11))
  - test css fix ([7d39b67](https://github.com/vichannnnn/holy-grail/commit/7d39b67f4ea37af371c2e7e6504cb6d79c11b3a8))
  - test meta ([c5198eb](https://github.com/vichannnnn/holy-grail/commit/c5198eb55842155f7ecc70f1a5ee8db7d5dc19a3))
  - test ([0b8fb98](https://github.com/vichannnnn/holy-grail/commit/0b8fb98ceafdbe67da12725e1d1d2ce8a60f7a3e))
  - test validation box ([3d724f7](https://github.com/vichannnnn/holy-grail/commit/3d724f72e4edd7163f8c304a323bd089fcbd1e0d))
  - test ([94da501](https://github.com/vichannnnn/holy-grail/commit/94da50131e3e508baa1a278c62eb667950511d5d))
  - test ([b035e55](https://github.com/vichannnnn/holy-grail/commit/b035e550a10d309c0418c96701ee2dd446e94726))
  - test ([b36bee1](https://github.com/vichannnnn/holy-grail/commit/b36bee1f328963b300a5075b2835043bf5c9cfe4))

- ci:
  - update ci trigger for deploy and build and test fail test (#46) ([3276315](https://github.com/vichannnnn/holy-grail/commit/327631506dfce322f057fe3497e77322980a8599)) ([#72](https://github.com/vichannnnn/holy-grail/pull/72))

\* *This CHANGELOG was automatically generated by [auto-generate-changelog](https://github.com/BobAnkh/auto-generate-changelog)*
