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
document.getElementById('example').innerHTML = drawPattern(5, 30, false);
document.getElementById('explainGraph').innerHTML += drawPattern(6, 20, true);
document.getElementById('startBTN').onclick = async function(){
    document.getElementById('start').style.cssText = 'animation: hide 0.3s ease forwards;';
    await sleep(300);
    document.getElementById('start').remove();
}