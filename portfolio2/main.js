var images = document.getElementsByTagName('img');
var loadingBar = document.getElementById('loading_bar');
var loadingWrap = document.getElementById('loading_barWrap');
var loadingArea = document.getElementById('loading');
 
var imgLen = images.length;
var barLen = 100 / imgLen;
console.log(barLen);
var barWidth = 0;
 
for (var i = 0; i < imgLen; i++) {
    images[i].onload = function() {
        barWidth = barWidth + barLen;
        loadingBar.style.width = barWidth + '%';
    }
}
 
function loadLen() {
    if (!loadingArea.classList.contains('loadingNone')) {
        if (loadingBar.clientWidth === loadingWrap.clientWidth) {
            loadingArea.classList.add('loadingNone');
        } else {
            setTimeout(loadLen, 5000);
        }
    }
}
 
// 100%にならなかった時用の処理
window.addEventListener('load', function(){
  if (!loadingArea.classList.contains('loadingNone')) {
    loadingBar.style.width = '100%';
    setTimeout(function(){
      loadingArea.classList.add('loadingNone');
    }, 1000);
  }
});

// ハンバーガーメニュー
let nav=document.querySelector('.toggle__nav__area');
let hamburger = document.querySelector('.hamburger');

let navTrigger = ()=>{
  hamburger.addEventListener('click',()=>{
    nav.classList.toggle('show');
  });
}

navTrigger();

// ハンバーガーの傾き

let line1 =document.querySelector('.hamburger-line1');
let line2 =document.querySelector('.hamburger-line2');
let line3 =document.querySelector('.hamburger-line3');

let changeLine = (test1,test2,test3) =>{
  hamburger.addEventListener('click',()=>{
    test1.classList.toggle('rotate');
    test2.classList.toggle('hide');
    test3.classList.toggle('rotate2');

  })
}
changeLine(line1,line2,line3);


let t_text = document.querySelector('.top-text');
let textUp = ()=>{
  window.addEventListener('DOMContentLoaded' ,()=>{
    t_text.classList.add('watch');
  })
}
textUp();


let content =document.querySelectorAll('.content');

// windowオブジェクトがスクロールrされたらイベント発動
window.addEventListener('scroll',()=>{
  //iの数がコンテンツの数より少ない場合iに1を足していく
  for(let i =0; i < content.length; i++){
    //rectという変数にcontentのiを代入する
    const rect =content[i].getBoundingClientRect().top;
    //scrollにはページのスクロール量を代入する
    const scroll =window.pageYOffset;
    //offsetにcontentのiとスクロール量を代入する
    const offset = rect + scroll;
    //windowHeightに
    const windowHeight =window.innerHeight;
    if(scroll > offset - windowHeight +300){
      content[i].classList.add('scroll-in');
    }
  }
}
)

//particleJS

particlesJS("particles-js",{
  "particles":{
    "number":{
      "value":70,//この数値を変更すると幾何学模様の数が増減できる
      "density":{
        "enable":true,
        "value_area":800
      }
    },
    "color":{
      "value":"#ddd"//色
    },
    "shape":{
      "type":"polygon",//形状はpolygonを指定
      "stroke":{
        "width":0,
      },
  "polygon":{
    "nb_sides":6//多角形の角の数
  },
  "image":{
    "width":190,
    "height":100
  }
  },
    "opacity":{
    "value":0.664994832269074,
    "random":false,
    "anim":{
      "enable":true,
      "speed":2.2722661797524872,
      "opacity_min":0.08115236356258881,
      "sync":false
    }
    },
    "size":{
      "value":3,
      "random":true,
      "anim":{
        "enable":false,
        "speed":40,
        "size_min":0.1,
        "sync":false
      }
    },
    "line_linked":{
      "enable":true,
      "distance":150,
      "color":"#ffffff",
      "opacity":0.6,
      "width":1
    },
    "move":{
      "enable":true,
      "speed":2,//この数値を小さくするとゆっくりな動きになる
      "direction":"none",//方向指定なし
      "random":false,//動きはランダムにしない
      "straight":false,//動きをとどめない
      "out_mode":"out",//画面の外に出るように描写
      "bounce":false,//跳ね返りなし
      "attract":{
        "enable":false,
        "rotateX":600,
        "rotateY":961.4383117143238
      }
    }
  },
  "interactivity":{
    "detect_on":"canvas",
    "events":{
      "onhover":{
        "enable":false,
        "mode":"repulse"
      },
  "onclick":{
    "enable":false
  },
  "resize":true
    }
  },
  "retina_detect":true
});

$('#wrapper').scrollgress({//バーの高さの基準となるエリア指定
  height: '5px',//バーの高さ
  color: '#990000',//バーの色
});

var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#000', '#ccc', '#dcdcdc']);//重ねる波の色設定
    

		// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 100;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(canvas, color[0], 0.5, 3, 0);
	drawWave(canvas, color[1], 0.4, 2, 250);
	drawWave(canvas, color[2], 0.2, 1.6, 100);
}

function drawWave(canvas, color, alpha, zoom, delay) {
		var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //塗りつぶす
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();