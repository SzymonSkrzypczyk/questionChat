async function fetchData(question){
    try{
        const response = await fetch(`http://127.0.0.1:8000/?question=${question}`, {method: "GET", mode: "no-cors"}); // will have to change it once the docker app runs
        if(!response.ok){
        throw new Error("API doesn't work!");
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("There was an ERROR :(");
        console.log(error);
    }
}

document.getElementById("text-form").addEventListener("keypress", (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            const question = document.getElementById("user-input").value;
            //console.log(fetchData(question));

            const questionNew = document.createElement("p");
            questionNew.textContent = question;
            questionNew.className = "user_question";
            const responseNew = document.createElement("p");
            responseNew.className = "bot_response";
            responseNew.textContent = "response";

            const parentDiv = document.getElementById("chatlogs-content");
            parentDiv.appendChild(questionNew);
            parentDiv.appendChild(responseNew);
        }
    });