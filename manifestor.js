var fs = require('fs');

function manifestor(browser){
    var manifest = {
        "manifest_version": 2,
        "name": 'Mastodon Share',
        "description": 'Un bouton de partage social pour les instances Mastodon',
        "version": '0.4',
        "options_ui": {
            "page": 'options.html'
        },
        "browser_action": {
            "default_icon": "assets/images/icon.png",
            "default_popup": "popup.html"
        },
        "content_scripts": [
        {
            "matches": ["https://twitter.com/*"],
            "js": [
            "assets/scripts/functions.js",
            "assets/scripts/twitter.js"
            ]
        }
        ],
        "background": {
            "scripts": [
            "assets/scripts/interceptor.js",
            "assets/scripts/menu.js",
            "assets/scripts/functions.js"
            ]
        },
        "permissions": [
        "contextMenus",
        "tabs",
        "activeTab",
        "storage"
        ],
        "icons": {
            "16": "assets/images/icon16.png",
            "32": "assets/images/icon32.png",
            "64": "assets/images/icon64.png"
        }

    };

    if (browser == 'firefox') {
        manifest.applications = {
            "gecko":{
              "id": "{09b14d46-21c3-4a7d-b244-e756f497935b}",
              "strict_min_version": "52.0"
            }
        }
    }

    var result = JSON.stringify(manifest, null , 4);

    fs.writeFile('build/'+ browser + '/manifest.json', result,  function(){
        console.log('Manifest for ' + browser + " added !");
    });
}

manifestor('firefox');
manifestor('chrome');