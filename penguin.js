var penguinPromise= d3.json("classData.json");
var setBanner= function(message)
{ 
    d3.select("banner")
.text(message);
}

var quizmean=function(penguin)
{ var getallQuizgrades= function(quiz)
{
    return quiz.grade
}
var quizgrades= penguin.quizes.map(getallQuizgrades)
var quizmean = d3.mean(quizgrades)
return quizmean
}


var homeworkmean= function(penguin)
{ var getallHomeworkgrades= function(homework)
{
    return homework.grade
}
var homeworkgrades= penguin.homework.map(getallHomeworkgrades)
var homeworkmean= d3.mean(homeworkgrades)
return homeworkmean
}


var testmean= function(penguin)
{ var getallTestgrades= function(test)
{
    return test.grade
}
var testgrades= penguin.test.map(getallTestgrades)
var testmean= d3.mean(testgrades)
return testmean
}

var cmpFinalg= function(penguinA, penguinB)
{
    if (penguinA.final[0].grade == penguinB.final[0].grade)
{
    return 0;
}
if (penguinA.final[0].grade < penguinB.final[0].grade)
    {
        return -1;
    }
else
    {
        return 1;
    }
}
var clearTable=function()
    {
        d3.selectAll("#penguinsTable tbody tr")
        .remove();
    }

var sortFinalg = function(penguins)
{
    d3.select("#one")
.on("click", function()

   {
      penguins.sort(cmpFinalg);
        clearTable()
        drawTable(penguins)
        console.log("hello")
    } 
    )
}
var drawTable=function(penguins)

{ 
    console.log("hi")
var rows= d3.select("#penguinsTable tbody")
.selectAll("tr")
.data(penguins)
.enter()
.append("tr")




rows.append("td")
    .text(function(penguin)
          {
    return penguin.final[0].grade
      });

   
    rows.append("td")
    .append("img")
    .attr("src", function(penguins)
{ 
    return ("imgs/"+penguins.picture)
    });
    
   
rows.append("td")
.text(quizmean);

rows.append("td")
.text(homeworkmean);

rows.append("td")
.text(testmean);
}

var successFCN= function(penguins)
{
    console.log("penguins", penguins);
setBanner(" Here are the Penguins!")
    drawTable (penguins);
    sortFinalg(penguins);
}
var failureFCN= function(error)
{
    console.log("error", error);
    setBanner("This did not work!")
}
penguinPromise.then(successFCN, failureFCN)
