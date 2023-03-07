from googleapiclient import discovery
from googleapiclient import errors

# Store your full project ID in a variable in the format the API needs.
project_id = 'projects/{}'.format('chabot-370717')

# Build a representation of the Cloud ML API.
ml = discovery.build('ml', 'v1')

# Create a dictionary with the fields from the request body.
request_dict = {'name': 'your_model_name',
                'description': 'your_model_description'}

# Create a request to call projects.models.create.
request = ml.projects().models().create(
    parent=project_id, body=request_dict)

# Make the call.
try:
    response = request.execute()
    print(response)
except errors.HttpError.err:
    # Something went wrong, print out some information.
    print('There was an error creating the model. Check the details:')
    #print(err._get_reason())
