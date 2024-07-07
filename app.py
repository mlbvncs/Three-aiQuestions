#IMPORTS FLASK
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def principal():
    return render_template("principal.html")
@app.route("/questões")
def questões():
    return render_template("questões.html")
@app.route("/escolherquestão", methods=["GET", "POST"])
def escolherquestão():
    if request.method == "POST":
        fonte = request.form["fonte"]
        enunciado = request.form["enunciado"]
        alternativas = request.form["alternativas"]
        resposta = request.form["resposta"]
        return render_template("escolherquestão2.html", fonte=fonte,
                               enunciado=enunciado,
                               alternativas=alternativas,
                               resposta=resposta)
    else:
        return render_template("escolherquestão1.html")
@app.route("/questão", methods=["GET", "POST"])
def questão():
    if request.method == "GET":
        return render_template("questão1.html")
"""
@app.route("/criarquestão", methods=["GET", "POST"])
def criarquestão():
    if request.method == "POST":
        prompt = request.form["textarea"]

        return render_template("criarquestão2.html", prompt=prompt)
    else:
        return render_template("criarquestão1.html")
"""

if __name__ == "__main__":
    app.run(debug=True)