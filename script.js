var query = [], subj = [], js_data_one = [], js_data_two = [];
var personName = [], comment = [];
var one = "query", two = "subj";
getAll(one,two);
var divId, b=0,i=0;
var ques_sub = document.getElementById("ques-sub");
var dif_name, dif_comm;
var caryName = [], caryComm = [];
divResponse();
ques_sub.addEventListener("click",function()
{
    var title = document.getElementById("subject").value;
    var text = document.getElementById("text").value;
    if(text != "" && title != "")
    {
        quesBox(title,text,query.length);
    }
});

function divResponse()
{
    this.addEventListener("click",function(event){
        if(event.target.className === "l-ques")
        {
            document.querySelector("#r-page-one").style.display="none";
            document.querySelector("#r-page-two").style.display="block";
            var sp = document.querySelector('#'+event.target.id+' span');
            var pp = document.querySelector('#'+event.target.id+' p');
            document.querySelector("#ques-name").innerHTML = sp.innerHTML;
            document.querySelector("#ques-p").innerHTML = pp.innerHTML;
            divId = event.target.id;
            dif_name = "name_"+event.target.id;
            dif_comm = "comm_"+event.target.id;
            if(dif_name in localStorage)
            {
                prevResponse(dif_name, dif_comm);
            }
            else
            {
                document.getElementById("r_pan_2_2").innerHTML = "";
            }
    var resp_btn = document.getElementById("resp-submit");
    resp_btn.addEventListener("click",function(){
    var in_name = document.getElementById("in_name").value;
    var comm = document.getElementById("comm").value;
    console.log(in_name);
    console.log(comm);
    if(in_name != "" && comm != "")
    {    
        console.log("callOne");
       createResponse(in_name,comm,divId,dif_name, dif_comm);
    }
});
        }
    });
}
// --------------------------------------Start Response------------------------

// createResponse
function createResponse(in_name,comm,divId,dif_name, dif_comm)
{   
    if(personName.length == null)
    {
        personName.push(caryName);
        comment.push(caryComm);
    }
    var div_two = document.createElement("div");
    r_pan_2_2.appendChild(div_two);
    div_two.setAttribute("class","ques-res");
    div_two.setAttribute("id","resp_"+divId);
    var new_entry="<span class='ques-sapn'>"+in_name+"</span>"
                  +"<p class='ques-p'>"+comm+"</p>";
    div_two.insertAdjacentHTML("afterbegin",new_entry);
    personName.push(in_name);
    comment.push(comm);
    js_data_one = JSON.stringify(personName);
    console.log(js_data_one);
    localStorage.setItem(dif_name,js_data_one);
    js_data_two = JSON.stringify(comment);
    console.log(js_data_two);
    localStorage.setItem(dif_comm,js_data_two);
    document.getElementById("in_name").value = "";
    document.getElementById("comm").value = "";
    this.addEventListener("click",function(event){
        if(event.target.className === "l-ques")
        {
            var lsOne = localStorage.getItem("name_"+event.target.id);
            var lsTwo = localStorage.getItem("comm_"+event.target.id);
            if("name_"+event.target.id in localStorage)
            {
                personName = JSON.parse(lsOne);
                comment = JSON.parse(lsTwo);
            }
            else
            {
                personName = [];
                comment = [];
            }
        }
    });
}

// Load prevResponse

function prevResponse(dif_name,dif_comm)
{
    caryName = [];
    caryComm = [];
    document.getElementById("r_pan_2_2").innerHTML = "";
    var resultOne = localStorage.getItem(dif_name);
    var resultTwo = localStorage.getItem(dif_comm);
    resultOne = JSON.parse(resultOne);
    resultTwo = JSON.parse(resultTwo);
    itemOne = resultOne || [];
    itemTwo = resultTwo || [];
        itemOne.forEach(function(dataOne, indexA)
        {
            itemTwo.forEach(function(dataTwo, indexB)
            {
                if(indexA == indexB)   
                {
                    console.log("callTwo");
                    var div_two = document.createElement("div");
                    r_pan_2_2.appendChild(div_two);
                    div_two.setAttribute("class","ques-res");
                    div_two.setAttribute("id","resp_ele_"+indexA);
                    var new_entry="<span class='ques-sapn'>"+dataOne+"</span>"
                                +"<p class='ques-p'>"+dataTwo+"</p>";
                    div_two.insertAdjacentHTML("afterbegin",new_entry);
                    caryName.push(dataOne);
                    caryComm.push(dataTwo);
                }         
            });
    }); 
}

