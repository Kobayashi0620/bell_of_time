var start; // 開始時間（グローバル変数）
var salary_id;
var wageValueInterval;
var timeInterval;
var milli;
var centi;
var seconds;
var minutes;
var hours;
var milli_salary;
var centi_salary;
var second_salary;
var salary_time;
var time;//初期値はミリ秒
var salary;//初期値はミリ秒給
var SwitchSelectType;
var SwitchInputType;
var SelectType;
var InputType;
var switching;
var switchSet;
var getHour;
var getMinute;
var getSecond;

var wageValue = 1113;

const TEN_DIV = 10;
const HUNDRED_DIV = 100;
const THOUSAND_DIV = 1000;
const TIMES_CON = 60; //時間変換
const RESULT_CONT = 1000; //結果調節

//インスタンス化
const NUMBER_FORMAT = new Intl.NumberFormat('ja-JP');//金額桁数のカンマ自動追加
const TEMPLE_BELL = document.getElementById("templeBell");

// 設定画面の切替
function switchSet() {
    switching = document.getElementsByName('switchSet');

    if(switching[0].checked){
        document.getElementById('salarySet').style.display = "none";
        document.getElementById('intervalSet').style.display = "none";
        document.getElementById('alarmSet').style.display = "none";
    }
    else if(switching[1].checked){
        document.getElementById('salarySet').style.display = "";
        document.getElementById('intervalSet').style.display = "none";
        document.getElementById('alarmSet').style.display = "none";
    }
    else if(switching[2].checked){
        // 好きな場所が選択されたら下記を実行します
        document.getElementById('salarySet').style.display = "none";
        document.getElementById('intervalSet').style.display = "";
        document.getElementById('alarmSet').style.display = "none";
    }
    else if(switching[3].checked){
        document.getElementById('salarySet').style.display = "none";
        document.getElementById('intervalSet').style.display = "none";
        document.getElementById('alarmSet').style.display = "";
    }
}
window.addEventListener('load', switchSet());

//入力切替
function formSwitch() {
    switching = document.getElementsByName('switchType');
    if(switching[0].checked){
        document.getElementById('selectType').style.display = "";
        document.getElementById('inputType').style.display = "none";
    }
    else if(switching[1].checked){
        document.getElementById('selectType').style.display = "none";
        document.getElementById('inputType').style.display = "";
    }
    else{
        document.getElementById('selectType').style.display = "none";
        document.getElementById('inputType').style.display = "none";
    }
}
window.addEventListener('load', formSwitch());

//地域（時給）値の取得
const SELECT = document.getElementById('selectWage');
SELECT.addEventListener('change', () => {
    wageValue = SELECT.value;
    const DISPLAY_VALUE = document.getElementById('displayValue');
    DISPLAY_VALUE.innerHTML = wageValue;
});

//時給値の入力
const INPUT = document.getElementById('inputWage');
INPUT.addEventListener('change', () => {
    wageValue = INPUT.value;
    const DISPLAY_VALUE = document.getElementById('displayValue');
    DISPLAY_VALUE.innerHTML = wageValue;
});

//表示間隔値の取得
const SELECT_INTERVAL = document.getElementById('drawInterval');
SELECT_INTERVAL.addEventListener('change', () => {
    wageValueInterval = SELECT_INTERVAL.value;
    const DISPLAY_VALUE = document.getElementById('displayTime');
    DISPLAY_VALUE.innerHTML = wageValueInterval;
});

//時の鐘（アラーム）設定（時）
const GET_HOUR = document.getElementById('setHour');
GET_HOUR.addEventListener('change', () => {
    getHour = GET_HOUR.value;
    getHour = addZero(getHour);//設定時間の０追加
    const DISPLAY_VALUE = document.getElementById('displayHour');
    DISPLAY_VALUE.innerHTML = getHour;
});

//時の鐘（アラーム）設定（分）
const GET_MINUTE = document.getElementById('setMinute');
GET_MINUTE.addEventListener('change', () => {
    getMinute = GET_MINUTE.value;
    getMinute = addZero(getMinute);//設定時間の０追加
    const DISPLAY_VALUE = document.getElementById('displayMinute');
    DISPLAY_VALUE.innerHTML = getMinute;
});

//時の鐘（アラーム）設定（秒）
const GET_SECONDE = document.getElementById('setSecond');
GET_SECONDE.addEventListener('change', () => {
    getSecond = GET_SECONDE.value;
    getSecond = addZero(getSecond);//設定時間の０追加
    const DISPLAY_VALUE = document.getElementById('displaySecond');
    DISPLAY_VALUE.innerHTML = getSecond;
});

// 時間用、ゼロを追加する
var addZero = function (value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
};

//null判定（０代入）
var nullJudge = function(value){
    if(value == null){
        value = '0' + 0;
    }
    return value;
}

//スタート・ストップボタン機能
document.getElementById('start_stop').addEventListener('click', function () {
    if (this.innerHTML === 'START') {
        start = new Date();

        salary_id = setInterval(salaryTimer, 1);

        // STOP ボタンにする
        this.innerHTML = 'STOP';
        this.classList.remove('btn-primary');
        this.classList.add('btn-danger');
    } else {
        clearInterval(salary_id);

        // START ボタンにする
        this.innerHTML = 'START';
        this.classList.remove('btn-danger');
        this.classList.add('btn-primary');
    }
});

