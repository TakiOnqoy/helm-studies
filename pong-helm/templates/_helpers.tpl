{{/*
Expand the name of the chart.
*/}}
{{- define "pong-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}