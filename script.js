function contruirTela(resolucao) {

    let altura = window.innerHeight;
    let largura = window.innerWidth;
    let container = document.getElementById("container");
    let temp = "";

    if (largura > altura) {
        let tamanhoBloco = (largura/resolucao)-0.02;
        let quantidadeY = altura/tamanhoBloco; 

        for (let i = 0; i < quantidadeY; i++) {
            for (let j = 0; j < resolucao; j++) { 
                temp += "<div style='width: " + tamanhoBloco + "px; height: " + tamanhoBloco + "px;'   onclick='acionar(this,1,1,1,1)' class='blocos' id='l" + i + "-c" + j + "'>" + '.' +"</div>";
            };
            
            temp += "<br>";
        };
        container.innerHTML = temp
    }

    if (altura > largura) {
        let tamanhoBloco = (altura/resolucao)-0.2;
        let quantidadeX = (largura/tamanhoBloco)-1; 

        for (let i = 0; i < resolucao; i++) {
            for (let j = 0; j < quantidadeX; j++) { 
                temp += "<div style='width: " + tamanhoBloco + "px; height: " + tamanhoBloco + "px;'   onclick='acionar(this,1,1,1,1)' class='blocos' id='l" + i + "-c" + j + "'>" + '.' +"</div>";
            };
            
            temp += "<br>";
        };
        container.innerHTML = temp
    }
}

function extrairPosicoes(string) {
    let x = "";
    let y = "";
    let ctl=1;

    for (let i = 0; i < string.length; i++) {

        if(string[i] == "-"){
            ctl = 0;
        }
        if (i>0 & ctl) {
            x += string[i];
        }
        if (ctl == 0 & i+2 < string.length) {
            y += string[i+2];
        }
    };
    return [x, y];
}

function acionar(bloco, ctl1, ctl2, ctl3, ctl4){
    let posicao = bloco.id;
    let posicoes = extrairPosicoes(posicao);
    
    bloco.style.backgroundColor = 'red'
    
    let b1 = 'l'+ (parseInt(posicoes[0])+1) +'-c'+ (parseInt(posicoes[1]))
    let b2 = 'l'+ (parseInt(posicoes[0])-1) +'-c'+ (parseInt(posicoes[1]))
    let b3 = 'l'+ (parseInt(posicoes[0])) +'-c'+ (parseInt(posicoes[1])+1)
    let b4 = 'l'+ (parseInt(posicoes[0])) +'-c'+ (parseInt(posicoes[1])-1)

    if (document.getElementById(b1) && ctl1 && document.getElementById(b1).style.backgroundColor != "red"){
        setTimeout(function () {acionar(document.getElementById(b1), 1,0,1,1)}, 50);
    }
    if (document.getElementById(b2) && ctl2 && document.getElementById(b2).style.backgroundColor != "red"){
        setTimeout(function () {acionar(document.getElementById(b2), 0,1,1,1)}, 50);
    }
    if (document.getElementById(b3) && ctl3 && document.getElementById(b3).style.backgroundColor != "red"){
        setTimeout(function () {acionar(document.getElementById(b3), 0,0,1,0)}, 50);
    }
    if (document.getElementById(b4) && ctl4 && document.getElementById(b4).style.backgroundColor != "red"){
        setTimeout(function () {acionar(document.getElementById(b4), 0,0,0,1)}, 50);
    }

    setTimeout(function () {
        bloco.style.backgroundColor = 'lightseagreen'
    }, 250)
    
}

// -------------------------- Principal ---------------------------

let larTemp=0;
let altTemp=0;
let resolucao = 70;
contruirTela(resolucao);

setInterval(function () {
    
    let altura = window.innerHeight;
    let largura = window.innerWidth;

    console.log(larTemp);
    console.log(largura);
    console.log(altTemp);
    console.log(altura);

    if (largura != larTemp || altura != altTemp) {
        contruirTela(resolucao);
        larTemp = largura;
        altTemp = altura;
    }

    if (largura > altura) {
        var tamanhoBloco = (largura/resolucao)-0.02;
        var quantidadeY = altura/tamanhoBloco; 
        var randX = Math.random() * resolucao;
        var randY = Math.random() * quantidadeY;
    }
    if (altura > largura) {
        var tamanhoBloco = (altura/resolucao)-0.2;
        var quantidadeX = (largura/tamanhoBloco)-1; 
        var randX = Math.random() * quantidadeX;
        var randY = Math.random() * resolucao;
    }

    let bloco =  document.getElementById('l'+ (parseInt(randY)) +'-c'+ (parseInt(randX)));

    acionar(bloco,1,1,1,1);

}, 1500);


