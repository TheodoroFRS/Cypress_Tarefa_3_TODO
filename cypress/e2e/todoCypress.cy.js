
describe('Aplicativo de tarefas cypress', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');

  })
  let variavel = "Variavel";

  it('Deve exibe os itens de tarefas por padrão do aplicativo', () => {
    cy.get(".todo-list li").should('have.length', 2);
    cy.get(".todo-list li").first().should('have.text', 'Pay electric bill');
    cy.get(".todo-list li").last().should('have.text', 'Walk the dog');
  });

  it('Deve adicionar um novo itens de tarefas', () => {

    cy.get(".new-todo").type(`${variavel} {enter}`)
    cy.get('.todo-list li').should('have.length', 3).last().should('have.text', variavel);

  });


  // 1 encontre o item e marque o checkbox
  // 2 verifique se este item está como concluído
  it('Deve marcar um item como concluído', () => {

    cy.get(".new-todo").type(`${variavel} {enter}`)
    cy.get('.todo-list li').should('have.length', 3).last().should('have.text', variavel);

    cy.contains(variavel).parent().find('input[type=checkbox]').check();
  });


  // Usando o contex para preparar os próximos testes a partir de uma situação 
  context('Usando uma tarefa verificada', () => {


    beforeEach(() => {
      /* Usaremos o comando que usamos acima para marcar um elemento 
      Como queremos realizar vários testes que começam com a verificação um elemento, colocamos no gancho beforeEach para que seja executado no início de cada teste. */
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    });

    // inicia a partir da situação do contex
    it('Deve filtrar tarefas incompletas', () => {
      // 1 seleciona o active e clica 
      // 2 verifica se dentro da lista está o item que ainda não foi concluído
      // 3 verifica se o item que foi concluído não está na lista

      cy.get('.filters > :nth-child(2) > a').parent().find('a').click();
      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Walk the dog');
      cy.contains("Pay electric bill").should('not.exist')
      cy.wait(500)
    });

    it('Deve filtrar por tarefas concluídas', () => {
      // 1 seleciona o completed e clica
      // 2 verifica se dentro da seleção contém o item concluído
      // 3 verifica se não existe o item não concluído

      cy.get('.filters > :nth-child(3) > a').parent().find('a').click();
      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Pay electric bill');
      cy.contains("Walk the dog").should('not.exist')
      cy.wait(500)

    });

    it('Deve excluir todas as tarefas concluídas', () => {
      // 1 seleciona o Clear completed e clica
      // 2 verifica se não tem nenhum texto 
      // 3 verifica se o botão Clear completed não existe

      cy.contains('Clear completed').parent().find('button').click();
      cy.contains('Completed').parent().find('a').click();
      cy.get(".todo-list").should('have.length', 1);
      cy.contains("Clear completed").should('not.exist');
    });

  });




});
