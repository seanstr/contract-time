class Replicon
  require "net/http"
  require "json"
  require "pp"
  require "date"

  LOGIN = "smatthews"
  PASSWORD = "Sean0405?0"

  #require "./replicon_queries"

  attr_accessor(:entry_date)

  #get_timesheet_by_user_date(login_id, entry_date)

  def initialize()
    @entry_date = Date.new()
    company_key = "axia"
    @url = URI.parse("https://na1.replicon.com/#{company_key}/RemoteApi/RemoteApi.ashx/8.29.78/")
    #@url = URI.parse("https://na1.replicon.com/#{company_key}/RemoteApi/RemoteApi.ashx/8.29.78/testmode")
  end

  def get_login(login)
    query = get_user_id(login)
    result = process_query(query)
    login_id = result["Value"][0]["Identity"]

    if login_id.nil? || login_id.size == 0
      puts response.body
      raise "login_id for #{login} not found at result[\"Value\"][0][\"Identity\"]}"
    end
    login_id
  end

  def process_query(query)
    request = setup_request(query)
    response = exec_request(request)

    unless response.code.to_i == 200
      puts response.body
      raise "Expected success code 200, but was #{response.code}"
    end

    JSON.parse(response.body)
  end

  private

  def setup_request(query)
    puts JSON.generate(query)

    login = LOGIN
    pwd = PASSWORD

    request = Net::HTTP::Post.new(
        @url.path + (@url.query != nil ? ("?#{@url.query}") : ""),
        initheader = {"Content-Type" => "application/json", "X-Replicon-Security-Context" => "User"})
    request.basic_auth(login, pwd)
    request.body = JSON.generate(query)
    request
  end

  def exec_request(request)
    server = Net::HTTP.new(@url.host, @url.port)
    server.use_ssl = @url.scheme == "https"
    server.verify_mode = OpenSSL::SSL::VERIFY_NONE
    server.start {|http| http.request(request)}
  end


end