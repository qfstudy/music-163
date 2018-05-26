// {
//     // 
    
//     const getJSON = function(url) {
//         const promise = new Promise((resolve, reject)=>{
//           const handler = function() {
//             if (this.readyState !== 4) {
//               return;
//             }
//             if (this.status === 200) {
//               resolve(this.responseText);
//             } else {
//               reject(new Error(this.statusText));
//             }
//           };
//           const client = new XMLHttpRequest();
//           client.open("GET", url);
//           client.onreadystatechange = handler;
//         //   client.responseType = "json";
//         //   client.setRequestHeader("Accept", "application/json");
//           client.send();
      
//         });
      
//         return promise;
//       };
      
//       getJSON("http://localhost:8888/leanCloud").then((response)=>{
//         var object1 = window.JSON.parse(response)
//         var APP_ID = object1.APP_ID;
//         var APP_KEY = object1.APP_KEY;
        
//         console.log('Contents: ' +response);
//         console.log('Contents1: ' + object1.APP_KEY);
//         AV.init({
//             appId: APP_ID,
//             appKey: APP_KEY
//         });
       
//       });
    

// }

{
    let APP_ID = 'hxeDLN5ygRGgy0RMtB1Ja6MN-gzGzoHsz';
    let APP_KEY = '88Qa82I96ozUg1LmY24r5GY9';

  AV.init({
        aaa:1,
        appId: APP_ID,
        appKey: APP_KEY
    }); console.log( AV.init.aaa)

}
