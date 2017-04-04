# Install the latest stable version of Chrome.
# https://circleci.com/docs/build-image-trusty/#google-chrome

wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update
sudo apt-get --only-upgrade install google-chrome-stable

# Set Chrome as the default browser so that all links open in the same tab
# http://askubuntu.com/questions/96080/how-to-set-google-chrome-as-the-default-browser
xdg-mime default google-chrome.desktop text/html
xdg-mime default google-chrome.desktop x-scheme-handler/http
xdg-mime default google-chrome.desktop x-scheme-handler/https
xdg-mime default google-chrome.desktop x-scheme-handler/about

cat ~/.local/share/applications/mimeapps.list

echo xxxxxxxxxx

xdg-mime query default text/html
xdg-mime query default x-scheme-handler/http
xdg-mime query default x-scheme-handler/https
xdg-mime query default x-scheme-handler/about