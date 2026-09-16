# Revisão da interface acadêmica

Fonte: Simula-o_TCC-main.zip fornecido pelo usuário. Revisão em 16/09/2026.

## Alterações

- Cabeçalho compacto com “Experimento: Órbita Solar”, “Projeto de Trabalho de Conclusão de Curso” e “Guilherme Aleixo Bandeira”.
- Logo original da UEMS em public/assets/uems.png, sem alterações na imagem, com proporção preservada.
- Remoção de slogans, numeração decorativa de seções e avisos repetidos.
- Tipografia do sistema, contraste sóbrio e organização consistente dos valores e unidades.
- Painéis laterais no desktop; abaixo de 800 px, painel inferior com alternância entre controles, resultados e visualização sem painéis.
- Preservação dos controles, gráficos, documentação e exportação existentes.

## Arquivos

- index.html: identificação acadêmica e revisão de textos.
- src/style.css: cabeçalho, painéis, tipografia e responsividade.
- src/ui/UIManager.ts: limite responsivo do botão Painéis ajustado para coincidir com o CSS.
- src/ui/ChartsManager.ts: apenas a fonte dos gráficos foi alterada.
- public/assets/uems.png: logo fornecida pelo usuário.

## Verificação

- TypeScript: `tsc --noEmit` concluído sem erros.
- Comparação SHA-256 de 42 arquivos originais, excluindo dist: somente os quatro arquivos de interface acima mudaram. Física, parâmetros, integrador, dados, renderizador e testes permanecem idênticos ao ZIP de entrada.
- Interface conferida no navegador em 1440 × 900 e 390 × 844, além da janela padrão. Verificados pausa, botão Painéis, aba Matéria escura e diálogo Modelo & fontes. Sem erros capturados no console.
- O build padrão Vite/esbuild foi bloqueado pelo ambiente local com `spawn EPERM`. Não foi possível confirmar o comando completo de produção. Uma compilação de verificação com Vite/Rollup e TypeScript, sem subprocesso de esbuild e sem minificação, permitiu testar a aplicação no navegador. Essa adaptação de verificação não integra o projeto entregue.
- package.json, lockfile e configuração Vite permanecem inalterados. Esta revisão não foi publicada no GitHub/Vercel.

## Conteúdo da entrega

O ZIP contém a pasta Simulacao_TCC com o código-fonte atualizado. Não inclui node_modules nem o dist antigo que estava no arquivo de entrada; o dist deve ser gerado novamente pelo build. O diretório do projeto continua sendo a pasta que contém package.json. O comando de produção continua `npm run build` e a saída continua `dist`.
