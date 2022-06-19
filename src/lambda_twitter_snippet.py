# Use this code snippet in your app.
import boto3
from botocore.exceptions import ClientError
import tweepy

def get_secret():
    secret_name = "Demo/Twitter_bearer_token"
    endpoint_url = "https://secretsmanager.us-east-2.amazonaws.com"
    region_name = "us-east-2"

    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name,
        endpoint_url=endpoint_url
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print("The requested secret " + secret_name + " was not found")
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            print("The request was invalid due to:", e)
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            print("The request had invalid params:", e)
    else:
        # Decrypted secret using the associated KMS CMK
        # Depending on whether the secret was a string or binary, one of these fields will be populated
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            binary_secret_data = get_secret_value_response['SecretBinary']
            
        # (TODO): take this out of bearer token 
    

def get_twitter_friends(username):

    # delete this 
    username = "evayzh"
    
    # delete this plaintext lol use the amazon get_secret func 
    consumer_key = 'kfSMzLA0aCKv3CANpDjunniK8'
    consumer_secret = 'ZkJTDrtFtYsEThvXdlZp7yqAauhXQLB15QQLKwnSOOJTpUd58A'

    auth = tweepy.OAuthHandler(consumer_key,consumer_secret)
    api=tweepy.API(auth)
    friends_list = api.friends(username)

    # check working 
    print(friends_list[0])

    # map friends_list back to ID 
    return friends_list 