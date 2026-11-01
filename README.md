# SINAL

Transmita a tela do seu computador para outra pessoa direto no navegador, sem cadastro e sem instalar nada para quem assiste.

**Demo:** https://savio13-desig.github.io/sinal/

## Como funciona

1. Quem transmite abre a página, escolhe a tela ou janela e recebe um link de compartilhamento.
2. Quem assiste abre o link e vê a transmissão.
3. A conexão é ponto a ponto (WebRTC, via [PeerJS](https://peerjs.com/)), então o vídeo não passa por um servidor próprio.

## Recursos

- Seleção de codec: VP8 (padrão, mais estável e roda no processador), H.264 (usa a placa de vídeo), VP9 e AV1.
- Bitrate inicial ajustado para a transmissão não começar travada.
- Nova tentativa automática quando a conexão de um espectador trava.
- Diagnóstico de captura e codificação na barra lateral.
- Versão desktop em Electron, com seletor nativo de fonte (pasta [`desktop`](desktop)).

## Tecnologias

HTML, CSS e JavaScript puros em um único arquivo (`index.html`), PeerJS para a sinalização WebRTC e Electron para o app desktop.

## Rodar localmente

Versão web: abra `index.html` em um servidor local, por exemplo `npx serve .`.

Versão desktop:

```bash
cd desktop
npm install
npm start
```

## Licença

MIT
