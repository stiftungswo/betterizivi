# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Pdfs::ExpensesOverview::ExpensesOverviewAdditions, type: :service do
  let(:service) { create :service }

  it 'returns true' do
    expect(service).to eq true
  end
end
