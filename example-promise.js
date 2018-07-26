// function getTempPromise(location) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve(79);
//             reject("City not found");
//         }, 1000);
//     });
// }

// getTempPromise(undefined).then(function(temp) {
//     console.log("promise success", temp);
// }, function(err) {
//     console.log("promise error", err);
// });

// Challenge Area
function addPromise(a,b) {
    return new Promise(function(resolve, reject) {
        if(typeof a === "number" && typeof b === "number") {
            resolve(a + b);
        } else {
            reject("These are both not numbers");
        }
        
        
    });
}

const x = 1, y = 2, c = "nananan";

// let z;

let result = function(z) {
    return z.then(function(num) {
        console.log("promise success", num)
    }, function(err) {
        console.log(err);
});

}

let z = addPromise(x,y);

result(z);

z = addPromise("hello");

result(z);
