let celulas;
let tempo = 0;
let altura = 800;
let largura = 1650;
let prox = true;

function setup(){
    // altura = windowHeight;
    // largura = windowWidth;
    createCanvas(largura, altura);
    //frameRate(10);

    celulas = Celula.GeraCelulas(largura, altura, 10);
}

function draw(){
    if(prox)
    {
        background('black');
    
        for(let celula of celulas)
        {
            if(celula.VerificaVida(celulas, largura))
            {
                celula.viva = true;
                fill('white');
            }
            else
            {
                celula.viva = false;
                fill('black');
            }
            
            rect(celula.pos.x, celula.pos.y, celula.pos.x + celula.lado, celula.pos.y + celula.lado);
        }

        for(let celula of celulas)
        {
            celula.vidaP = celula.viva;
        }

        //prox = false;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        prox = !prox;
    }
}

class Celula
{
    constructor(x, y, lado, vida)
    {
        this.pos = createVector(x, y);
        this.lado = lado;

        switch (vida) {
            case 0: //aleatorio
                this.viva = Math.random() > 0.5 ? true : false;
                
                break;
            case 1: //viva
                this.viva = true;

                break;
            case 2: //morta
                this.viva = false;

                break;
            default:
                break;
        }

        this.vidaP = this.viva;
    }

    VerificaVida(celulas, largura)
    {
        let qtdVizinhasVivas = 0;

        for (let i = 0; i < 8; i++) {
            if(this.VerificaVizinha(celulas, i, largura))
            {
                qtdVizinhasVivas++;
            }
        }

        return (this.viva && qtdVizinhasVivas > 1 && qtdVizinhasVivas < 4) || (!this.viva && qtdVizinhasVivas == 3);
    }

    VerificaVizinha(celulas, direcao, largura) 
    {
        let viva = false;
        let index = celulas.indexOf(this);
        let indexVizinha;

        switch (direcao) {
            case 0: //E
                indexVizinha = index + 1;
                break;
            case 1: //NE
                indexVizinha = index - (largura/this.lado) + 1;
                break;
            case 2: //N
                indexVizinha = index - (largura/this.lado);
                break;
            case 3: //NW
                indexVizinha = index - (largura/this.lado) - 1;
                break;
            case 4: //W
                indexVizinha = index - 1;
                break;
            case 5: //SW
                indexVizinha = index + (largura/this.lado) - 1;
                break;
            case 6: //S
                indexVizinha = index + (largura/this.lado);
                break;
            case 7: //SE
                indexVizinha = index + (largura/this.lado) + 1;
                break;
            default:
                break;
        }

        if(celulas[indexVizinha])
            viva = celulas[indexVizinha].vidaP;                

        return viva;
    }

    static GeraCelulas(largura, altura, lado)
    {
        let qtdLargura = (largura/lado);
        let qtdAltura = (altura/lado);

        let pos = createVector(-lado, -lado);

        let celulas = [];

        for (let i = 0; i < qtdAltura; i++) 
        {
            pos.y += lado;
            pos.x = -lado;

            for (let j = 0; j < qtdLargura; j++) 
            {
                pos.x += lado;

                const celula = new Celula(pos.x, pos.y, lado, 0);

                celulas.push(celula);
            }
        }

        return celulas;
    }
}
