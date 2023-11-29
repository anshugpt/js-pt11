//* Call stack 
// stack is a data structure 
// call stack means our function calls were stored in stack form
// stack -> last in first out
// for better explation watch the video


function one(){
    return 1;
}

function two(){
    return one() + one();
}

function three(){
    let ans = two() + one(); // local variable formed in stack frame
    console.log(ans);
}
three();
// after the call ans variable no longer accessable as it vanish from stack frame



// we can visualize the call stack 

//* Breakpoints
// it's a prosses of debuging
// watch the video for more clearity


//* JS is Single Threaded 
// single threaded means ek time pe ek kam 
// jab tak kam complete nhi hoga tab tak aage nhi badhna hai

// multi threaded means ek time p multiple kam karna
// like java, c++
// our browser is written on c++ 


// But in term of setTimeOut and call backs JS not like single threaded 

setTimeout(function (){
    console.log("hii...");
}, 2000);
setTimeout(function(){
    console.log("hello...");
}, 2000);

console.log("Anshu");

// the output will be :-
// Anshu
//* hii...      -> these two were executed after 2s 
//* hello...    -> and at a same time

// what happed is :-
//* -> JS transfer these timeout to browser and we know browser made of  c++ so it waited and transfer to JS for printing both at same time means did multi tasking


//* Callback Hell 

h1 = document.querySelector("h1");

function changeColor(color, delay, nextColorChange){
    setTimeout(()=>{
        h1.style.color = color;
        if(nextColorChange){nextColorChange();}
    }, delay);
}

changeColor("red", 1000, ()=> {
    changeColor("orange", 1000, ()=>{
        changeColor("green", 1000, ()=>{
            changeColor("yellow", 1000, ()=>{
                changeColor("purple", 1000);
            });
        });
    });
});

// This nested callback -> callback hell
// and it's a problem in JS
// we can't understand this code properly
//* for that problem JS has a solution that is promises

// Let's see another callback hell

// function saveToDB(data, added, failed){
//     let internetSpeed = Math.floor(Math.random()*10)-1;
//     if (internetSpeed > 4){
//         added();
//     } else {
//         failed();
//     }
// }

saveToDB("anshu", ()=>{
    console.log("added");
        saveToDB("anjali", ()=>{
            console.log("added2");
            saveToDB("anushka", ()=>{
                console.log("added3");
        }, ()=>{
                console.log("failed3");
        });
    }, ()=>{
            console.log("failed2");
    });
}, ()=>{
    console.log("failed");
});

// it's hard to understand but it's a simple work that we want to do it
// that is callback hell

//* Promises 
// The promise object represents the eventual completion (or failure) of an asynchronous operation and it's resulting value


function saveToDB(data){
    return new Promise((resolve, reject)=>{
        let internetSpeed = Math.floor(Math.random()*10)-1;
        if (internetSpeed > 4){
            resolve("added");
        } else {
            reject("failed");
        }
    })
}

// saveToDB("anshu");

// there are multiple states of promises
// -> 'fullfilled' -> sucess
// -> 'rejected' -> failed (error)
// -> 'pending' -> working on

// let req = saveToDB("Anshu");  // req = promise

// req.then(()=>{   // then is our sucess
//     console.log("added");
// })
// .catch(()=>{    // catch is our rejected
//     console.log("failed");
// });

//* Improved version of promise

saveToDB("Anshu").then(()=>{
    console.log("added1");
    return saveToDB("Anjali");
})
.then(()=>{
    console.log("added2");
    return saveToDB("Anushka");
})
.then(()=>{
    console.log("added3");
})
.catch((error)=>{
    console.log("Failed with error:", error);
});

