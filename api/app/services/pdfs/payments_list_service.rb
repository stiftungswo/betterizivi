require 'prawn'

# TODO: internatinalizaion

module Pdfs
  class PaymentsListService
    include Prawn::View
    include Pdfs::PrawnHelper

    TABLE_HEADER = %w[
      ZDP
      Name
      IBAN
      Bettrag
    ].freeze

    def initialize(pending_expenses)
      @pending_expenses = pending_expenses

      update_font_families
      header
      content_table
    end

    def document
      @document ||= Prawn::Document.new(page_size: 'A4', page_layout: :portrait)
    end

    private

    def header
      text I18n.t('pdfs.phone_list.header', date: I18n.l(Time.zone.today)), align: :right
    end

    def content_table
      font_size 10
      table(table_data(@pending_expenses),
            cell_style: { borders: %i[] },
            header: true,
            column_widths: [40, 120, 120, 100]) do
        row(0).font_style = :bold
      end
    end

    def table_data(expenses)
      [TABLE_HEADER].push(*table_content(expenses))
    end

    def table_content(expenses)
      expenses.map do |expense|
        [
          expense.user.zdp,
          expense.user.full_name,
          expense.user.bank_iban,
          ActionController::Base.helpers.number_to_currency(
            expense.total / 100,
            unit: 'CHF',
            format: '%u %n',
            separator: '.',
            delimiter: ''
          )
        ]
      end
    end
  end
end
