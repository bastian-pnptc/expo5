require 'json'
require 'airtable'
require 'active_support/all'
# require 'active_support/all'

# Pass in api key to client
@client = Airtable::Client.new(ENV['API_KEY'])

# Pass in the app key and table name

@table = @client.table(ENV['TABLE_KEY'], "startups")
@records = @table.records(:sort => ["company", :asc])

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/startups.json", "w") do |f|
    data = @records.map { |record| record.attributes }
    f.write(data.to_json)
end
