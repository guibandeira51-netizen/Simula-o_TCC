# Verificação da interface local

Verificação realizada na prévia Vite local em 13/09/2026, após o carregamento do código atual.

- A página iniciou e integrou o estado continuamente no navegador.
- Pausar congelou o tempo simulado (`t`) enquanto a interface permaneceu responsiva.
- Desativar a estrutura decorativa não alterou o tempo, as posições ou os diagnósticos físicos.
- A qualidade `Leve` reduziu a contagem visual de aproximadamente 111 mil para 51 mil pontos por vista, sem reiniciar ou alterar o campo físico.
- O modo de comparação exibiu duas câmeras e duas trajetórias, com a legenda “Mesmo estado inicial · sem halo”.
- O preset “Circular no plano” em R=5 kpc iniciou com `v_R=0`, `v_z=0` e `v_φ=234,46 km/s`; a trajetória permaneceu circular dentro da tolerância registrada nos testes.
- A resolução temporal `Fina` reduziu o passo exibido de 0,0462 Myr para 0,0231 Myr no experimento em R=5 kpc.
- R=0,1 kpc foi rejeitado com a mensagem “Raio inicial fora de 0,5–50 kpc”; isso é validação de domínio, não classificação de instabilidade.
- O diálogo “Modelo & fontes” mostrou os parâmetros físicos, observações resumidas e links das referências.
- A aba “Matéria escura” mostrou as curvas de disco, bojo, núcleo, halo, matéria bariônica e modelo total, além de D(R), frações locais, massa dinâmica equivalente, marcador no raio atual e separação Δr(t) da comparação.
- O “Modo didático” exibiu vetores de velocidade e aceleração no traçador. Os comprimentos das setas foram normalizados para a tela e os módulos permaneceram disponíveis em `(km/s)²/kpc` no painel acessível.
- A página em 390×844 px exibiu o painel móvel, a galáxia e o rodapé de controle sem erro de carregamento.

O painel mostra FPS medido e quantidade aproximada de pontos renderizados; esses números são telemetria gráfica, não parâmetros físicos. A validação de leis de movimento é feita pela suíte `pnpm test`, sem depender do relógio do navegador.