// --------------------------End Response------------------------------

// questionBox
function quesBox(title,text, index)
{

    var div = document.createElement("div");
    lpane_two.appendChild(div);
    div.setAttribute("class","l-ques");
    div.setAttribute("id","ele_"+index);
    var new_sub_entry="<span class='ques-sapn'>"+title+"</span>"
                        +"<p class='ques-p'>"+text+"</p>";
    div.insertAdjacentHTML("afterbegin",new_sub_entry);
    query.push(text);
    subj.push(title);
    var js_data_two = JSON.stringify(subj);
    localStorage.setItem("subj",js_data_two);
    var js_data_one = JSON.stringify(query);
    localStorage.setItem("query",js_data_one);
    document.getElementById("subject").value = "";
    document.getElementById("text").value = "";
}

// getAll All Query
function getAll(one, two)
{
    var resultOne = localStorage.getItem("query");
    var resultTwo = localStorage.getItem("subj");
    resultOne = JSON.parse(resultOne);
    resultTwo = JSON.parse(resultTwo);
    itemOne = resultOne || [];
    itemTwo = resultTwo || [];
    itemOne.forEach(function(dataOne, indexA)
    {
        itemTwo.forEach(function(dataTwo, indexB)
        {
            if(indexA == indexB)   
            {
                quesBox(dataTwo,dataOne,indexA);
            }         
        })           
    })
}

// Search Query
var result = document.getElementById("result");
var input = document.getElementById("myinput");
input.addEventListener("input",function(){
    var input, filter, ul, ld, li, a, i,j=0, txtValue;
    input = document.getElementById("myinput").value;
    filter = input.toLowerCase();
    ul = document.getElementById("lpane_two");
    li = ul.getElementsByTagName("div");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            result.style.display = "none";
        }
        else
        {
            j++;
            li[i].style.display = "none";
            if(j === li.length)
            {
                result.style.display = "";
            }
        }
    }
});

// Resolve Query
var resp_sub = document.getElementById("resp-sub");
resp_sub.addEventListener("click",function(){ 
    var input,inputComm, ul, li, a, i;
    input = document.getElementById("ques-name").innerHTML;
    inputComm = document.getElementById("ques-p").innerHTML;
    ul = document.getElementById("lpane_two");
    li = ul.getElementsByTagName("div");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        if (a.innerHTML === input)
        {
            document.querySelector("#ques-name").innerHTML = "";
            document.querySelector("#ques-p").innerHTML = "";
            li[i].parentNode.removeChild(li[i]);
            let data_one = JSON.parse(localStorage.getItem("query"));
            let data_two = JSON.parse(localStorage.getItem("subj"));
            data_one = data_one.filter((el)  => el !== inputComm);
            data_two = data_two.filter((el) => el !== input);
            localStorage.setItem("query", JSON.stringify(data_one));
            localStorage.setItem("subj", JSON.stringify(data_two));
            console.log("name_ele_"+i);
            localStorage.removeItem(("name_ele_"+i));
            localStorage.removeItem(("comm_ele_"+i));
            document.getElementById("r_pan_2_2").innerHTML = "";
            var pName = [];
            var cName = [];
            for(var x= i+1;x<li.length;x++)
            {   
                pName = JSON.parse(localStorage.getItem("name_ele_"+x));
                cName = JSON.parse(localStorage.getItem("comm_ele_"+x));
                localStorage.setItem("name_ele_"+(x-1), JSON.stringify(pName));
                localStorage.setItem("comm_ele_"+(x-1), JSON.stringify(cName));
            }
            localStorage.removeItem(("name_ele_"+(x-1)));
            localStorage.removeItem(("comm_ele_"+(x-1)));
            window.location.reload();
        }
    }
});

// newQuestionForm
var bttn = document.getElementById("bttn");
bttn.addEventListener("click",function(){
    document.querySelector("#r-page-one").style.display="block";
    document.querySelector("#r-page-two").style.display="none";
});


