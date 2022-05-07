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

        for (let i = 0; i < resolucao+2; i++) {
            for (let j = 0; j < quantidadeX; j++) { 
                temp += "<div style='width: " + tamanhoBloco + "px; height: " + tamanhoBloco + "px;'   onclick='acionar(this,1,1,1,1)' class='blocos' id='l" + i + "-c" + j + "'>" + '.' +"</div>";
            };
            
            temp += "<br>";
        };
        container.innerHTML = temp
    }
}

function criarObjetoBloco(bloco1) {
    return { 
        bloco: bloco1,
        ligar: async function () {
            try {
                this.bloco.style.backgroundColor = 'red';
                await this.delay(0.15);
                this.bloco.style.backgroundColor = '#20b2aa';
            } catch (error) {
                console.log('bloco deu erro');
            }
        },
        delay: function (n){
            return new Promise(function(resolve){
                setTimeout(resolve,n*1000);
            });
        }
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

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function acionar(bloco, ctl1, ctl2, ctl3, ctl4){
    let posicao = bloco.id;
    let posicoes = extrairPosicoes(posicao);
    let blocoTemp;
    let x = posicoes[1];
    let y = posicoes[0];
    let xUp = posicoes[1];
    let xDown = posicoes[1];
    let yUp = posicoes[0];
    let yDown = posicoes[0];
    let controleDeBlocosDiagonais=0;
    

    while (1) {
        controleDeBlocosDiagonais++;

        let controleDeErro = 0;
        let ativarControleDeErro = 0;
        let idBlocoTemp1 = 'l'+ (parseInt(y)) +'-c'+ (parseInt(xDown));
        let idBlocoTemp2 = 'l'+ (parseInt(y)) +'-c'+ (parseInt(xUp));
        let idBlocoTemp3 = 'l'+ (parseInt(yDown)) +'-c'+ (parseInt(x));
        let idBlocoTemp4 = 'l'+ (parseInt(yUp)) +'-c'+ (parseInt(x));

        if (!controleDeBlocosDiagonais < 3) {

            let xFor = xUp;
            let yFor = y;

            for (let i = 0; i < controleDeBlocosDiagonais-2; i++) {
                yFor--;
                xFor--;
                if (document.getElementById('l'+ yFor +'-c'+ xFor)) {
                    controleDeErro = 1;
                    criarObjetoBloco(document.getElementById('l'+ yFor +'-c'+ xFor)).ligar()
                }else{
                    ativarControleDeErro = 1;
                }
            }

            xFor = xUp;
            yFor = y;

            for (let i = 0; i < controleDeBlocosDiagonais-2; i++) {
                yFor++;
                xFor--;
                if (document.getElementById('l'+ yFor +'-c'+ xFor)) {
                    controleDeErro = 1;
                    criarObjetoBloco(document.getElementById('l'+ yFor +'-c'+ xFor)).ligar()
                }else{
                    ativarControleDeErro = 1;
                }
            }

            xFor = xDown;
            yFor = y;

            for (let i = 0; i < controleDeBlocosDiagonais-2; i++) {
                yFor--;
                xFor++;
                if (document.getElementById('l'+ yFor +'-c'+ xFor)) {
                    controleDeErro = 1;
                    criarObjetoBloco(document.getElementById('l'+ yFor +'-c'+ xFor)).ligar()
                }else{
                    ativarControleDeErro = 1;
                }
            }

            xFor = xDown;
            yFor = y;

            for (let i = 0; i < controleDeBlocosDiagonais-2; i++) {
                yFor++;
                xFor++;
                if (document.getElementById('l'+ yFor +'-c'+ xFor)) {
                    controleDeErro = 1;
                    criarObjetoBloco(document.getElementById('l'+ yFor +'-c'+ xFor)).ligar()
                }else{
                    ativarControleDeErro = 1;
                }
            }

            // break;
        }
        

        if (!document.getElementById(idBlocoTemp1)) {
            // controleDeErro++;
        }else{
            blocoTemp = criarObjetoBloco(document.getElementById(idBlocoTemp1));
            blocoTemp.ligar();
        }
        if (!document.getElementById(idBlocoTemp2)) {
            // controleDeErro++;
        }else{
            blocoTemp = criarObjetoBloco(document.getElementById(idBlocoTemp2));
            blocoTemp.ligar();
        }
        if (!document.getElementById(idBlocoTemp3)) {
            // controleDeErro++;
        }else{
            blocoTemp = criarObjetoBloco(document.getElementById(idBlocoTemp3));
            blocoTemp.ligar();
        }
        if (!document.getElementById(idBlocoTemp4)) {
            // controleDeErro++;
        }else{
            blocoTemp = criarObjetoBloco(document.getElementById(idBlocoTemp4));
            blocoTemp.ligar();
        }



        console.log(controleDeErro);
        
        yUp++;
        xUp++;
        xDown--;
        yDown--;

        console.log("rodou");

        if (ativarControleDeErro) {
            if (controleDeErro == 0) {
                break;
            }
        }
        
        await delay(0.04);  
        
    }

    // -------------------------------------------------------------------------------------------------------------------------------------------------

    

    // let posicao = bloco.id;
    // let posicoes = extrairPosicoes(posicao);
    
    // bloco.style.backgroundColor = 'red'
    
    // let b1 = 'l'+ (parseInt(posicoes[0])+1) +'-c'+ (parseInt(posicoes[1]));
    // let b2 = 'l'+ (parseInt(posicoes[0])-1) +'-c'+ (parseInt(posicoes[1]));
    // let b3 = 'l'+ (parseInt(posicoes[0])) +'-c'+ (parseInt(posicoes[1])+1);
    // let b4 = 'l'+ (parseInt(posicoes[0])) +'-c'+ (parseInt(posicoes[1])-1);

    // if (document.getElementById(b1) && ctl1 && document.getElementById(b1).style.backgroundColor != "red"){
    //     setTimeout(function () {acionar(document.getElementById(b1), 1,0,1,1)}, 50);
    // }
    // if (document.getElementById(b2) && ctl2 && document.getElementById(b2).style.backgroundColor != "red"){
    //     setTimeout(function () {acionar(document.getElementById(b2), 0,1,1,1)}, 50);
    // }
    // if (document.getElementById(b3) && ctl3 && document.getElementById(b3).style.backgroundColor != "red"){
    //     setTimeout(function () {acionar(document.getElementById(b3), 0,0,1,0)}, 50);
    // }
    // if (document.getElementById(b4) && ctl4 && document.getElementById(b4).style.backgroundColor != "red"){
    //     setTimeout(function () {acionar(document.getElementById(b4), 0,0,0,1)}, 50);
    // }

    // setTimeout(function () {
    //     bloco.style.backgroundColor = '#20b2aa'
    // }, 250)
    
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


