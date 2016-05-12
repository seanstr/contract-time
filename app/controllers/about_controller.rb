class AboutController < ApplicationController

	permit :allow_guests => true

  def about
  end
end
