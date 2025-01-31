from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

class Memo(BaseModel):
    id:str
    content:str

memos = []    

@app.get('/memos')
def read_memo():
    return memos


@app.post('/memos')
def create_memo(memo:Memo):
    memos.append(memo)
    return '성공'


@app.put('/memos/{memo_id}')
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content=req_memo.content
            return '성공'
    return '그런메모없음'


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index,memo in enumerate(memos):
        if memo.id==memo_id:
            memos.pop(index)
            return '성공'
    return '그런메모없음'

app.mount("/",StaticFiles(directory="static",html=True),name="static")
