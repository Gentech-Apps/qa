import argparse
import json

parser = argparse.ArgumentParser(description='Update User Id')
parser.add_argument('-id','--userID', help='UserId', required=True, metavar="", type=str)

args = parser.parse_args()

USER_ID = args.userID

api_client2 = APIClient(api_services=api_services)


api_client = APIClient()
page_size = 500
page = 0
ids = []
lt=[]
wp=[]

while True:
    result = api_client.project.get_all(
        search_hidden=True,
        page_size=page_size,
        page=page,
        
    )
    ids.extend(r for r in result if r.user==USER_ID)

    if len(result) < page_size:
        break
    page += 1

for id in ids:
    id = id.id
    page = 0
    while True:
        result = api_client.task.get_all(project=[id], page_size=page_size, page=page)
        for task in result:
            try:
                api_client.task.delete(task.id, force=True)
            except:
                pass
        if len(result) < page_size:
            break
        page += 1
    print("deleting {}".format(id))
    page = 0

while True:
    result = api_client.task.get_all(
        search_hidden=True,
        page_size=page_size,
        page=page,
    )
    lt.extend(r for r in result if r.user==USER_ID)
    if len(result) < page_size:
        break
    page += 1

for id in lt:
    id = id.id
    print("deleting {}".format(id))
    try:
        api_client.task.delete(id, force=True)
    except:
        pass



while True:
    result = api_client.project.get_all(
        search_hidden=True,
        page_size=page_size,
        page=page,
    )
    wp.extend(r for r in result if r.user==USER_ID)
    if len(result) < page_size:
        break
    page += 1

for id in wp:
    id = id.id
    print("deleting {}".format(id))
    try:
        api_client.projects.delete(id, force=True)
    except:
        pass

print("done")

