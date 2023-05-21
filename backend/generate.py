
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