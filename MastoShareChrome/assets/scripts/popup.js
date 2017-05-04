var instanceUrl = '';
var shortner = false;

chrome.storage.sync.get(null, function(items){

	instanceUrl = items.instanceUrl;
	shortner = items.shortner;
	loading_message = items.loading_message;

	$('body').html(loading_message);

	//If mastodon instance not configured
	if (instanceUrl == '' || instanceUrl == undefined || instanceUrl == 'https://')
	{
		chrome.tabs.create({url: 'options.html#start'});
	}
	else
	{
		//Get current tab
		chrome.tabs.getSelected(null, function(tab){

			if (shortner)
			{
				getShortUrl(tab.url, function(url){
					sendToMastodon(instanceUrl, url);
				});
			}
			else
			{
				sendToMastodon(instanceUrl, tab.url);
			}
		});
	}

});