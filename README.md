### CRC Cypress Utils

Descrição:

CRC Cypress Utils é uma biblioteca simples desenvolvida para fornecer funcionalidades auxiliares que podem ser úteis em testes Cypress. Esta biblioteca é voltada para ajustes em testes que não são muito complexos e está em uma versão inicial de desenvolvimento.

Funcionalidades:

<ul>
    <li>Geração de números e strings aleatórios.</li>
    <li>Manipulação de armazenamento local e cookies.</li>
    <li>Validação de tamanho de listagens.</li>
</ul>

Instalação:

Você pode instalar a biblioteca via npm:

<span style="background-color:black; padding: 10px;">*npm install --save crc-cypress-utils*</span>

Importar:

Importe a classe Utils e use os métodos disponíveis conforme necessário nos seus testes Cypress:

<span style="background-color:black; padding: 10px;">*import Utils from 'crc-cypress-utils';*</span>

Exemplo de uso:

<span style="background-color:black; padding: 10px;">*Utils.setLocalStorage('token','myToken123');*</span>

<br>

<h3 style="background-color:red; padding: 5px;">Aviso:</h3>

Esta biblioteca está em uma versão inicial de desenvolvimento e pode não abranger todos os casos de uso. 
Recomendado utilizá-la para ajustes em testes simples e não muito complexos.