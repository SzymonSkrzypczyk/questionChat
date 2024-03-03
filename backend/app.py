from time import perf_counter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-large", legacy=False)
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-large")
MAX_LENGTH_RESULT = 128
MAX_LENGTH_INPUT = 512

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


@app.get("/")
async def answer(question: str):
    # question's words will be split by _
    # so a little bit of preprocessing
    question = " ".join(question.split("_"))
    time_start = perf_counter()
    inputs = tokenizer.encode(question, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs, max_length=128, num_beams=4, early_stopping=True)
    output = tokenizer.decode(outputs[0]).replace("<pad> ", "").replace("</s>", "")
    result_time = perf_counter() - time_start
    return {"Elapsed": result_time, "answer": output}


@app.get("/limits")
async def limits():
    return {"max input length": MAX_LENGTH_INPUT, "max output length": MAX_LENGTH_RESULT}
