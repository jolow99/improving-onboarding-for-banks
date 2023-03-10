class Api::V1::UsersController < ApplicationController
  before_action :set_user, :set_cors, only: %i[ show update destroy ]

  def set_cors
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  
  def test
    render plain: "status: up and running"
  end

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
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

  # DELETE /api/v1/profie/delete
  def destroy
    @delete_child = Child.delete_all
    @users = User.delete_all

    render json: @users
  end

  def extract
    image = params[:image_name] 
    @vision = Vision.new
    @output = @vision.extract_data("#{image}")

    # MRZ is not detected, so its not a valid image
    if @output == ""
      render json: { error: "This is not a valid passport image" }, status: :unprocessable_entity

    # If you upload an image with no words
    elsif @output == "no text detected"
      render json: { error: "This image does not have texts, try again with another image" }, status: :unprocessable_entity

    # mrz with < 44 chars, it is definitely invalid
    elsif @output == "length_error"
      render json: { error: "Image does not meet the requirements, please upload a new image" }, status: :unprocessable_entity

    # mrz != 44 chars after splitting whitespaces
    elsif @output == "invalid MRZ"
      render json: { error: "This passport does not have correct MRZ, autofill unavailable" }, status: :unprocessable_entity

    else 
      render json: @output
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.where(id: params['id'])
    end

    # Assigns a list of allowable attributes through.
    def user_params
      params.require(:user).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_number, 
      :passport_expiry, :nationality, :gender, :dob, :is_family, :url, :image_name)
    end
end
