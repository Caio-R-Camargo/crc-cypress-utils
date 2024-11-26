export default class Utils {
    static setLocalStorage(name, value) {
      cy.window().then((window) => {
        window.localStorage.setItem(name, value);
      });
    }
  
    static setCookie(name, value) {
      cy.setCookie(name, value, {});
    }
  
    static preventFormSubmitDefault(selector) {
      cy.get(selector).then(form$ => {
        form$.on("submit", e => {
          e.preventDefault();
        });
      });
    }
  
    static preventUncaughtException() {
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
      })
    }
  
    static clearDownloads() {
      const isWindows = Cypress.platform === 'win32';
  
      let command;
      if (isWindows) {
        command = 'del /q cypress\\downloads\\*';
      } else {
        command = 'rm -rf cypress/downloads/*';
      }
  
      try {
        cy.exec(command);
        cy.log('Pasta de downloads limpa com sucesso.');
      } catch (error) {
        cy.error('Erro ao limpar a pasta de downloads:', error);
      }
    }
  
    static testSqlInjectionLogin(selectorMap) {
      const payloads = [
        "' OR 1=1 --",
        "\" OR 1=1 --",
        "' OR 'a'='a",
        "' OR 1=1 #",
        "' OR '1'='1' --",
        "' OR '1'='1' /*",
        "' AND 1=1 --",
        "'; DROP TABLE users --",
        "' OR EXISTS(SELECT * FROM users WHERE username='admin' AND password='password') --",
        "' UNION SELECT null, null, null --",
        "' UNION SELECT username, password FROM users --"
      ];
  
      payloads.forEach((payload) => {
        cy.log(`PAYLOAD: ${payload}`);
  
        if (selectorMap.email) {
          cy.get(selectorMap.email).clear().type(payload);
        }
  
        if (selectorMap.password) {
          cy.get(selectorMap.password).clear().type('password');
        }
  
        if (selectorMap.otherFields) {
          selectorMap.otherFields.forEach(field => {
            cy.get(field.selector).clear().type(field.value);
          });
        }
  
        cy.get(selectorMap.submit).click();
        cy.get(selectorMap.result).should('be.visible');
      });
    }
  
    static verifyElementStatus(selector, statusType) {
      switch (statusType) {
        case 'visible':
          cy.get(selector).should('be.visible');
          break;
        case 'enabled':
          cy.get(selector).should('be.enabled');
          break;
        case 'disabled':
          cy.get(selector).should('be.disabled');
          break;
        default:
          throw new Error('Tipo de status inválido. Por favor, especifique "visible", "enabled" ou "disabled".');
      }
    }
  
    static validateListLength(length) {
      cy.get('[role="rowgroup"] [role="row"]').should('have.length', length);
    }
  
    static validateRow(value) {
      cy.get('[role="row"]').find(`div:contains("${value}"):visible`)
    }
  
    static generateRandomNumber(length) {
      const allowedDigits = '123456789';
      let randomNumber = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedDigits.length);
        randomNumber += allowedDigits.charAt(randomIndex);
      }
  
      return randomNumber;
    }
  
    static generateRandomString(length) {
      const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let randomString = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
        randomString += allowedCharacters.charAt(randomIndex);
      }
  
      return randomString;
    }
  
    static getCurrentTime(withMinutes) {
      var currentDate = new Date();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
  
      if (withMinutes) {
        return (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes;
      } else {
        return (hours < 10 ? '0' : '') + hours;
      }
    }
  
    static generateRandomCNPJ(withSpecialChars = true) {
      let cnpj = '';
  
      // Gera os primeiros 12 dígitos aleatórios
      for (let i = 0; i < 12; i++) {
        cnpj += Math.floor(Math.random() * 10);
      }
  
      const calculatedDigits = this.calculateVerificationDigits(cnpj);
      cnpj += calculatedDigits;
  
      if (withSpecialChars) {
        cnpj = this.insertSpecialChars(cnpj);
      }
  
      return cnpj;
    }
  
    static calculateVerificationDigits(cnpj) {
      const firstDigit = this.calculateDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const secondDigit = this.calculateDigit(cnpj + firstDigit, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  
      return `${firstDigit}${secondDigit}`;
    }
  
    static calculateDigit(cnpj, weights) {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(cnpj[i]) * weights[i];
      }
  
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    }
  
    static insertSpecialChars(cnpj) {
      return (
        cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' + cnpj.slice(5, 8) +
        '/' + cnpj.slice(8, 12) + '-' + cnpj.slice(12)
      );
    }
  
    static getCurrentDate(dayOffset = 0, isoFormat = false, withBars = false) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + dayOffset);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
  
      if (isoFormat) {
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        return formattedDate;
      } else if (withBars) {
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      } else {
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }
    }
  }