from flask import Flask,request,jsonify
import utils
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app) 
@app.route("/generate_text",methods= ["POST"])
def generate_text():
    seed_text = str(request.form["seedText"])
    word_length = int(request.form["wordLength"])
    next_word = int(request.form["nextWord"])
    response = jsonify({
        'generatedText': utils.generate_text(seed_text,next_word,word_length)
    })
    response.headers.add("Access-Control-Allow-Origin","*")
    return response

if __name__ =="__main__":
    utils.load_saved_artifacts()
    app.run()