Objetivos:

- [x] entender o fluxo básico de comandos helm
- [ ] entender o padrão de diretórios e arquivos do Helm
- [ ] saber criar um chart e subi-lo a um repositório fonte de versionamento de charts
- [ ] saber da linguagem para templarizar os charts
- [ ] saber aplicar o entendimento a ambientes desconhecidos
  - ~~se não achei um repo, isso provavelmente quer dizer que a instalação é feita a partir de chart local~~
  - comandos úteis para se averiguar um ambiente

Pré-requisitos:

Um cluster (vamos usar o minikube)
Helm instalado

## Lista de comandos

Comandos com interação com o estado remoto:

1. helm install [RELEASE_NAME] [CHART] [flags]
1. helm upgrade [RELEASE_NAME] [CHART] [flags] | helm upgrade --install [RELEASE_NAME] [CHART] [flags]helm uninstall [RELEASE_NAME] [flags]
1. helm rollback [RELEASE_NAME] [REVISION] [flags]
1. helm list [flags]
1. helm status [RELEASE_NAME] [flags]
1. helm get [SUBCOMMAND] [RELEASE_NAME] [flags]
1. helm history [RELEASE_NAME] [flags]
1. helm test [RELEASE_NAME] [flags]

Comandos com alteração local, mesmo que interagindo com o servidor remoto (não o altera)

1. helm repo add [NAME] [URL] [flags]
1. helm repo remove [REPO_NAME] [flags]
1. helm repo list [flags]
1. helm repo update [REPO_NAME] [flags]
1. helm search repo [KEYWORD] [flags]
1. helm search hub [KEYWORD] [flags]
1. helm package [CHART_PATH] [flags]
1. helm lint [CHART] [flags]
1. helm template [NAME] [CHART] [flags]
1. helm dependency update [CHART_PATH] [flags]
1. helm dependency build [CHART_PATH] [flags]
1. helm show all [CHART] [flags]
1. helm show chart [CHART] [flags]
1. helm show values [CHART] [flags]
1. helm show hooks [CHART] [flags]
1. helm plugin install [URL] [flags]
1. helm plugin list [flags]
1. helm plugin update [PLUGIN] [flags]
1. helm plugin remove [PLUGIN] [flags]

## Fluxo básico de comandos

```bash
helm repo add <repo-name> <repo-url>
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -n <namespace> --create-namespace
helm get values <release-name>
helm upgrade --install <release-name> <repo-name>/<chart-name> --version <chart-version> -f <file-name> -n <namespace> 
helm list -A
```

```bash
helm create <chart-name>
helm package <chart-name> | helm dependency build
helm repo index <path-to-dir> --url https://<your-bucket-name>.s3.amazonaws.com/charts --merge index.yaml
```

### Chart.yaml:

Esse cara tem dois campos importantes

version - versão do chart; acredito que ficará mais claro quando efetivamente a gente fizer mudanças no chart em si

appVersion - diz respeito a versão da aplicação em si. Estamos a falar principalmente sobre

### index.yaml

Esse é o cara que por debaixo dos panos o Helm está baixando durante o repo add/update, e guardando no seu cache local.

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
- create s3
  - add bucket policy
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "Providing charts public access",
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

    -


kubectl port-forward pod/<pod_name>> host_port:remote_port

v0.1.0
Primeira versão com valores chumbados no template
v0.2.0
Segunda versão com valores sendo puxados do values mas com Helm apontando erro em "spec.template.spec.resources"
v0.3.0
Terceira versão corrigindo erro da segunda release