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
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -n <namespace> --create-namespace
helm get values <release-name>
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -f <file-name> -n <namespace> 
helm list -A
```

```
helm create <chart-name>
helm package <chart-name>
helm dependency build

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
.Release.Name o
- Criar um container
- Postar o container online em um repositório apropriado
- Fazer um helm create
- helm package?
- utilizar do helm create para fazer nosso próprio chart

## Helm repo

- helm package <dir-to-main-folder>
- helm repo index .
- upload to s3
  - modify bucket policy
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "Stmt1405592139000",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:GetObject",
              "Resource": [
                  "arn:aws:s3:::bucketname/*",
                  "arn:aws:s3:::bucketname"
              ]
          }
      ]
    }
    ```