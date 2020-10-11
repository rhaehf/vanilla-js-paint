const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR= "#2c2c2c"; 
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 기본적인 캔버스의 색상을 정함
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 기본적인 캔버스의 크기를 정함
ctx.strokeStyle = INITIAL_COLOR; // 그림 그린 선의 기본 색상 설정
ctx.fillStyle = INITIAL_COLOR; // 캔버스를 채울 색상 설정
ctx.lineWidth = 2.5; // 그림 그린 선의 기본 굵기 설정

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스를 움직이는 내내 발생함
    const x = event.offsetX; // canvas 안에서의 x좌표
    const y = event.offsetY; // canvas 안에서의 y좌표
    if(!painting) { // 클릭을 하고 있지 않을 떄
        ctx.beginPath(); // 선을 만들기 시작
        ctx.moveTo(x, y); // 선의 시작점을 가짐
    } else { // 클릭을 할 때
        ctx.lineTo(x, y); // 이전의 위치와 연결함
        ctx.stroke(); // 캔버스에 그림을 그림
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; // 클릭한 색상의 style에서 bgColor만 가져옴
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) { // save버튼을 통해서 그림을 다운받게 하려고
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // 그림의 url 주소
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]" // 그림의 이름
    link.click(); // url을 누른것 처럼 작동해서 그림을 바로 다운받게 해줌
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // canvas 위에 마우스가 올라가면
    canvas.addEventListener("mousedown", startPainting); // canvas 위에서 마우스를 클릭하면
    canvas.addEventListener("mouseup", stopPainting); // canvas 위에서 마우스를 클릭을 떼면
    canvas.addEventListener("mouseleave", stopPainting); // canvas 위에서 마우스가 벗어나면
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//color는 array안에 각 아이템들을 대표하는 명칭임 potato라고 해도 가능

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}