//給料表示処理
var salaryTimer = function () {
    var now = new Date();

    milli = now.getTime() - start.getTime(); //1ミリ秒時間計測
    centi = Math.floor(milli / TEN_DIV); //1センチ秒時間計測（ミリ秒／１０）
    seconds = Math.floor(centi / HUNDRED_DIV); //1秒の計測（センチ秒／１００）
    minutes = Math.floor(seconds / TIMES_CON); //1分の計測（秒／６０）
    hours = Math.floor(minutes / TIMES_CON); //1時間の計測（分／６０）

    milli_salary = wageValue / TIMES_CON / TIMES_CON / THOUSAND_DIV //ミリ秒給（時給／６０／６０／１０００）
    centi_salary = wageValue / TIMES_CON / TIMES_CON / HUNDRED_DIV //センチ秒給（時給／６０／６０／１００）
    second_salary = wageValue / TIMES_CON / TIMES_CON //秒給（時給／６０／６０）
    minute_salary = wageValue / TIMES_CON //分給（時給／６０）
    hour_salary = wageValue //時給

    time = milli;//初期値はミリ秒
    salary = milli_salary;//初期値はミリ秒給

    //表示間隔の選択 条件分岐
    if (wageValueInterval == "selectMilli") {
        time = milli;
        salary = milli_salary;
    }
    else if (wageValueInterval == "selectCenti") {
        time = centi;
        salary = centi_salary;
    }
    else if (wageValueInterval == "selectSecond") {
        time = seconds;
        salary = second_salary;
    }
    else if (wageValueInterval == "selectMinute") {
        time = minutes;
        salary = minute_salary;
    }
    else if (wageValueInterval == "selectHour") {
        time = hours;
        salary = hour_salary;
    }

    salary_time = Math.round((time * salary) * RESULT_CONT) / RESULT_CONT; //四捨五入（（ミリ秒＊ミリ秒給）＊１０００）／１０００

    seconds = seconds - minutes * TIMES_CON; //５９秒まで行ったら次は００秒にする（秒－分＊６０）ー＞桁の繰り上げ
    minutes = minutes - hours * TIMES_CON; //５９分まで行ったら次は００分にする（分－時＊６０）ー＞桁の繰り上げ

    //経過時間の０追加
    hours = addZero(hours);
    seconds = addZero(seconds);
    minutes = addZero(minutes);

    //null判定（０追加）
    getHour = nullJudge(getHour);
    getMinute = nullJudge(getMinute);
    getSecond = nullJudge(getSecond)

    //鳴鐘（アラーム）条件式
    if((getHour == hours && getMinute == minutes && getSecond == seconds) && (!(getHour == "00" && getMinute == "00" && getSecond == "00"))){
        TEMPLE_BELL.play();
        alert('スマホ・タブレットだと音が鳴らないよ。\n鳴らない原因はiOS端末では音声や動画の自動再生を行うことができないかららしいよ。\n改修しようね。覚えてたら。\n一応リンクも貼っとく\nhttps://haruppooooo.com/programming/281/')
    }

    document.getElementById('salary').innerHTML = NUMBER_FORMAT.format(salary_time);
    document.getElementById('timer').innerHTML = hours + ':' + minutes + ':' + seconds;

    document.getElementById('a').value = start.toLocaleString({ timeZone: 'Asia/Tokyo' });
    document.getElementById('b').value = "￥" + NUMBER_FORMAT.format(salary_time);
    document.getElementById('c').value = hours + ':' + minutes + ':' + seconds;
}

// // 給料用、ゼロを追加する
// var addDigit = function (value) {
//     if (value < 100000 && value >= 10000) {
//         value = '0' + value;
//     }
//     else if (value < 10000 && value >= 1000) {
//         value = '00' + value;
//     }
//     else if (value < 1000 && value >= 100) {
//         value = '000,' + value;
//     }
//     else if (value < 100 && value >= 10) {
//         value = '000,0' + value;
//     }
//     else if (value < 10) {
//         value = '000,00' + value;
//     }
//     return value;
// };
// if(wageValueInterval == "selectMilli"){
//     milli = now.getTime() - start.getTime();
//     timeInterval = milli;
// }
// else if(wageValueInterval == "selectCenti"){
//     centi = Math.floor(milli / TEN_DIV);
//     timeInterval = centi;
// }
// else if(wageValueInterval == "selectSecond"){
//     seconds = Math.floor(centi / HUNDRED_DIV);
//     timeInterval = seconds;
// }
// else if(wageValueInterval == "selectMinute"){
//     minutes = Math.floor(seconds / TIMES_CON);
//     timeInterval = minutes;
// }
// else if(wageValueInterval == "selectHour"){
//     hours = Math.floor(minutes / TIMES_CON);
//     timeInterval = hours;
// }

// milli = ((now.getTime() - start.getTime()) * (wageValue / TIMES_CON / TIMES_CON / THOUSAND_DIV));
// centi = ((Math.floor(milli / TEN_DIV)) * (wageValue / TIMES_CON / TIMES_CON / HUNDRED_DIV));
// seconds = ((Math.floor(centi / HUNDRED_DIV)) * (wageValue / TIMES_CON / TIMES_CON));
// minutes = ((Math.floor(seconds / TIMES_CON)) * (wageValue / TIMES_CON));
// hours = ((Math.floor(minutes / TIMES_CON)) * (wageValue));