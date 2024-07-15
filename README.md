Objetivos:

- entender o fluxo básico de comandos helm
- entender o padrão de diretórios do Helm
- saber aplicar o entendimento a ambientes desconhecidos
  - se não achei um repo, isso provavelmente quer dizer que a instalação é feita a partir de chart local
  - comandos úteis para se averiguar um ambiente

Pré-requisitos:

Um cluster (vamos usa o minikube)
Helm instalado

## Fluxo básico de comandos

```
helm repo add <repo-name> <repo-url>
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -n <namespace>
helm get values <release-name>
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -f <file-name> -n <namespace> 
```

```
helm create <chart-name>

```

comandos:

- helm create nginx-estudos

Criação da estrutura de arquivos e diretórios. 

Chart.yaml:

Esse cara tem dois campos importants

version - versão do chart; acredito que ficará mais claro quando efetivamente a gente fizer mudanças no chart em si

appVersion - diz respeito a versão da aplicação em si. Estamos a falar principalmente sobre

## Docker

docker login

docker build -t takionqoy/getting-started:pong-app .

docker push takionqoy/getting-started:pong-app