
// let promise =fetch(URL);
// console.log(promise);

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");
const msg  = document.querySelector(".Message");



  
  for(let select of dropdowns){

    for(Currcode in countryList){ 

        let optn = document.createElement("option");
        optn.innerText = Currcode;
        optn.value = Currcode;
      
        if(select.name==="from"&& Currcode ==="USD"){
            optn.selected = "selected";
        }
        else if(select.name ==="to" && Currcode ==="INR"){
            optn.selected ="selected";
        }
        select.append(optn);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const updateflag=(Element)=>{
       let Currcode = Element.value;
          let  countryCode = countryList[Currcode];
          let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
         let img = Element.parentElement.querySelector("img"); //kyunki current Element wo select wala tag h
         img.src =newsrc;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  btn.addEventListener("click", async(evt)=>{ ///esko async

evt.preventDefault(); //jo bhi kaam apne aap api se ho rahe the wo null kr diye flctutatiuon bhi hata di
let amount = document.querySelector(".amount input");
let amntval = amount.value;
if(amntval ===""|| amntval < 1){
    amntval = 1;
    amount.value="1";
}

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
console.log(response);
let data = await response.json();
console.log(data);

let rate = data[toCurr.value.toLowerCase()];
let final = rate*amntval;
console.log(final);
msg.innerText = amntval+fromCurr+" = "+final + toCurr;


  });