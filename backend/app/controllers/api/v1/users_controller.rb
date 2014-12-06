class Api::V1::UsersController < ApplicationController
  respond_to :json

  before_filter :authenticate_user!, except: [:index, :show]
  after_filter :verify_authorized, except: [:index, :show]

  # GET /api/v1/users
  # GET /api/v1/users.json
  def index
    @users = User.all
    respond_with(@users)
  end

  # GET /api/v1/users/1
  # GET /api/v1/users/1.json
  def show
    @user = User.find(params[:id])
    respond_with(@user)
  end

end
