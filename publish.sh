TARGET_BRANCH=master
if [ "${GITHUB_EVENT_NAME}" == "push" ]; then
    cd ${HOME}
    git config --global user.email "actions@github.com"
    git config --global user.name "Git Actions"
    git clone --quiet --branch=${TARGET_BRANCH} https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git ${TARGET_BRANCH} > /dev/null
    cd master
    rm -rf *.*
    cp -Rf ${HOME}/dist ./
    git add -f .
    git commit -m "Github Actions build ${GITHUB_RUN_NUMBER} pushed to master"
    git push -fq origin ${TARGET_BRANCH} > /dev/null
fi
