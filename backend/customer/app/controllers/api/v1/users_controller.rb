class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]


  # GET /users
  def index
    if (params[:id])
      if (params[:id] == "")
        @users_info = nil
      else
        @users_info = User.where(id: params[:id])
      end
    elsif (params[:phone_number])
      @users_info = User.where(phone_number: params[:phone_number])
    # elsif (params[:id] == "invalid")
    #   @users_info = nil
    else
      @users_info = User.all
    end
    render json: @users_info
  end


  # POST /users ## when users click on next after submitting phone number
  def create
    # TODO: If phone number exists, return an error

    # find user with the phone number
    if !(User.exists? phone_number: params[:phone_number])
      # if user does not exist, create a new user
      @user = User.new(user_params)
      ### TO-DO validate form before saving, remove all spaces and default to null
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end 
    else 
      render json: { error: "User already exists" }, status: :unprocessable_entity
    end
  end 

  # PATCH/PUT /api/v1/users/:id ## when users click on next buttons
  def update
    if !(User.exists? phone_number: params[:phone_number])
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else 
      render json: { error: "User already exists" }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/profie/delete
  def destroy
    @delete_child = Child.delete_all
    @users = User.delete_all

    render json: @users
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.where(id: params['id'])
    end

    # Assigns a list of allowable attributes through.
    def user_params
      params.require(:user).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_number, 
      :passport_expiry, :nationality, :gender, :dob, :is_family, :url, :image_url)
    end
end
