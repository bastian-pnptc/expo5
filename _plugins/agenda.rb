require 'json'
require 'airtable'
require 'active_support/all'
# require 'active_support/all'

# Pass in api key to client
@client = Airtable::Client.new(ENV['API_KEY'])

# Pass in the app key and table name

@table = @client.table(ENV['TABLE_KEY'], "agenda")
@records = @table.records(:sort => ["start", :asc])

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/schedule.json", "w") do |f|
    data = @records.map { |record| record.attributes }
    f.write(data.to_json)
end
