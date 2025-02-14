from tensorflow.keras import layers
import numpy
from keras.models import Model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import json
import tensorflow as tf
from keras.layers import Dense, LSTM, Dropout
from keras.preprocessing.text import Tokenizer
import pickle
from tensorflow import keras
import os
import base64
import torch
from keras.models import Sequential
from keras.layers import  Dense,Embedding
from torch import nn
import cv2
import requests
from PIL import Image
import requests
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, request
import requests
import numpy
import base64
import cv2
from binascii import a2b_base64
import base64
from PIL import Image
from io import BytesIO
from urllib.request import urlopen 
import chardet
import keras


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

class tblock(layers.Layer):
    def __init__(self, rate=0.1):
        super().__init__()
        self.att = layers.MultiHeadAttention(num_heads=2, key_dim=32)
        self.ffn = keras.Sequential(
            [layers.Dense(32, activation="relu"), layers.Dense(32),]
        )
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate)

    def call(self, inputs, training):
        attn_output = self.att(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        return self.layernorm1(out1 + ffn_output)
class emb(layers.Layer):
    def __init__(self):
        super().__init__()
        self.token_emb = layers.Embedding(input_dim=10000, output_dim=32)
        self.pos_emb = layers.Embedding(input_dim=150, output_dim=32)

    def call(self, x):
        maxlen = tf.shape(x)[-1]
        positions = tf.range(start=0, limit=150, delta=1)
        positions = self.pos_emb(positions)
        x = self.token_emb(x)
        return x + positions

embedding_layer = emb()
transformer = tblock()

inputs = layers.Input(shape=(150,))

x = embedding_layer(inputs)
x = transformer(x)
x = layers.GlobalAveragePooling1D()(x)
x = layers.Dropout(0.1)(x)
x = layers.Dense(10, activation="relu")(x)
x = layers.Dropout(0.1)(x)
outputs = layers.Dense(2, activation="sigmoid")(x)

model2 = keras.Model(inputs=inputs, outputs=outputs)
model2.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

model2.load_weights('texta.h5')
with open('tokenizer3a.json') as f:
    data = json.load(f)
    tok = tf.keras.preprocessing.text.tokenizer_from_json(data)


class CNN(nn.Module):
    def __init__(self):
        super(CNN,self).__init__()
        self.c1 = nn.Conv2d(in_channels=3,out_channels=32,kernel_size=3)
        self.c2 = nn.Conv2d(in_channels = 32, out_channels = 32, kernel_size=3)
        self.p = nn.MaxPool2d(kernel_size=2,stride=2)
        self.c3 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3)
        self.c4 = nn.Conv2d(in_channels=64, out_channels=64, kernel_size=3)
        self.p2 = nn.MaxPool2d(kernel_size = 2, stride = 2)
        self.l1 = nn.Linear(53824,64)
        self.a1 = nn.ReLU()
        self.l2 = nn.Linear(64,1)
        self.a2 = nn.Sigmoid()
        l = []
    def forward(self,x):
        x = self.c1(x)
        #rint(x.shape)
        x = self.c2(x)
        x = self.p(x)
        x = self.c3(x)
        x = self.c4(x)
        x = self.p2(x).reshape(x.size(0), -1)
        #rint(x.shape)
        x = self.l1(x)
        #x = self.a1(x)
        x = self.l2(x)
        x = self.a2(x)
        return x

        
model = CNN()

model = torch.load("model.pt",map_location=device)
model.eval()

def pornography(open_cv_image):
    s = torch.unsqueeze(torch.from_numpy(cv2.resize(open_cv_image,(128,128))).float(),0)
    t = tuple([s for i in range(0,64)])
    s2 = torch.cat(t, 0)
    return(model(s2.permute(0,3, 1, 2).to(device))[0].item())

def hate_speech(s):
    return(model2.predict(tf.keras.utils.pad_sequences(tok.texts_to_sequences(numpy.array([s])),maxlen=150)))[0][1]


app=Flask(__name__)

@app.route("/text",methods=["POST"])
def get_text():
    d = str(request.get_data())
    d =d[d.rfind("{"):d.rfind("}")+1]
    print(json.loads(d))
    print(str(hate_speech(json.loads(d)["text"])))
    return str(hate_speech(json.loads(d)["text"]))
@app.route("/image",methods=["POST"])
def get_img():
    print(request.files["CV"])
    #files = request.files.getlist('files[]')[0]
    files = request.files["CV"]
    i = numpy.array(Image.open(files).convert('RGB'))[:, :, ::-1].copy()

    return str(pornography(i))
    """    img = Image.open(requests.get(t, stream = True).raw)
    image_bytes = base64.decodebytes(t)
    """    
    # convert byte array to numpy array
    #image_np = numpy.frombuffer(image_bytes, numpy.uint8)
    #image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'files[]' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp
 
    files = request.files.getlist('files[]')
     
    errors = {}
    success = False
     
    for file in files:      
        if 1==1:
            filename = secure_filename(file.filename)
            file.save(filename)
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'
 
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({'message' : 'Files successfully uploaded'})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
if __name__ == '__main__':
    app.run(debug=True)

"""curl -X POST -H "Content-Type:application/json" --data "{\"text\":\"You are such a nice person\"}" http://127.0.0.1:5000/image"""
"""curl -X POST -H "Content-Type:application/json" --data "{\"text\":\"You are such a nice person\"}" http://127.0.0.1:5000/text"""


    
# Decode the base64 string into a byte array
"""    x=base64.b64encode(urlopen(request.json).read())
    y=bytes(x, encoding='utf-8')
    print(x)
    image_bytesio = BytesIO(x)

    # Open the image from the BytesIO object using Pillow
    image = Image.open(y)
    print(image)
    print(type(request.json))
    t = request.json
"""
