document.body.onload=function(){   
 // USERINTERFACE CONTROLLER
var uiController = (function(){
          var selectType = document.querySelector("#select");

          var description = (document.querySelector("#description"));

          var values = (document.querySelector("#val"));

          var button = document.querySelector("#button");
          var expense = document.querySelector(".expense");
          var income = document.querySelector(".income");
          var expenseAmount = document.querySelector("#expenseAmount");
          var incomeAmount =  document.querySelector("#incomeAmount");
          var budgetAmount =  document.querySelector("#budget");
          var container =document.querySelector(".con")


  
    return {
    //getting the values of desc,select boxes
           item:[
           selectType,
           description,
           values,
           button,
           expenseAmount,
           incomeAmount,
           budgetAmount,
           container
    ],
    //adding items to the user interface from the datastructure
    
    addlistItems(obj,type){
        var items;
 
        if (type==="inc"){
         items =`<li class="list-group-item" id="list-group-item">
             <span id="span1" >${obj.description}</span> 
             <span id="span2" class="">${obj.value}</span>
             <span class="btn btn-danger btn-sm" id=${obj.id}>inc</span>
         
             
              </li>  `
        income.insertAdjacentHTML("beforeend",items)
             }
         else if(type==="exp"){
         items=`<li class="list-group-item" id="list-group-item">
             <span id="span11" >${obj.description}</span> 
             <span id="span22" class="">${obj.value}</span>
             <span class="btn btn-danger btn-sm" id=${obj.id}>exp</span>
         
         
              </li>  `
         expense.insertAdjacentHTML("beforeend",items)
         }
     },
    addBudget(income,expense,budget){
              incomeAmount.textContent = income;
              budgetAmount.textContent = `$${budget}`;
              expenseAmount.textContent = expense




    }

     ,


    clearFields(){
     //clear both descript and values box on a single line of codes
         var boxes = document.querySelectorAll( "#description , #val" );
        for( x  of  boxes ){
                x.value = " "
            }
        boxes[0].focus()

    }


    }


})()




      //BUDGET CONTROLLER 
var budgetController = (function(){
    
    //creating constructors for expense
    function Expense(description,value,id){
        this.description = description;
        this.value = value;
        this.id = id
    }


    //creating constructors for income instances

    function Income(description,value,id){
    
        this.description = description;
        this.value = value;
        this.id = id
    }
    


    var data = {
        exp:[],
        inc:[],
        totalexp:0,
        totalinc:0,
        budget:0

    }

     
    return {
    
createObject:function(type,desc,val){
               
        var id,itemToAdd
        //setting the value for id
        if (data[type].length == 0) {
            id = 0
        }
        else{
            id =data[type][data[type].length - 1].id + 1
        }

   if(type ==="exp"){
//creating an instance based on the expense constructor
      itemToAdd = new Expense(desc,val,id,type)
    }
    else{
        itemToAdd = new Income(desc,val,id,type)


    }
    //adding the new instances to the data structure
    data[type].push(itemToAdd);
    return itemToAdd
    
    


},
calculateBudget(){
   //calculate total income and total expense
    income = (function(structure,type){
   var sum = 0;
       structure[type].forEach(function(cur){
          sum = sum  + cur.value
       })

   structure[`total${type}`]=sum;
   return sum
})(data,"inc")


   expense =  (function(structure,type){
    var sum = 0;
        structure[type].forEach(function(cur){
           sum = sum  + cur.value
        })
 
    structure[`total${type}`]=sum;
    return sum
 })(data,"exp")
   //calculate the budget
   data.budget= income-expense;
    return [data.budget,income,expense]

   //

},
getBudget(){
    return {
     budget:data.budget,
     income:data.totalinc,
     expense:data.totalexp
    }
    },
deleteFromDatastructure(id,type){
console.log(type)//inc or expense
console.log(id)//id

/*var data = {
    exp:[],
    inc:[],
    totalexp:0,
    totalinc:0,
    budget:0

}
*/

var counter = 0;
//depending on the type,iterate through the the array
while(counter < data[type].length){
    current = data[type][counter].id
    if(current == id){
        if(current <= 0){
        
        data[type].splice(0,1)
        alert("0")
    

    }
    else if(current != 0){
        position = data[type].indexOf(data[type][counter]);
        data[type].splice(position,1)
        
       alert("un")

    }
}

    counter++
    
}
console.log(data[type])

//match their id in the process of looping through
//if any matches is found,delete such member out of tghe array


    
        }


    
}

             })()
			 
			 
              //GLOBAL APP CONTROLLER 
var appController = (function(){

    //get inputs by array destructuring
    [select,description,values,button,d,r,s,container] = uiController.item


 //)add event listeners
 

  function additem (){
    [select,description,values,button,d,r,s,container] = uiController.item

    if( description.value.length <7 && description.value !==" " && description.value && values.value && values.value.length <8  ){
    

// create a datastructure to store the added values in the budget controller
   obj = budgetController.createObject(select.value,description.value,parseFloat(values.value))
//add values to the user interface
   uiController.addlistItems(obj,select.value)
   uiController.clearFields()
//calculate the budget
   array=budgetController.calculateBudget()
//getting an object containing the budget,totalincome and total expense
   var budget = budgetController.getBudget()

//add the calculated budget to the user interface
   
   uiController.addBudget(budget.income,budget.expense,budget.budget)
  
//
   


        

  }

  }
  function deleteItem(e){
    [select,description,values,button,d,r,s,container] = uiController.item
    
      //delete the object from the user interface
    if(e.target.className == "btn btn-danger btn-sm"){
        e.target.parentNode.style.display="none"
        var  i = ((e.target.textContent))
        alert(i)
    
    //delete the object from the datastructure


     budgetController.deleteFromDatastructure(e.target.id,i)

    //recalculate the budget
    budgetController.calculateBudget()

//
    var budget = budgetController.getBudget()
    

//add the calculated budget to the user interface
   
   uiController.addBudget(budget.income,budget.expense,budget.budget)
   //console.log(budgetController.data)
  

}
  }



  (function setupEventListener(){

    button.addEventListener("click",additem);


    document.addEventListener("keypress",e=>{
         if(e.keyCode === 13){
             additem()
         }
    });


    container.addEventListener("click",deleteItem);

 })()
 

   








   

    /*

4)create a datastructure to store the added values in the budget controller
s
    5)calculate the budget

    6)add the budget to the uicontroller

    */
  
})(uiController,budgetController)




}
