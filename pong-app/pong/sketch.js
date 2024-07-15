//variaveis para informar onde a bolinha irá iniciar ao apertar play
let xBolinha = 300;
let yBolinha = 200;
//diametro da bolinha
let diametro = 15;
//raio da bolinha
let raio = diametro/2;

//variaveis para definir a velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variaveis com a largura e altura das raquetes
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variavel para confirmar a colisão entre raquete e bolinha
let colidiu = false;

//variavel dos placares
let meusPontos = 0;
let pontosDoOponente = 0;

//variavel dos sons do jogo
let raquetada;
let ponto;
let trilha;

//variavel para o oponente errar
let chanceDeErrar = 0;


function preload() {
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}//função para importar os sons para utilizar no jogo
 
function setup() {
  
  createCanvas(600, 400);
  trilha.loop();//comando para tocar a trilha sonora sem parar
}

function draw() {
  
  background(0); //função para definir a cor do background = preto
  mostraBolinha();//função que puxa os códigos para mostrar a bolinha
  movimentaBolinha();//função que puxa os códigos para movimentar a bolinha
  verificaColisaoBorda();//função que puxa os códigos para verificar a colisão da bolinha com a borda
  mostraRaquete(xRaquete, yRaquete);//função que puxa os códigos para criar mostrar um retangulo na tela, retornando os parametros das variáveis específicas
  movimentaMinhaRaquete();//função que faz com que ao clicar na seta para cima ou para baixo, a raquete se movimente na tela
  //verificaColisaoRaquete();//função que verifica se a bolinha está colidindo com a raquete
  verificaColisaoRaquete(xRaquete, yRaquete);//função que verifica colisão entre a bolinha e a raquete selecionada pela variável
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);//função que puxa os códigos para criar mostrar um retangulo na tela, retornando os parametros das variáveis específicas
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  
  circle(xBolinha, yBolinha, diametro); 
}//função com as variaveis que informa onde a bolinha irá começar quando apertar play

function movimentaBolinha() {
  
  xBolinha += velocidadeXBolinha; //comando para movimentar a bolinha no eixo x largura
  yBolinha += velocidadeYBolinha; //comando para movimentar a bolinha no eixo y altura
}

function verificaColisaoBorda() {
  
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }//comando para determinar o que fazer após a bolinha colidir com a borda no eixo positivo de x e no eixo negativo de x
  //acrescentando o raio da bolinha para que a colisão com os limites do canvas seja com a borda da bolinha e não com o centro
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;  
  }//comando para determinar o que fazer após a bolinha colidir com a borda no eixo positivo de y e no eixo negativo de y
    //acrescentando o raio da bolinha para que a colisão com os limites do canvas seja com a borda da bolinha e não com o centro
}


function mostraRaquete(x, y) {
  
  rect(x, y, raqueteComprimento, raqueteAltura);
}//comando para criar um retangulo na tela com os parametros em variáveis

function movimentaMinhaRaquete() {
  
  if (keyIsDown(UP_ARROW)){//função para movimentar para baixo a raquete
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {//função para movimentar para cima a raquete 
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {

  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) { 
    velocidadeXBolinha *= -1;
    raquetada.play();//tocar um som quando a raquete colidir com a bolinha
  }//função para fazer a verificação se a bolinha está colidindo com a raquete
}

function verificaColisaoRaquete(x, y) {
  
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu == true) {
    velocidadeXBolinha *= -1;
    raquetada.play();//tocar um som quando a raquete colidir com a bolinha
  }
}//função buscada desenvolvida por outra pessoa buscada no github que testa a colisão entre a raquete e a bolinha

function movimentaRaqueteOponente() {
  
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 50;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}//função para a raquete oponente seguir a bolinha

function incluiPlacar() {
  
  stroke(255);//adicionar contorno na cor branca
  textAlign(CENTER);//alinhar os placares no centro
  textSize(16);//tamanho do texto 16
  fill(color(255, 140, 0));//colorir de laranja o retangulo
  rect(150, 10, 40, 20); //desenhar um retangulo
  fill(250);//cor das letras
  text(meusPontos, 170, 26);//placar do jogador
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);//placar do oponente
}//função para incluir pontos no placar

function marcaPonto() {
  
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();//tocar um som quando jogador fizer um ponto
  }
  if (xBolinha < 10) { 
    pontosDoOponente += 1;
    ponto.play();//tocar som quando o oponente fizer um ponto
  }
}//função para verificar quando marcar ponto

function calculaChanceDeErrar() {
  
  if (pontosDoOponente >= meusPontos) {
    
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      
      chanceDeErrar = 40;
    }
  }else {
    
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      
      chanceDeErrar = 35
    }
  }
}//função para fazer com que o oponente erre