# frozen_string_literal: true

Rails.application.routes.draw do
  scope :v1 do
    devise_for :users, defaults: { format: :json }
  end

  namespace :v1, defaults: { format: :json } do
    resources :regional_centers, only: :index
    resources :holidays, only: %i[index create update destroy]
    resources :service_specifications, only: %i[index create update]
    resources :expense_sheets
    get 'services/calculate_service_days', to: 'service_calculator#calculate_service_days'
    get 'services/calculate_ending', to: 'service_calculator#calculate_ending'
    resources :services
    resources :users, except: :create
    put 'payments/:payment_timestamp/confirm', to: 'payments#confirm', as: 'payment_confirm'
    resources :payments, only: %i[index show create destroy], param: :payment_timestamp
    get 'phone_list', to: 'phone_list#show', as: 'phone_list_export'
    get 'expense_sheet', to: 'expense_sheets#show', as: 'expense_sheet_export'
  end
end
