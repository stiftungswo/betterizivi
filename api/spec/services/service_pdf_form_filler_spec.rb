# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ServicePdfFormFiller, type: :service do
  describe '#fill_service_agreement' do
    subject(:form_filler) { instance_double(PdfForms::PdftkWrapper, fill_form: true) }

    let(:fill_service) { ServicePdfFormFiller.new(service) }
    let(:service) { create :service }
    let(:user) { service.user }
    let(:file_path) { ServicePdfFormFiller::GERMAN_FILE_PATH }

    before do
      allow(PdfForms).to receive(:new).and_return form_filler

      fill_service.fill_service_agreement
    end

    context 'when is german' do
      let(:expected_fields) do
        {
          1 => user.zdp,
          2 => user.first_name,
          7 => user.last_name,
          3 => user.zip_with_city,
          8 => user.address,
          4 => user.phone,
          10 => user.bank_iban,
          5 => user.email,
          11 => user.health_insurance,
          25 => I18n.l(service.beginning),
          24 => I18n.l(service.ending),
          'Einsatz' => 'On',
          'Probeeinsatz' => 'Off',
          'obligatorischer Langer Einsatz oder Teil davon' => 'Off',
          26 => service.service_specification.title
        }
      end

      it 'fills pdf' do
        expect(form_filler).to have_received(:fill_form)
          .with(file_path, fill_service.result_file_path, expected_fields, flatten: true)
      end
    end

    context 'when it is french' do
      let(:service) { create(:service, :valais) }
      let(:file_path) { ServicePdfFormFiller::FRENCH_FILE_PATH }

      let(:expected_fields) do
        {
          'N' => user.zdp,
          'Prénom' => user.first_name,
          'Nom' => user.last_name,
          'NPA / Lieu' => user.zip_with_city,
          'Rue n' => user.address,
          'Mobile' => user.phone,
          'IBAN' => user.bank_iban,
          'Courriel' => user.email,
          'Caisse-maladie' => user.health_insurance,
          'Date de début' => I18n.l(service.beginning),
          'Date de fin' => I18n.l(service.ending),
          'affectation' => 'On',
          'affectation à lessai' => 'Off',
          'affectation longue obligatoire ou partie de celleci' => 'Off',
          'Cahier des charges' => service.service_specification.title
        }
      end

      it 'fills pdf' do
        expect(form_filler).to have_received(:fill_form)
          .with(file_path, fill_service.result_file_path, expected_fields, flatten: true)
      end
    end
  end
end
