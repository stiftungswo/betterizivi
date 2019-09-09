describe('ExpenseSheet form spec', () => {
  it('can update expenseSheet information', () => {
    cy.loginAdmin();
    cy.visit('/expense_sheets/1');
    cy.get('#root .card-body h1')
      .contains('Spesenblatt von Peter Parker bearbeiten');
    cy.get('input[name="work_days"]').clear().type('18');
    cy.get('input[name="workfree_days"]').clear().type('8');
    cy.get(':nth-child(34) > :nth-child(1) > .btn').contains('Speichern').click();
    cy.contains('Das Spesenblatt wurde gespeichert');
  });

  it('it has the right status badge', function () {
    cy.get('.ml-3').contains('Offen')
  });

  it('it has correct hints', () => {
    cy.get(':nth-child(7) > .col-md-9 > .input-group > .input-group-append > .input-group-text').contains('Vorschlag: 20 Tage');
    cy.get(':nth-child(8) > .col-md-9 > .input-group > .input-group-append > .input-group-text').contains('Vorschlag: 6 Tage');
    cy.get(':nth-child(9) > .col-md-9 > .input-group > .input-group-append > .input-group-text').contains('Übriges Guthaben: 5 Tage');
    cy.get(':nth-child(11) > .col-md-9 > .input-group > .input-group-append > .input-group-text').contains('Vorschlag: 0 Tage');
    cy.get(':nth-child(12) > .col-md-9 > .input-group > .input-group-append > .input-group-text').contains('Vorschlag: 0 Tage');
    cy.get(':nth-child(3) > .input-group-text').contains('Vorschlag: 59.80 CHF');
  });
});
