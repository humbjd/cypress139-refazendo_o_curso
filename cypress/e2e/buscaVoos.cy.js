// Grupo de teste
describe('Busca por voos', () => {
  // Contexto / Cenário
  context('Não Logado', () => {
    // Caminho para o arquivo com a massa de teste
    const massaVoos = require('../fixtures/massaVoos')

    // Inicialização do testes / Antes dos testes
    beforeEach(() => {
      cy.visit('/') // Abrir a página inicial da URL informada
    })

    // Exemplo de teste Simples
    it('Buscar voos entre São Paolo e Cairo - Simples', () => {
      // Verifica se o titulo da guia é igual 'BlazeDemo'
      cy.title()
      .should('eq', 'BlazeDemo')
      
      // Preenche a origem e destino do voo
      cy.get('select.form-inline')
        .eq(0) // origem
        .select('São Paolo')

        cy.get('select.form-inline')
        .eq(1) // destino
        .select('Cairo')

      //Aperta o botão Find Flights
      cy.get('input.btn.btn-primary')
        .click()
      
      // Ocorre a transição para a página de Reserva
      cy.title()
      .should('eq', 'BlazeDemo - reserve')

      // Verifica a frase de origem e destino do voo
      cy.get('div.container h3')
        .should('have.text', 'Flights from São Paolo to Cairo: ')

      cy.get('tbody input[type="submit"]')
        .eq(0)
        .click()



    });

    // Exemplo de teste com Data Driven
    massaVoos.array.forEach(({origem, destino}) => {
    it(`Buscar voos entre ${origem} e ${destino} - Data Driven`, () => {
      // Verifica se o titulo da guia é igual 'BlazeDemo'
      cy.title()
      .should('eq', 'BlazeDemo')
      
      // Preenche a origem e destino do voo
      cy.get('select.form-inline')
        .eq(0) // origem
        .select(origem)

        cy.get('select.form-inline')
        .eq(1) // destino
        .select(destino)

      //Aperta o botão Find Flights
      cy.get('input.btn.btn-primary')
        .click()
      
      // Ocorre a transição para a página de Reserva
      cy.title()
      .should('eq', 'BlazeDemo - reserve')

      // Verifica a frase de origem e destino do voo
      cy.get('div.container h3')
        .should('have.text', `Flights from ${origem} to ${destino}: `)

      cy.get('tbody input[type="submit"]')
        .eq(0)
        .click()


      }); // fim do it


    }) // fim do array

  
  }) // fim do context
  
}) // fim do describe