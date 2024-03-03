async function fetchData(question){

    try{
        const response = await fetch(`http://127.0.0.1:8000/?question=${question}`); // will have to change it once the docker app runs
        if(!response.ok){
        throw new Error("API doesn't work!");
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("There was an ERROR :(");
        console.log(error);
    }
    /*
    fetch(`http://127.0.0.1:8000/?question=${question}`).then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(data);
    })*/
}

document.getElementById("text-form").addEventListener("keypress", async (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            const question = document.getElementById("user-input").value;
            const parentDiv = document.getElementById("chatlogs-content");
            const inputElement = document.getElementById("user-input");
            const container = document.getElementById('chatlogs-content');
            if(!question) return;

            inputElement.disabled = true;
            // creating user question
            const questionNewDiv = document.createElement("div");
            questionNewDiv.className = "user_question";
            const questionNew = document.createElement("p");
            questionNew.textContent = question;
            questionNewDiv.appendChild(questionNew);
            parentDiv.appendChild(questionNewDiv);
            inputElement.value = "";
            inputElement.focus();
            // creating placeholder bot response
            const responseNewDiv = document.createElement("div");
            const responseNew = document.createElement("p");
            responseNewDiv.className = "bot_response";
            responseNew.textContent = "...";
            responseNewDiv.appendChild(responseNew);
            parentDiv.appendChild(responseNewDiv);
            container.scrollTop = container.scrollHeight;

            let response = await fetchData(question);
            response = response["answer"];
            responseNew.textContent = response;

            container.scrollTop = container.scrollHeight;
            inputElement.disabled = false;
        }
    });