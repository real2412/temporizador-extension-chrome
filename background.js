const segundero = 0.016666666666666667
const max_segundo = 10

chrome.alarms.onAlarm.addListener(function() {
  chrome.storage.sync.get(['second'], function(item) {
    chrome.browserAction.setBadgeText({text: (item.second).toString()});
    chrome.alarms.create({delayInMinutes: segundero});
    chrome.storage.sync.set({auxiliar: "true"}) 
    if(item.second >= max_segundo){
      chrome.storage.sync.set({second: 0})
      chrome.alarms.clearAll()
      chrome.browserAction.setBadgeText({text: max_segundo+"!"});
    }else{
      chrome.storage.sync.set({second: item.second+1})
    }
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get(['second'], function(item) {
    if(typeof item.second == "number" ){
      chrome.storage.sync.get(['auxiliar'], function(item_aux) {
        if(typeof item_aux.auxiliar == "string"){
          chrome.alarms.clearAll()
          chrome.storage.sync.set({second: (item.second)+"!"})
          chrome.storage.sync.set({auxiliar: false})
          chrome.browserAction.setBadgeText({text: (item.second==0? 0 :item.second-1)+"!"});
        }else{
          chrome.alarms.clearAll()
          chrome.storage.sync.set({second: "0!"})
          chrome.browserAction.setBadgeText({text: ""});  
        }
      })
    }else{
      if(typeof item.second == "string"){
        if(item.second=="0!"){
          chrome.browserAction.setBadgeText({text: '0'});
          chrome.storage.sync.set({second: 1})
        }
        else{
          chrome.storage.sync.set({second: Number(item.second.replace("!",""))})
        }
        chrome.alarms.create({delayInMinutes: segundero});
      }else{
        chrome.alarms.clearAll()
        chrome.storage.sync.set({second: 1})
        chrome.browserAction.setBadgeText({text: '0'});
        chrome.alarms.create({delayInMinutes: segundero});
      }
    }
  });
})
