//https://randomuser.me/api/
const leftData = document.querySelector(".left-data")
const rightData = document.querySelector(".right-data")
const btnCreateUser = document.querySelector(".btn-create-person")
const btnDoubleMoney = document.querySelector(".btn-double-money")
const btnOnlyMillionairs = document.querySelector(".btn-only-millioneirs")
const btnSortByRichest = document.querySelector(".btn-sort")
const btnCalculate = document.querySelector(".calculate")
let data = []
// add user this will be PUSH user to the array
     // before pushing to the array i need to call the API
     // i will create a random number of money

async function createNewPerson(){
    const req = await fetch("https://randomuser.me/api/")
    const res = await req.json()
    const newPerson = {}
    newPerson.name= `${res["results"][0].name.first} ${res["results"][0].name.last}`
    newPerson.weath = (Math.random() * 1000000).toFixed(2)
    data.push(newPerson)
    renderToDOM()
    
}

createNewPerson()

btnCreateUser.addEventListener("click",function(){
    createNewPerson()
})

function renderToDOM(){
    leftData.innerHTML = ""
    rightData.innerHTML =""
    data.forEach(person=>{
       const nameElement = document.createElement("h3")
       const weathElement = document.createElement("h3")
       nameElement.innerText = person["name"]
       weathElement.innerText = person["weath"]
       leftData.appendChild(nameElement)
       rightData.appendChild(weathElement)
    })
}
//double money this will MAP the array and make the wealth double

btnDoubleMoney.addEventListener('click', function(){
     data = data.map(person=>{
        person.weath *= 2
        return person
    })
    renderToDOM() 
})

// FILTER and show only the millionaires
btnOnlyMillionairs.addEventListener("click", function(){
  data = data.filter(person=>person.weath >= 1000000)
  renderToDOM()
})

//SORT by weath
btnSortByRichest.addEventListener("click", function(){
   data.sort((a,b)=>(b.weath-a.weath))
    renderToDOM()
})

// REDUCE (calculate the total Weath)
btnCalculate.addEventListener("click", function(){
   const total = data.reduce((acc,el)=>acc + parseInt(el.weath),0)
   const totalElement = document.createElement('h3')
   totalElement.innerText = total.toFixed(2)
   rightData.appendChild(totalElement)

})

