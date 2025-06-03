# Jogo da Velha com Inteligência Artificial

Este é um projeto de **Jogo da Velha** desenvolvido em **React Native**, com uma **inteligência artificial integrada**. O oponente (CPU) não realiza apenas jogadas aleatórias — ele analisa o tabuleiro, tenta vencer, bloqueia o jogador e escolhe posições estratégicas.

## Funcionalidades

- Tabuleiro 3x3 funcional e responsivo.
- A que:
  - Realiza jogadas para vencer se possível.
  - Bloqueia vitórias do jogador.
  - Prioriza o centro do tabuleiro e faz jogadas estratégicas.
- Reinício automático após cada rodada.
- Placar em tempo real (Jogador, CPU, Empates).
- Detecção automática de vitórias e empates.
- Destaque visual para células vencedoras.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (para desenvolvimento e execução simplificada)
- [Ionicons](https://ionic.io/ionicons) (ícones de jogadas)

## Estrutura do Projeto

```shell
App.js # Código principal do jogo e da lógica de IA
├── useState # Controle do tabuleiro, turnos, placar, fim de jogo
├── useEffect # Responsável por ativar jogadas da CPU
├── Funções:
│ ├── handleCellPress() # Jogada do jogador
│ ├── makeCPUMove() # Jogada da CPU com IA
│ ├── findBestMove() # Verifica se pode vencer ou bloquear
│ ├── checkWinner() # Verifica combinação vencedora
│ ├── isBoardFull() # Detecta empate
│ └── handleGameEnd() # Atualiza placar e reinicia o jogo
```

> [!NOTE]
> É necessário ter o [Node.js](https://nodejs.org/), [Expo CLI](https://docs.expo.dev/get-started/installation/), e um emulador ou o aplicativo **Expo Go** instalado no seu celular.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/jogo-da-velha-ia.git
cd jogo-da-velha-ia
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npx expo start
```

Abra com o app Expo Go (Android/iOS) ou rode em um emulador Android/iOS no seu computador.

## Capturas de Tela

*(Irei adicionar gifs do projeto)*

## Melhorias Futuras
- [ ] Níveis de dificuldade (fácil, médio, difícil).

- [ ] Multiplayer local (2 jogadores no mesmo dispositivo).

- [ ] Responsividade para tablets.

- [ ] Efeitos sonoros e animações visuais.

## Autor
[Guilherme Santos](https://www.linkedin.com/in/guilhermee-santos)

## Licença

Este projeto é destinado a fins educacionais e de aprendizado. Sinta-se à vontade para usar, modificar e distribuir, desde que os créditos sejam mantidos.