class CreateExpenseSheets < ActiveRecord::Migration[5.2]
  def change
    create_table :expense_sheets do |t|
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.references :user, foreign_key: true, null: false
      t.integer :work_days, null: false
      t.string :work_comment
      t.integer :company_holiday_unpaid_days, default: 0
      t.integer :company_holiday_paid_days, default: 0
      t.string :company_holiday_comment
      t.integer :workfree_days, default: 0
      t.integer :ill_days, default: 0
      t.string :ill_comment
      t.integer :holiday_days, default: 0
      t.integer :paid_vacation_days, default: 0
      t.string :paid_vacation_comment
      t.integer :unpaid_vacation_days, default: 0
      t.string :unpaid_vacation_comment
      t.integer :driving_charges, default: 0
      t.string :driving_charges_comment
      t.integer :extraordinarily_expenses, default: 0
      t.string :extraordinarily_expenses_comment
      t.integer :clothes_expenses, default: 0
      t.string :clothes_expenses_comment
      t.string :bank_account_number, null: false
      t.integer :state, default: 0

      t.timestamps
    end
  end
end
