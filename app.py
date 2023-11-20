from flask import Flask, request, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

saveDataLists = []

wage = {
    "北海道": 960,
    "青森県": 898,
    "岩手県": 893,
    "宮城県": 923,
    "秋田県": 897,
    "山形県": 900,
    "福島県": 900,
    "茨城県": 953,
    "栃木県": 954,
    "群馬県": 935,
    "埼玉県": 1028,
    "千葉県": 1026,
    "東京都": 1113,
    "神奈川県": 1112,
    "新潟県": 931,
    "富山県": 948,
    "石川県": 933,
    "福井県": 931,
    "山梨県": 938,
    "長野県": 948,
    "岐阜県": 950,
    "静岡県": 984,
    "愛知県": 1027,
    "三重県": 973,
    "滋賀県": 967,
    "京都府": 1008,
    "大阪府": 1064,
    "兵庫県": 1001,
    "奈良県": 936,
    "和歌山県": 929,
    "鳥取県": 900,
    "島根県": 904,
    "岡山県": 932,
    "広島県": 970,
    "山口県": 928,
    "徳島県": 896,
    "香川県": 918,
    "愛媛県": 897,
    "高知県": 897,
    "福岡県": 941,
    "佐賀県": 900,
    "長崎県": 898,
    "熊本県": 898,
    "大分県": 899,
    "宮崎県": 897,
    "鹿児島県": 897,
    "沖縄県": 896,
    "全国平均": 1004,
}

@app.route("/")
def main():
    return render_template("index.html", wage=wage)

@app.route("/save", methods=['GET', 'POST'])
def saveData():

    start_time = request.form.get('start_time')
    work_salary = request.form.get('work_salary')
    working_time = request.form.get('working_time')

    if start_time != None and work_salary != None and working_time != None:
        dataSava = start_time + "|" + work_salary + "|" + working_time

        with open('saveData.txt', 'a') as f:
            f.write("%s\n" % dataSava)
    else:
        with open('saveData.txt', 'r') as f:
            saveDataLists = f.read().split("\n")

    with open('saveData.txt', 'r') as f:
        saveDataLists = f.read().split("\n")

    return render_template("save.html", saveDataLists=saveDataLists)