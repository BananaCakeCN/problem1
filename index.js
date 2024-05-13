const sleep = ms => new Promise(res => setTimeout(res, ms));
function drawPattern(n, singleW, label){
    var res = '';
    for(var i = 1; i <= n; i++){
        for(var j = (i*(i-1)/2)*singleW - i * singleW; j >= 0; j -= singleW * i){
            res += `
            <rect class="graphSub` + i + `" stroke-width="1" stroke="#000" fill="#fff" x="` + j + `" y="` + (i*(i-1)/2)*singleW + `" width="` + i*singleW + `" height="` + i*singleW + `"/>
            <rect class="graphSub` + i + `" stroke-width="1" stroke="#000" fill="#fff" x="` + (i*(i-1)/2)*singleW + `" y="` + j + `" width="` + i*singleW + `" height="` + i*singleW + `"/>
            `
        }
        if(i % 2 == 0){
            res += `
            <rect class="graphSub` + i + `" stroke-width="1" stroke="#000" fill="#fff" x="0" y="` + (i*(i-1)/2)*singleW + `" width="` + i*singleW/2 + `" height="` + i*singleW + `"/>
            <rect class="graphSub` + i + `" stroke-width="1" stroke="#000" fill="#fff" x="` + (i*(i-1)/2)*singleW + `" y="0" width="` + i*singleW + `" height="` + i*singleW/2 + `"/>
            `
        }
        res += `
        <rect class="graphMain` + i + `" stroke-width="3" stroke="#000" fill="#fff" x="` + (i*(i-1)/2)*singleW + `" y="` + (i*(i-1)/2)*singleW + `" width="` + i*singleW + `" height="` + i*singleW + `"/>
        <path stroke="#000" stroke-width="2" d="M0 ` + (i*(i-1)/2)*singleW + ` L` + (i*(i-1)/2)*singleW + ` ` + (i*(i-1)/2)*singleW + `"/>
        <path stroke="#000" stroke-width="2" d="M` + (i*(i-1)/2)*singleW + ` 0 L` + (i*(i-1)/2)*singleW + ` ` + (i*(i-1)/2)*singleW + `"/>
        `
        if(label){
            res += `
            <text x="` + ((i*(i-1)/2)*singleW+3) + `" y="` + ((i*(i-1)/2)*singleW+15) + `" class="label">` + i + `</text>
            `
        }
        for(var j = singleW; j < i * singleW; j += singleW){
            res += `
            <path stroke="#000" stroke-width="2" d="M` + ((i*(i-1)/2)*singleW + j) + ` ` + (i*(i-1)/2)*singleW + ` L` + ((i*(i-1)/2)*singleW + j) + ` ` + ((i*(i-1)/2)*singleW + i * singleW) + `"/>
            <path stroke="#000" stroke-width="2" d="M` + (i*(i-1)/2)*singleW + ` ` + ((i*(i-1)/2)*singleW + j) + ` L` + ((i*(i-1)/2)*singleW + i * singleW) + ` ` + ((i*(i-1)/2)*singleW + j) + `"/>
            `
        }
    }
    return '<svg style="border: 3px solid #000;" width="' + ((1+n)*n/2)*singleW + '" height="' + ((1+n)*n/2)*singleW + '">' + res + '</svg>';
}
function drawPatternCVS(n, singleW, label, canvas){
    canvas.width = ((1+n)*n/2)*singleW;
    canvas.height = ((1+n)*n/2)*singleW;
    draw = canvas.getContext('2d');
    draw.fillStyle = '#000';
    draw.strokeStyle = '#000';
    for(var i = 1; i <= n; i++){
        draw.lineWidth = 1;
        for(var j = (i*(i-1)/2)*singleW - i * singleW; j >= 0; j -= singleW * i){
            draw.strokeRect(j, (i*(i-1)/2)*singleW, i*singleW, i*singleW);
            draw.strokeRect((i*(i-1)/2)*singleW, j, i*singleW, i*singleW);
        }
        if(i % 2 == 0){
            draw.strokeRect(0, (i*(i-1)/2)*singleW, i*singleW/2, i*singleW);
            draw.strokeRect((i*(i-1)/2)*singleW, 0, i*singleW, i*singleW/2);
        }
        draw.lineWidth = 3;
        draw.strokeRect((i*(i-1)/2)*singleW, (i*(i-1)/2)*singleW, i*singleW, i*singleW);
        draw.lineWidth = 2;
        draw.beginPath();
        draw.moveTo(0, (i*(i-1)/2)*singleW);
        draw.lineTo((i*(i-1)/2)*singleW, (i*(i-1)/2)*singleW);
        draw.moveTo((i*(i-1)/2)*singleW, 0);
        draw.lineTo((i*(i-1)/2)*singleW, (i*(i-1)/2)*singleW);
        draw.stroke();
        if(label){
            draw.fillText(i, ((i*(i-1)/2)*singleW+3), ((i*(i-1)/2)*singleW+15))
        }
        for(var j = singleW; j < i * singleW; j += singleW){
            draw.beginPath();
            draw.moveTo(((i*(i-1)/2)*singleW + j), (i*(i-1)/2)*singleW);
            draw.lineTo(((i*(i-1)/2)*singleW + j), ((i*(i-1)/2)*singleW + i * singleW));
            draw.moveTo((i*(i-1)/2)*singleW, ((i*(i-1)/2)*singleW + j));
            draw.lineTo(((i*(i-1)/2)*singleW + i * singleW), ((i*(i-1)/2)*singleW + j));
            draw.stroke();
        }
    }
}
document.getElementById('example').innerHTML = drawPattern(5, 30, false);
document.getElementById('explainGraph').innerHTML += drawPattern(6, 20, true);
document.getElementById('startBTN').onclick = async function(){
    document.getElementById('start').style.cssText = 'animation: hide 0.3s ease forwards;';
    await sleep(300);
    document.getElementById('start').remove();
    document.getElementsByClassName('graphMain1')[0].style.fill = '#0000CD';
    document.getElementsByClassName('graphMain2')[0].style.fill = '#00FFFF';
    for(ele of document.getElementsByClassName('graphSub2')){
        ele.style.fill = '#00CED1';
    }
    document.getElementsByClassName('graphMain3')[0].style.fill = '#3CB371';
    for(ele of document.getElementsByClassName('graphSub3')){
        ele.style.fill = '#2E8B57';
    }
    document.getElementsByClassName('graphMain4')[0].style.fill = '#ffff00';
    for(ele of document.getElementsByClassName('graphSub4')){
        ele.style.fill = '#BDB76B';
    }
    document.getElementsByClassName('graphMain5')[0].style.fill = '#FF0000';
    for(ele of document.getElementsByClassName('graphSub5')){
        ele.style.fill = '#A52A2A';
    }
    document.getElementsByClassName('graphMain6')[0].style.fill = '#666';
    for(ele of document.getElementsByClassName('graphSub6')){
        ele.style.fill = '#333';
    }
    document.getElementById('example1').innerHTML = drawPattern(5, 30, true);
    document.getElementById('number1').oninput = function(){
        document.getElementById('example1').innerHTML = drawPattern(parseInt(document.getElementById('number1').value), 30, false);
    }
    drawPatternCVS(5, 30, true, document.getElementById('example2'))
    document.getElementById('number2').oninput = function(){
        drawPatternCVS(parseInt(document.getElementById('number2').value), 30, true, document.getElementById('example2'))
    }
}
document.onscroll = function(){
    if(document.scrollingElement.scrollTop > document.getElementById('scroll').offsetTop){
        document.getElementById('explainGraph').style.display = 'none';
    }else{
        document.getElementById('explainGraph').style.display = '';
    }
}
async function showHow(){
    while(document.getElementsByClassName('label')[5].getAttribute('y') >= 15){
        for(var i = 0; i < document.getElementsByClassName('label').length; i++){
            document.getElementsByClassName('label')[i].setAttribute('y', document.getElementsByClassName('label')[i].getAttribute('y') * 0.95 + (document.getElementsByClassName('label').length - i)/10);
        }
        await sleep(20)
    }
}