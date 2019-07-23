# frozen_string_literal: true

module Concerns
  module PermittedDeviseUserRegistrationKeys
    extend ActiveSupport::Concern

    PERMITTED_USER_KEYS = %i[
      regional_center_id first_name last_name
      address bank_iban birthday city
      health_insurance zip hometown phone zdp
    ].freeze

    included do
      before_action :configure_permitted_parameters, if: :devise_controller?
    end

    private

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: PERMITTED_USER_KEYS)
    end
  end
end
