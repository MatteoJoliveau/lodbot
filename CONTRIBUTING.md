# Contribution Guide
Help us share faces!   
1. Clone the repo (`git clone https://github.com/matteojoliveau/lodbot.git`)
2. Modify code
3. Open [PR](https://github.com/MatteoJoliveau/lodbot/pulls)

**ASK TO MERGE IN DEVELOP, NOT IN MASTER**
Develop is the active development branch, master the stable release branch. Only PR targeting develop will be approved.     

If you want to help expand our face selection, go to [www.disapprovallook.com](http://www.disapprovallook.com). Here you can find
all the LoD faces you may desire. Copy their **text** representation and create a new entry in the `faces.js` file following the following *JSON* schema:   
```javascript
IDENTIFIER: {
  name: "Identifier",
  face: "(☞ﾟヮﾟ)☞", //text representation of the face
  description: "(☞ﾟヮﾟ)☞" //same as 'face'
}
```

You can find thumbnails by going to http://www.disapprovallook.com/?cat=16.

### THANK YOU, ANY HELP IS MUCH APPRECIATED! :D
