# CHANGELOG

## [v1.0.5](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.5) - 2023-11-28 12:26:54

- Adhering frontend components to SRP, separating many common reused components such as Button as well as modularizing the view component. 
- Added ad analytics features.

### Feature

- general:
  - add some margin top on header ([dfaa81c](https://github.com/vichannnnn/holy-grail/commit/dfaa81cc6a049e9f70652a05065e2d65b2d3a470))
  - update README to reflect new changes as well as some housekeeping ([859cff3](https://github.com/vichannnnn/holy-grail/commit/859cff3f3dfbb0084e2426596ccd75d283eafd79))
  - update rate limit for ad view ([3564050](https://github.com/vichannnnn/holy-grail/commit/356405063ef9d3b8d940017293e248bb53e75396))
  - update ads click analytics function ([9a9ab06](https://github.com/vichannnnn/holy-grail/commit/9a9ab06d6d8119d2f51a139d2b0b6642661754de))
  - update ad analytics endpoints ([79564a1](https://github.com/vichannnnn/holy-grail/commit/79564a12facff60b4b974e226811fa4fa581963e))
  - add ratelimits, auth for ad analytics ([da66e80](https://github.com/vichannnnn/holy-grail/commit/da66e8006e0e05d4b2059229468757ca2ca947b7))
  - add scheduler ([b7e0397](https://github.com/vichannnnn/holy-grail/commit/b7e0397750a0492c3aa3e44a942fe12dec6dd145))
  - add ad analytics ([aba86c1](https://github.com/vichannnnn/holy-grail/commit/aba86c1536b9d55b4b7c0741316670ece6686ae0))
  - add fade in ([dc4c55e](https://github.com/vichannnnn/holy-grail/commit/dc4c55e9badd4b059aa0a8ee8a7362251048c8c8))
  - update anchorOrigin and transformOrigin ([14302db](https://github.com/vichannnnn/holy-grail/commit/14302db004c097763746f758ab2039a59ff3a7cc))
  - update hero component ([4165535](https://github.com/vichannnnn/holy-grail/commit/4165535d9a58c4ba140a9d124fe165cee341cbe5)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - separate hero component view & update Header ([21404e7](https://github.com/vichannnnn/holy-grail/commit/21404e7a544458649069e489c53219c181837bcc)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update footer margin spacing between ads ([1d81a33](https://github.com/vichannnnn/holy-grail/commit/1d81a330a5f041c5ef83165bae703b67ad177c59)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update mobile design for upload page ([0a7ad1a](https://github.com/vichannnnn/holy-grail/commit/0a7ad1a7d8f5b3e8199e8e750b26de45e10eacc3)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update upload page components ([419364b](https://github.com/vichannnnn/holy-grail/commit/419364beeff6a8dec249c35079d27979eb03160e)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update developer component & file structure ([4aefe51](https://github.com/vichannnnn/holy-grail/commit/4aefe5168bd0a4a5abb157afa31aadaa7e22f594)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update hero description ([c9ec974](https://github.com/vichannnnn/holy-grail/commit/c9ec974d471b029dca68ec5f7e226290a99075b8)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update dropdown and dropdown items styling ([435b799](https://github.com/vichannnnn/holy-grail/commit/435b799ab6f18832da2be5a8eaab5a778fcca998)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update account details min height ([0f75e10](https://github.com/vichannnnn/holy-grail/commit/0f75e104280bb39f189364f646fc8926888a4665)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update update email account details component ([091e6c6](https://github.com/vichannnnn/holy-grail/commit/091e6c6b3689f79a51aa3bf990c0a989e3fb4b80)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update account details component ([3790eca](https://github.com/vichannnnn/holy-grail/commit/3790eca1a0bbed7ad7ca7060b16e35c8d693632a)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update account details component for desktop ([3bc4181](https://github.com/vichannnnn/holy-grail/commit/3bc41810c6669ff2f2db3bedaf0bd27ae24f2582)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update forgot password page component ([2ec87e6](https://github.com/vichannnnn/holy-grail/commit/2ec87e63bade9d716e8b344353a33d9944882c1a)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - remove AccountForm component and update user account components ([8a835f8](https://github.com/vichannnnn/holy-grail/commit/8a835f89e62c19adb3ccab6032563522a92a156a)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - modularise account form css and update sign up page form component ([63b2a93](https://github.com/vichannnnn/holy-grail/commit/63b2a933b156695393bbc093598cc27122b4b074)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update button base styling ([923de39](https://github.com/vichannnnn/holy-grail/commit/923de395c993fdc2af9fa9a19c4a7d6992e0d037)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update TextLink component and update library text-based ads ([b39bf9f](https://github.com/vichannnnn/holy-grail/commit/b39bf9fafa1c7661c058af19eed084eecb86bf9c)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - rewrite footer css ([978f3f5](https://github.com/vichannnnn/holy-grail/commit/978f3f5e302ed05a294418bf9cba073926bf515b)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update library and approval page css ([3c1caa4](https://github.com/vichannnnn/holy-grail/commit/3c1caa49428f8e2cf09d48be7cf5e7e600eac90a)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - separate WelcomeBackHeader to common component and update notes table ([d71c5e5](https://github.com/vichannnnn/holy-grail/commit/d71c5e553ab8118b746203036c94729f13d587ca)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update Hero button to base button component for consistency ([ea83789](https://github.com/vichannnnn/holy-grail/commit/ea837894386db0eb2a2adabc194e1839d517b2c1)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update FAQ css and components ([3c6ed19](https://github.com/vichannnnn/holy-grail/commit/3c6ed1981a8697b01204c0dc4db5cfc3aa06034f)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update header button view & separate components to their own responsibilities ([f95fbb6](https://github.com/vichannnnn/holy-grail/commit/f95fbb6a14498a30d1e6bbd897e1d2b1e48e314c)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update ads with hyperlink ([4f3c3e6](https://github.com/vichannnnn/holy-grail/commit/4f3c3e6ee57062c9919a802efcb1e5bf08e6e14a)) ([#147](https://github.com/vichannnnn/holy-grail/pull/147))
  - update ad text on library ([be79856](https://github.com/vichannnnn/holy-grail/commit/be7985679db18a3bc59323ee8107c56f2ef082b1)) ([#145](https://github.com/vichannnnn/holy-grail/pull/145))
  - add info button to ads and update mobile responsiveness ([2ada8f2](https://github.com/vichannnnn/holy-grail/commit/2ada8f2bedbbc291cd9a79ab419c0c3110462006)) ([#132](https://github.com/vichannnnn/holy-grail/pull/132))
  - add ads banner above footer ([1530fbd](https://github.com/vichannnnn/holy-grail/commit/1530fbd2a4730746945b82f03784a117c468f39b)) ([#131](https://github.com/vichannnnn/holy-grail/pull/131))
  - add cache headers to uploaded docs ([6e04d7b](https://github.com/vichannnnn/holy-grail/commit/6e04d7b3ecef775e3a5d2e7a7c9171ab65dab339)) ([#129](https://github.com/vichannnnn/holy-grail/pull/129))
  - update favicons & fix CountUp component ([e977ef9](https://github.com/vichannnnn/holy-grail/commit/e977ef9c40fe31b175348c378d1d6e23adf1705f))
  - update footer with contact us email ([3a4ac6d](https://github.com/vichannnnn/holy-grail/commit/3a4ac6df62020aad0a43cfd2c7ddebc055f8d8c8))
  - update count animation to only start when scrolled into viewport ([737355c](https://github.com/vichannnnn/holy-grail/commit/737355c21942f0df5c9edc385d167c696222bc94)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update landing page to add analytics section ([3963519](https://github.com/vichannnnn/holy-grail/commit/39635191d72981ca6487905eee7b94d998f0b4a7)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - add analytics endpoint ([976562b](https://github.com/vichannnnn/holy-grail/commit/976562bb41f7f277843ca3bfdb7b3beedc947cb0)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - create analytics count feature ([3c27205](https://github.com/vichannnnn/holy-grail/commit/3c27205605129cb179b0628e46269fc41ce4f8b0)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update landing for mobile ([88c58f5](https://github.com/vichannnnn/holy-grail/commit/88c58f55d3a1707123be9ec384c13dd695051fc5)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - add auto log out once jwt expires ([fda1511](https://github.com/vichannnnn/holy-grail/commit/fda151195d08a6d135b2a8dfb1afb414a01c3b0f)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update dropdown selection with icon ([6401e4f](https://github.com/vichannnnn/holy-grail/commit/6401e4f29cdd4c7ec50fdd0243d5d14cdcdee4b7)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update approval and developer page to restrict access properly ([3f7f678](https://github.com/vichannnnn/holy-grail/commit/3f7f67864c2fc08bc94a7cc00c488add97853427)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update rate limit for download endpoint to 20/5 minutes to prevent abuse ([6171233](https://github.com/vichannnnn/holy-grail/commit/6171233941c32d7e39d445e73a8d9a00d8fc38d2))
  - update backend to allow zip files upload and proper download flow ([db74aa5](https://github.com/vichannnnn/holy-grail/commit/db74aa501f10bc24faeb9b2ed5ab39d04ed2d4eb)) ([#118](https://github.com/vichannnnn/holy-grail/pull/118))
  - update to allow developer roles to upload something other than pdf ([b5293f3](https://github.com/vichannnnn/holy-grail/commit/b5293f3797e360617d3e6561073ddd3ac94845de)) ([#118](https://github.com/vichannnnn/holy-grail/pull/118))

### Bug Fixes

- general:
  - trimmed mascot image on landing page ([66706ff](https://github.com/vichannnnn/holy-grail/commit/66706ffe4317935bd09d8a32487c4c29e9dba9b8))
  - accidentally removed footer css ([c89f386](https://github.com/vichannnnn/holy-grail/commit/c89f3869dd293b92d24ed8dad456fe6c6abcb2c5))
  - hit db directly with ad analytics cronjob ([03fefcb](https://github.com/vichannnnn/holy-grail/commit/03fefcb89c9af2887e35107b460aecc03bb567f8))
  - wrong env ([d23058c](https://github.com/vichannnnn/holy-grail/commit/d23058cf535ea4568a26b5c9dde273a84efd88a4))
  - update env again ([0d3d0ed](https://github.com/vichannnnn/holy-grail/commit/0d3d0ed5f7fcdb861f4fe87970c23506d68709ab))
  - test env ([ab304f9](https://github.com/vichannnnn/holy-grail/commit/ab304f9bf54a821b8f9bc0b2ad53015636d3a96e))
  - update bun docker image version ([ede4efd](https://github.com/vichannnnn/holy-grail/commit/ede4efde3e411be6fd79f216ee735b67e0701f39))
  - downgrade vite version for stability ([fc8723f](https://github.com/vichannnnn/holy-grail/commit/fc8723fd901075ec878fb652c97a526c56557ade))
  - test origin again ([6f19242](https://github.com/vichannnnn/holy-grail/commit/6f19242acedd05373f57abad56e30052d328bfe3))
  - update ci ([90b3164](https://github.com/vichannnnn/holy-grail/commit/90b3164aaccf3ae399cdc78d460171385cbe3786))
  - update menu origin again ([c754f4a](https://github.com/vichannnnn/holy-grail/commit/c754f4a5172790d7bda6610bd56907561e8b6581))
  - update menu anchor origin ([867dda7](https://github.com/vichannnnn/holy-grail/commit/867dda79cdd74e253c19048ac4dcf7a2bef729d2))
  - update footer styling ([e635be7](https://github.com/vichannnnn/holy-grail/commit/e635be75766b9161da1ba1c54e206c2c0053c1de)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - convert rem in footer css to px and fix gap styling for mobile ([7509a30](https://github.com/vichannnnn/holy-grail/commit/7509a301a758a10ca66cb627a7142b73cd3c8401)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update styling for account details for mobile ([4c7e998](https://github.com/vichannnnn/holy-grail/commit/4c7e99842fe8dc42b46bc1a1ef2c58c22aef0e44)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update button styling for upload page ([1155045](https://github.com/vichannnnn/holy-grail/commit/1155045c563f80beb71ddc12293cf067aef25e23)) ([#150](https://github.com/vichannnnn/holy-grail/pull/150))
  - update proper foreign key constraint to prevent wrong subject and education combination ([f20fdec](https://github.com/vichannnnn/holy-grail/commit/f20fdec98c4ac1c934046d859486502795a9703b)) ([#142](https://github.com/vichannnnn/holy-grail/pull/142))
  - fix greenlet issue on note update ([3516d0d](https://github.com/vichannnnn/holy-grail/commit/3516d0d1aed157646d7c77a201b057ac23156de9)) ([#142](https://github.com/vichannnnn/holy-grail/pull/142))
  - fix greenlet issue on note update ([8b07067](https://github.com/vichannnnn/holy-grail/commit/8b0706706bd005addafcc43c8c13cd9b5553685c)) ([#142](https://github.com/vichannnnn/holy-grail/pull/142))
  - fix deploy script ([3aad568](https://github.com/vichannnnn/holy-grail/commit/3aad568d13a3079ed24a02334734246224f04246)) ([#142](https://github.com/vichannnnn/holy-grail/pull/142))
  - update dev ci script ([30979a9](https://github.com/vichannnnn/holy-grail/commit/30979a9d698c5bb8db6eb6394bd3ab33c004d370)) ([#142](https://github.com/vichannnnn/holy-grail/pull/142))
  - update timezone aware for analytics ([007b020](https://github.com/vichannnnn/holy-grail/commit/007b020dfce869edaa3296f73f43f3bcde9558e7)) ([#137](https://github.com/vichannnnn/holy-grail/pull/137))
  - update ci dependencies for frontend ([25d7ec6](https://github.com/vichannnnn/holy-grail/commit/25d7ec65d3d1f9c3f084900037384026e1bd38ac)) ([#137](https://github.com/vichannnnn/holy-grail/pull/137))
  - fix analytics job and update dependencies for backend ([955914f](https://github.com/vichannnnn/holy-grail/commit/955914ff35765754bf4a6ef8f1a2c53293f86bd8)) ([#137](https://github.com/vichannnnn/holy-grail/pull/137))
  - update package json script ([78c9ec1](https://github.com/vichannnnn/holy-grail/commit/78c9ec1709c57b5d395c5f925c32609014bc7936))
  - update tooltip for mobile behavior ([c2e74ac](https://github.com/vichannnnn/holy-grail/commit/c2e74acc4f99299346af804cbcaee1dfc472c6d6)) ([#133](https://github.com/vichannnnn/holy-grail/pull/133))
  - update ci ([bafb83b](https://github.com/vichannnnn/holy-grail/commit/bafb83bebf015fcee678c9bd18508371855d7f91)) ([#134](https://github.com/vichannnnn/holy-grail/pull/134))
  - update email template logo and hyperlink ([204ba29](https://github.com/vichannnnn/holy-grail/commit/204ba2930f099c344b28bc881e472fe7e66b003c))
  - temp fix for ipad for tables ([2d36a0d](https://github.com/vichannnnn/holy-grail/commit/2d36a0de7216ca629742b76b7e58364fe2f25e17))
  - update breakpoint for ipad Air landing display and update apple touch icon ([85237e5](https://github.com/vichannnnn/holy-grail/commit/85237e59f3ccc224708804a64d8e3114e34ee9af))
  - update analytics task endpoint ([1e531f2](https://github.com/vichannnnn/holy-grail/commit/1e531f253dd9a42f528eb82743e2029f9a89af74)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - update divider margin ([457bb5a](https://github.com/vichannnnn/holy-grail/commit/457bb5a3b74e8ee2fc845ba582cec966bd73dde8)) ([#125](https://github.com/vichannnnn/holy-grail/pull/125))
  - fix an issue with download endpoint missing request parameter ([3fa4a8f](https://github.com/vichannnnn/holy-grail/commit/3fa4a8f040efa80e23b8f4cfff5a4b2b812d6102))
  - update download url to cloudfront ([db5b2d5](https://github.com/vichannnnn/holy-grail/commit/db5b2d53454b4fd84d04f10c13c7b6e245e0ba9d))
  - forgot to add cloudfront env on container ([ce5b69f](https://github.com/vichannnnn/holy-grail/commit/ce5b69f31e3716137e1bf5e282f02e8afd4e2c22))
  - update cloudfront env var for download endpoint ([87113de](https://github.com/vichannnnn/holy-grail/commit/87113de78bb514bc788bc47e46c97479f6b943fb))
  - remove extra append for extension on notestable ([f311bb0](https://github.com/vichannnnn/holy-grail/commit/f311bb01f80a093093b0781e59a90facee93e9ed))
  - update migration script to include dot ([b82300c](https://github.com/vichannnnn/holy-grail/commit/b82300c2131bc46a85b51c52ee9175288ac84cca))
  - fix mobile component not displaying document ([dbc6d52](https://github.com/vichannnnn/holy-grail/commit/dbc6d526f2df8b3abb0da9c133d11fad54943435))
  - fix a bug where download is forbidden ([62907bc](https://github.com/vichannnnn/holy-grail/commit/62907bcd14470c5a36b351a1841d442406adf828)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - remove extra extension on download endpoint ([a3e75c3](https://github.com/vichannnnn/holy-grail/commit/a3e75c3905911e69f81efe72e49dba30220740eb)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - update file extension append logic ([71e56a7](https://github.com/vichannnnn/holy-grail/commit/71e56a7527103698f9272eb57b451fda4bb2c51d)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - fix issue where downloaded file is in txt ([d17b67a](https://github.com/vichannnnn/holy-grail/commit/d17b67aedf7405fe9a608d3af5d1d02002be6de5)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - add extension column to the library table to handle multiple files ([7ca0d44](https://github.com/vichannnnn/holy-grail/commit/7ca0d44b505e917a660211e8d2443541c8f383bb)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - fix a bug where download is forbidden ([9f56347](https://github.com/vichannnnn/holy-grail/commit/9f563473cfcc559ec3a0d8b0784fa5a2bf7e06d3)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - remove extra extension on download endpoint ([49f3b3d](https://github.com/vichannnnn/holy-grail/commit/49f3b3d1ca34b3938612ae1d2ea343b6b4b7f620)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - update file extension append logic ([ae8e425](https://github.com/vichannnnn/holy-grail/commit/ae8e425918d124b9b9342a859e1b5bc8f47723f2)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - fix issue where downloaded file is in txt ([e37e786](https://github.com/vichannnnn/holy-grail/commit/e37e7861f3567060e71d27e7f71250f292c0f9b3)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - add extension column to the library table to handle multiple files ([0efa905](https://github.com/vichannnnn/holy-grail/commit/0efa905fd5e0d31388da835ab77f35e8f8b3c075)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - add descriptive error for more than 25 documents upload ([680c2bc](https://github.com/vichannnnn/holy-grail/commit/680c2bcf1a0a48ea9d656ada2ac8324621499b37)) ([#117](https://github.com/vichannnnn/holy-grail/pull/117))
  - fix backend validation for upload notes ([5dc3039](https://github.com/vichannnnn/holy-grail/commit/5dc3039438c1c5a2459330b91a136a414812eb39)) ([#117](https://github.com/vichannnnn/holy-grail/pull/117))

###  Tests

- general:
  - tests: add more tests ([71f8949](https://github.com/vichannnnn/holy-grail/commit/71f8949a8d2e3def91b9023e3411e403d39d80fe)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - tests: update tests for upload note ([5255a1a](https://github.com/vichannnnn/holy-grail/commit/5255a1a714ad37b032fdfbd88324923741e2295f)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - tests: add more tests ([07a43f7](https://github.com/vichannnnn/holy-grail/commit/07a43f7a47241a704284b51af49c1864d74b0b4c)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))
  - tests: update tests for upload note ([d54e133](https://github.com/vichannnnn/holy-grail/commit/d54e13338f86ac28d5e580abc63a956ea3e0fa83)) ([#122](https://github.com/vichannnnn/holy-grail/pull/122))

## [v1.0.4](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.4) - 2023-08-26 07:39:36

Upload QOL Features & bug fixes

### Feature

- general:
  - remove unique doc name ([8938c1d](https://github.com/vichannnnn/holy-grail/commit/8938c1db1f9f1c1d76baf00ba666ddd41c55e2d6)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - if a user navigates directly to /login as a logged in user, they will be redirected back to homepage ([8df2b30](https://github.com/vichannnnn/holy-grail/commit/8df2b30d63a189dd6a9fd1f77b467734450971bb)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - add upload item popover ([1cebf59](https://github.com/vichannnnn/holy-grail/commit/1cebf59e43a738a00ff532bd129f6df3d429aa19)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - optimize api call logic on the frontend ([92c8a77](https://github.com/vichannnnn/holy-grail/commit/92c8a770ad01532d4fa4e52bffd9a877107be924)) ([#97](https://github.com/vichannnnn/holy-grail/pull/97))
  - implement email endpoint and UI ([52b7888](https://github.com/vichannnnn/holy-grail/commit/52b78881694e6165dc19263401fc1ddc25659210)) ([#97](https://github.com/vichannnnn/holy-grail/pull/97))

- upload-note:
  - update upload ux to include syncing multiple notes attributes ([43d586d](https://github.com/vichannnnn/holy-grail/commit/43d586d1c5b28d3c4aab11ad74602d7e11d39894)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - migrate UploadNote and UploadPage component to react-hook-forms ([bc7373f](https://github.com/vichannnnn/holy-grail/commit/bc7373f0e2ab5aaf49a6443c8a5272a7ecf4567e)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))

- email:
  - update email logo and css styling ([03a8499](https://github.com/vichannnnn/holy-grail/commit/03a8499c27fed5ab5d9b83d588a8d481dc6604e3)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))

- header:
  - update header css and new logo ([51630c0](https://github.com/vichannnnn/holy-grail/commit/51630c0c219a8e0bcca6549ee545dc7aa796037b)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))

- footer:
  - update footer logo ([956152f](https://github.com/vichannnnn/holy-grail/commit/956152f134ab7baff2b5aea4c4bb18af662e92d4)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))

- library:
  - add download button ([50ea070](https://github.com/vichannnnn/holy-grail/commit/50ea07060b3b13f701c9b751666284cf3a2d106c)) ([#100](https://github.com/vichannnnn/holy-grail/pull/100))

### Bug Fixes

- general:
  - combobox moving when there is an error ([32cde79](https://github.com/vichannnnn/holy-grail/commit/32cde794e21d981beb32896cf0feca0002bd4110)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - check for verified when uploading ([952b1ae](https://github.com/vichannnnn/holy-grail/commit/952b1aed7ecebb6be1440cc2586f7d50b5637365)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - fix 429 error not showing properly to the user when rate limit exceeded for upload ([ad2bfb9](https://github.com/vichannnnn/holy-grail/commit/ad2bfb9c6a8953e758bd56531f2d9adafcaf9c4c)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - update submit button for upload note ([033c1fa](https://github.com/vichannnnn/holy-grail/commit/033c1fabc68789fa4239fc921ab66fe020ea4e36)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - fix icon css and dropdown for mirroring function ([c7e35fa](https://github.com/vichannnnn/holy-grail/commit/c7e35fa2acfabb397f1049f165543ab84a183085)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - fix an issue where non-logged in users are able to access the upload page without being redirected ([b4d141c](https://github.com/vichannnnn/holy-grail/commit/b4d141c7bdf4bd696db6d10a0a87521ff7a0a416)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - fix an issue where clearing or changing category doesn't clear the subject field properly in form data ([58b3e2e](https://github.com/vichannnnn/holy-grail/commit/58b3e2ee8dba82f485cc429874c51bc117f1f2a6)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - first note not mirroring ([37f5efe](https://github.com/vichannnnn/holy-grail/commit/37f5efee6670da71d4537c4666b5ff75b6cd8f46)) ([#109](https://github.com/vichannnnn/holy-grail/pull/109))
  - mobile upload spacing ([6785b9e](https://github.com/vichannnnn/holy-grail/commit/6785b9eb16ca89cea514e635122b5149aef3968c)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))
  - uncomment login logic ([5019770](https://github.com/vichannnnn/holy-grail/commit/5019770ec13130f469623190511281c837fc3788)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))
  - mobile upload spacing ([24ca117](https://github.com/vichannnnn/holy-grail/commit/24ca1179fc4b329ff8e3fd6277fea04654c30477)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))
  - uncomment login logic ([77c07f5](https://github.com/vichannnnn/holy-grail/commit/77c07f5cf9e21eaf74c92cf88dba85b837819cf8)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))
  - mobile upload spacing ([fa568ab](https://github.com/vichannnnn/holy-grail/commit/fa568ab7da2651fdaeda0c0dafad44064e78099f)) ([#104](https://github.com/vichannnnn/holy-grail/pull/104))
  - uncomment login logic ([ef8859a](https://github.com/vichannnnn/holy-grail/commit/ef8859ac5d284b18e1335a2ea610138012e09732)) ([#103](https://github.com/vichannnnn/holy-grail/pull/103))
  - mobile upload spacing ([a96df84](https://github.com/vichannnnn/holy-grail/commit/a96df84cc0d860a8c5fc1f618fdb8b92d38702d1)) ([#103](https://github.com/vichannnnn/holy-grail/pull/103))
  - update sonar project key ([5b58766](https://github.com/vichannnnn/holy-grail/commit/5b5876684379dfcc4bf8ed73c1f0943d57f914c2)) ([#101](https://github.com/vichannnnn/holy-grail/pull/101))

- upload-note:
  - fix collapse icon ([00a41fc](https://github.com/vichannnnn/holy-grail/commit/00a41fc22bf4d5a0f72ce09a3b34fab2bb921210)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))

- auth:
  - error display when creating account ([c3c8cb2](https://github.com/vichannnnn/holy-grail/commit/c3c8cb2c4296c430734e4f99eb0151712ccaee93)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))

- email:
  - update email css layout ([95aa0e3](https://github.com/vichannnnn/holy-grail/commit/95aa0e33f0ca6c9914f1710f901f97d2b3ddea0d)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))

- library:
  - update subject icon styling ([b66a019](https://github.com/vichannnnn/holy-grail/commit/b66a01994f647a28dac2b7803e6fe176f53c751b)) ([#106](https://github.com/vichannnnn/holy-grail/pull/106))

- upload-page:
  - fix mobile styling for upload page ([e6165ef](https://github.com/vichannnnn/holy-grail/commit/e6165effa0024a48100eb6fd363e2b7c6cab0440)) ([#101](https://github.com/vichannnnn/holy-grail/pull/101))

- upload:
  - fix upload endpoint route ([664f34e](https://github.com/vichannnnn/holy-grail/commit/664f34e57bae074e9550a1e2498f2cf69b232b68)) ([#97](https://github.com/vichannnnn/holy-grail/pull/97))

## [v1.0.3](https://github.com/vichannnnn/holy-grail/releases/tag/v1.0.3) - 2023-08-06 10:15:20

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
