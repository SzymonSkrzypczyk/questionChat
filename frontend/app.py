import asyncio
from uuid import uuid4
from flask import Flask, render_template, redirect
from aiohttp import ClientSession, ClientResponseError


async def get_answer(session: ClientSession, question: str):
    question = question.replace(" ", "_")
    try:
        async with session.get(f"http://api:80/?question={question}", timeout=40) as response:
            resp = await response.json()
    except Exception:
        return
    return resp


app = Flask(__name__)
app.secret_key = str(uuid4())


@app.route("/", methods=["POST", "GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
