# Histórico de verificação da interface local

Os itens abaixo registram a verificação da prévia Vite local de 13/09/2026. Referem-se à versão então carregada e não atestam, por si só, a interface da revisão de 08/10/2026.

- A página iniciou e integrou o estado continuamente no navegador.
- Pausar congelou o tempo simulado (`t`) enquanto a interface permaneceu responsiva.
- Desativar a estrutura decorativa não alterou o tempo, as posições ou os diagnósticos físicos.
- A qualidade `Leve` reduziu a contagem visual de aproximadamente 111 mil para 51 mil pontos por vista, sem reiniciar ou alterar o campo físico.
- O modo de comparação exibiu duas câmeras e duas trajetórias, com a legenda “Potencial bariônico — bojo + disco · Mesmas condições iniciais”.
- O preset circular e a seleção de resolução temporal foram exercitados. Os números recalculados para o modelo atual estão separados abaixo, evitando atribuir ao histórico resultados de outra versão.
- R=0,1 kpc foi rejeitado com a mensagem “Raio inicial fora de 0,5–50 kpc”; isso é validação de domínio, não classificação de instabilidade.
- O diálogo “Modelo & fontes” mostrou os parâmetros físicos, observações resumidas e links das referências.
- A aba “Matéria escura” mostrou as curvas de disco, bojo, halo, matéria bariônica e modelo total, além de D(R), frações locais, massa dinâmica equivalente, marcador no raio atual e separação Δr(t) da comparação.
- O “Modo didático” exibiu vetores de velocidade e aceleração no traçador. Os comprimentos das setas foram normalizados para a tela e os módulos permaneceram disponíveis em `(km/s)²/kpc` no painel acessível.
- A página em 390×844 px exibiu o painel móvel, a galáxia e o rodapé de controle sem erro de carregamento.

O painel mostra FPS medido e quantidade aproximada de pontos renderizados; esses números são telemetria gráfica, não parâmetros físicos. A validação de leis de movimento é feita pela suíte `pnpm test`, sem depender do relógio do navegador.

## Revisão de 08/10/2026

A inspeção no navegador foi interrompida sem confirmação de que a página aberta correspondia aos arquivos desta revisão. Portanto não há verificação visual concluída da versão atual; os registros de setembro permanecem históricos. A validação de código e os testes atuais são descritos em PENTE-FINO-2026-10-08.md.

O cálculo atual do preset circular da referência completa em R=5 kpc fornece v_R=v_z=0 e v_φ=231,393135 km/s. O passo padrão é 0,04629385 Myr (0,04629 Myr arredondado), e a opção Fina o reduz pela metade para 0,02314692 Myr (0,02315 Myr). São resultados das funções físicas e de escolha de passo, não medições novas do navegador.

Na referência completa uma circular mantém o módulo da velocidade, enquanto sua direção gira. A comparação preserva exatamente a mesma velocidade inicial no campo bariônico. Desligar um componente, portanto, pode tornar a trajetória não circular; os rótulos e as notas do preset explicitam esse protocolo.
