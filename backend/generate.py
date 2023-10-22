
def generate_table(db):
    db.create_table(
        TableName='Movies',
        AttributeDefinitions=[
            {
                'AttributeName': 'imdbID',
                'AttributeType': 'S'
            }
        ],
        KeySchema=[
            {
                'AttributeName': 'imdbID',
                'KeyType': 'HASH'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    table = db.Table('Movies')
    table.put_item(Item={'Title': 'Slumber Party Massacre II', 'Year': '2000', 'Poster': 'https://m.media-amazon.com/images/M/MV5BMjFjMTUyOTAtMDg4Yy00YjE4LWE1ODgtODM3ZDAwZWZhN2UyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', 'imdbID': '123456'})