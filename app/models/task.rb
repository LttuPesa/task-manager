class Task < ApplicationRecord
  validates :description, presence: { message: "Enter your task!" }
end
