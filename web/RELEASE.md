## Progressive Web Scaffold
- [ ] Branch off of `develop` and create a `release-vX.Y.Z` branch.
- [ ] Create a new pull request with the following settings:
      * Base: `master`
      * Compare: `release-vX.Y.Z`
      Paste the contents of this checklist into this pull request.
- [ ] Update the version of the `progressive-web-sdk` npm module in `package.json`.
- [ ] Make necessary changes to make it compatible with the latest release of the `progressive-web-sdk`.
- [ ] In the CHANGELOG.md file of this release branch, change the 'To be released' header to 'vX.Y.Z'.
- [ ] Merge `release-vX.Y.Z` into `master` using the pull request and delete the release branch.
- [ ] Draft a new Github release with the following settings:
      * Tag version: `X.Y.Z` @ `master`
      * Release title: `X.Y.Z - <release_name>`
      * Description: Use highlights from the CHANGELOG.md (only pick out the most significant changes)
- [ ] Merge `master` into `develop` (no need for review on PR, just merge).

The following instructions only apply if you are also releasing a new bundle:
- If this is the first time you are deploying a bundle:
  - [ ] Make sure you have the `mobify-client` npm module installed
  - [ ] Go to `https://cloud.mobify.com/account/` and at the bottom of the page copy the command to login to mobify cloud.
- [ ] Run `npm run push -- -m '<RELEASE_TAG_NAME>:<COMMIT_SHA>,<BRANCH_RELEASED_FROM>'`