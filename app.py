from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/', methods=["GET"])
def main():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def home():
    text = request.form["characterInput"]
    return render_template('main.html', data=text)


if __name__ == "__main__":
    app.run(debug=True)
